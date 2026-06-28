This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Vercel Deployment Link: 
https://ai-investment-research-agent-eoi2-2clv4c2b4.vercel.app/

# AI Investment Research Agent Terminal 📊🤖

An autonomous, multi-node AI agent system that conducts deep quantitative and qualitative investment research on public equities. Powered by Next.js, LangChain, and Groq, the application fetches live market statistics, constructs visual risk/reward profiles, and delivers cohesive investment theses.

---

## 🔍 Overview — What it Does

This application acts as an automated financial analyst team. By inputting a stock ticker (e.g., `AAPL`, `NVDA`), the system orchestrates a workflow that:
- **Scrapes & Syncs Real-Time Market Metrics:** Sources valuation multiples, market caps, and financial health data.
- **Benchmarks Target Assets:** Measures company data against core sector averages.
- **Renders Quantitative Visualization:** Generates an interactive Radar Chart profile map directly on the user interface.
- **Generates Contextualized Synthesis:** Uses high-speed LLM inference to craft a comprehensive final text summary outlining investment pros, cons, and a final research stance.

---
⚖️ Key Decisions & Trade-Offs
Decisions Made:
Type Casting for Yahoo Finance Outputs: Because the underlying data provider returns deeply nested objects with dynamic keys, strict TypeScript type validation flagged them as never.
Vercel Deploy Accommodations: Implemented NPM_CONFIG_LEGACY_PEER_DEPS globally to bypass upstream package alignment errors during automated serverless compilation.

Component-Level Styling Overrides: Replaced shorthand padding styles inside standard React configuration objects with explicit camelCase properties (paddingTop) to fulfill strict CSS object typing.

Example 1: Apple Inc. (AAPL)
Quantitative Data Collected: Current Price: $180.20 | Market Cap: $2.8T | Trailing P/E: 28.4

Agent Stance: Neutral / Hold

Core Summary: Strong cash position and robust services growth offset by compressed hardware cycles and hardware valuation multiples stretching above historical benchmarks.

Example 2: Nvidia Corporation (NVDA)
Quantitative Data Collected: Current Price: $875.12 | Market Cap: $2.1T | Forward P/E: 35.1

Agent Stance: Bullish / Buy

Core Summary: Unprecedented sector dominance in enterprise hardware scaling infrastructure. While high multiples present a clear risk profile, near-term growth velocity justifies premium pricing.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
