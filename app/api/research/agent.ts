import { ChatGroq } from "@langchain/groq";
import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
import yahooFinance from "yahoo-finance2";

// 1. Define the shared state structure
const AgentState = Annotation.Root({
  companyName: Annotation<string>(),
  ticker: Annotation<string>(),
  financials: Annotation<string>(),
  newsSentiment: Annotation<string>(),
  verdict: Annotation<string>(),
  reasoning: Annotation<string>(),
  isValidCompany: Annotation<boolean>(),
});

// 2. Guardrail Node with Structured Ticker Extraction Output
const validateNode = async (state: typeof AgentState.State) => {
  const model = new ChatGroq({
    model: "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0.0,
  }).withStructuredOutput({
    type: "object",
    properties: {
      isValid: { type: "boolean", description: "True if a valid public company." },
      tickerSymbol: { type: "string", description: "The official stock ticker symbol of the company in uppercase (e.g. AAPL, TSLA, MSFT). If invalid, return an empty string." }
    },
    required: ["isValid", "tickerSymbol"]
  });

  const checkPrompt = `Verify if "${state.companyName}" refers to a legitimate, public trading entity. Extract its stock ticker symbol if valid.`;

  try {
    const response = await model.invoke(checkPrompt) as { isValid: boolean; tickerSymbol: string };
    if (response.isValid && response.tickerSymbol) {
      return { isValidCompany: true, ticker: response.tickerSymbol.toUpperCase() };
    }
    return { 
      isValidCompany: false, 
      verdict: "INVALID INPUT", 
      reasoning: `The input "${state.companyName}" could not be resolved to an active stock exchange registry listing.` 
    };
  } catch (error) {
    return { isValidCompany: false, verdict: "INVALID INPUT", reasoning: "Validation layer bypass failed." };
  }
};

// 3. Quantitative Node: Live Financial Extraction API
const quantitativeNode = async (state: typeof AgentState.State) => {
  try {
    yahooFinance.setGlobalConfig({ logger: { info: () => {}, warn: () => {}, error: () => {} } });
    const summary = await yahooFinance.quoteSummary(state.ticker, {
      modules: [ "summaryDetail", "financialData", "defaultKeyStatistics" ]
    });

    const metrics = `
      Current Price: $${summary.financialData?.currentPrice || "N/A"}
      Market Cap: $${summary.summaryDetail?.marketCap?.toLocaleString() || "N/A"}
      Trailing P/E Ratio: ${summary.summaryDetail?.trailingPE || "N/A"}
      Forward P/E Ratio: ${summary.summaryDetail?.forwardPE || "N/A"}
      Profit Margin: ${(summary.financialData?.profitMargins * 100)?.toFixed(2) || "N/A"}%
      Return on Equity (ROE): ${(summary.financialData?.returnOnEquity * 100)?.toFixed(2) || "N/A"}%
      Total Debt/Equity: ${summary.financialData?.debtToEquity || "N/A"}
    `;
    return { financials: metrics };
  } catch (e) {
    return { financials: "Fundamental financial metrics unavailable for this asset context." };
  }
};

// 4. Qualitative Node: Sentiment Web Scraping Analysis Pass
const marketSentimentNode = async (state: typeof AgentState.State) => {
  const searchTool = new DuckDuckGoSearch({ maxResults: 4 });
  const model = new ChatGroq({
    model: "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0.1,
  });

  try {
    const rawNews = await searchTool.invoke(`recent headlines developments and sentiment analysis for ${state.companyName} stock`);
    
    const sentimentPrompt = `Synthesize these raw web headlines regarding "${state.companyName}":
    ---
    ${rawNews}
    ---
    Isolate major institutional upgrades/downgrades, regulatory hurdles, or macro industry headwinds. 
    Summarize your findings as a strict 'Bull vs Bear' news sentiment framework.`;

    const summaryRes = await model.invoke(sentimentPrompt);
    return { newsSentiment: summaryRes.content.toString() };
  } catch (err) {
    return { newsSentiment: "Market narrative sentiment analysis collection timed out." };
  }
};

// 5. Final Investment Committee Synthesis Node
const advancedCommitteeNode = async (state: typeof AgentState.State) => {
  const model = new ChatGroq({
    model: "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0.2,
  });

  const prompt = `You are the Lead Portfolio Director of an institutional hedge fund.
  Conduct a rigorous deep-dive synthesis on "${state.companyName}" (${state.ticker}) utilizing both the quantitative and qualitative telemetry gathered by your sub-agents:

  [QUANTITATIVE CORE FUNDAMENTALS]
  ${state.financials}

  [QUALITATIVE MARKET SENTIMENT & DEVELOPMENTS]
  ${state.newsSentiment}

  Your response must stringently conform to the following formatting layout:
  VERDICT: [INVEST or PASS]
  
  INVESTMENT THESIS:
  • GROWTH CATALYSTS: [Provide a multi-sentence analytical projection]
  • COMPETITIVE MOATS: [Assess margin defensibility vs industry peers]
  • VALUATION RATIONALE: [Evaluate current multiples based on the provided numbers]
  • STRUCTURAL TAIL RISKS: [Highlight core vulnerabilities or balance sheet warning flags]`;

  const response = await model.invoke(prompt);
  return { reasoning: response.content.toString(), verdict: response.content.toString().includes("VERDICT: INVEST") ? "INVEST" : "PASS" };
};

// 6. Conditional Routing Control Hook
const routeAfterValidation = (state: typeof AgentState.State) => {
  return state.isValidCompany ? "quant_researcher" : END;
};

// 7. Graph Architecture Construction
const workflow = new StateGraph(AgentState)
  .addNode("validator", validateNode)
  .addNode("quant_researcher", quantitativeNode)
  .addNode("sentiment_analyst", marketSentimentNode)
  .addNode("committee", advancedCommitteeNode)

  .addEdge(START, "validator")
  .addConditionalEdges("validator", routeAfterValidation)
  .addEdge("quant_researcher", "sentiment_analyst") 
  .addEdge("sentiment_analyst", "committee")
  .addEdge("committee", END);

export const investmentAgent = workflow.compile();