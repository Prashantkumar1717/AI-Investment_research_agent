This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# AI Investment Research Agent Terminal 

An autonomous, multi-node AI agent system built with Next.js, LangChain, and Groq to conduct deep quantitative and qualitative investment research. The application fetches real-time financial market metrics, evaluates core sector baselines, and generates clean, responsive visual data profiles.

##  Features

- **Autonomous Agent Layout:** Uses structured agent nodes to coordinate quantitative data analysis and market sentiment checks.
- **Real-Time Data Streams:** Integrates directly with Yahoo Finance (`yahoo-finance2`) to query current asset valuations, key statistics, financial ratios, and market caps.
- **Dynamic Charting Engine:** Renders comprehensive interactive radar profiles comparing target equity benchmarks against sector averages using Recharts.
- **Groq AI Integration:** Powers ultra-fast, contextualized analytical reasoning and text reports summarizing company fundamentals.

---

##  Tech Stack

- **Framework:** Next.js (App Router)
- **AI Orchestration:** LangChain / `@langchain/community`, Groq API
- **Data Infrastructure:** `yahoo-finance2`, `@browserbasehq/stagehand`
- **UI & Data Viz:** Tailwind CSS, Recharts, Lucide React


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
