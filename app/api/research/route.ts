import { NextResponse } from "next/server";
import { investmentAgent } from "./agent";

export const maxDuration = 60; 

export async function POST(request: Request) {
  try {
    const { companyName } = await request.json();

    if (!companyName || typeof companyName !== "string") {
      return NextResponse.json({ error: "A valid company name is required." }, { status: 400 });
    }

    // Pass the state properties required by your updated architecture
    const result = await investmentAgent.invoke({
      companyName: companyName,
      ticker: "",
      financials: "",
      newsSentiment: "",
      verdict: "",
      reasoning: "",
      isValidCompany: false,
    });

    return NextResponse.json({
      companyName: result.companyName,
      ticker: result.ticker,
      verdict: result.verdict,
      reasoning: result.reasoning,
    });
  } catch (error: any) {
    console.error("Graph Execution Error:", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}