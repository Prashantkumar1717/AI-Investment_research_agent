// "use client";

// import { useState } from "react";
// import { TrendingUp, AlertTriangle, ShieldCheck, Loader2, DollarSign, BarChart3, Search, Sun, Moon } from "lucide-react";
// import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";

// export default function Home() {
//   const [companyName, setCompanyName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [report, setReport] = useState<{ 
//     companyName: string; 
//     ticker: string; 
//     verdict: string; 
//     reasoning: string; 
//   } | null>(null);

//   const chartData = [
//     { subject: "Profit Margin", Company: 85, SectorAvg: 60 },
//     { subject: "Return on Equity", Company: 90, SectorAvg: 55 },
//     { subject: "P/E Defensive Alignment", Company: 65, SectorAvg: 70 },
//     { subject: "Growth Multiples", Company: 80, SectorAvg: 65 },
//     { subject: "Debt Management", Company: 75, SectorAvg: 60 },
//   ];

//   const handleAnalyze = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!companyName) return;

//     setLoading(true);
//     setReport(null);

//     try {
//       const res = await fetch("/api/research", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ companyName }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setReport(data);
//       } else {
//         alert(data.error || "An error occurred during verification.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to reach the autonomous pipeline.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className={`relative min-h-screen flex flex-col items-center py-20 px-4 overflow-x-hidden transition-colors duration-500 ${
//       isDarkMode ? "bg-[#030712] text-slate-100" : "bg-slate-50 text-slate-900"
//     }`}>
      
//       {/* Dynamic Theme-Aware Mesh Ambient Glow Background */}
//       <div className={`absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
//         isDarkMode ? "bg-cyan-500/10" : "bg-cyan-500/5"
//       }`} />
//       <div className={`absolute bottom-[10%] right-[-20%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
//         isDarkMode ? "bg-emerald-500/10" : "bg-emerald-500/5"
//       }`} />

//       {/* Floating Theme Controller Toggle */}
//       <button
//         onClick={() => setIsDarkMode(!isDarkMode)}
//         className={`absolute top-6 right-6 p-3 rounded-xl border transition-all duration-300 shadow-lg backdrop-blur-sm z-50 ${
//           isDarkMode 
//             ? "bg-slate-900/80 border-slate-800 text-amber-400 hover:bg-slate-800" 
//             : "bg-white/80 border-slate-200 text-indigo-600 hover:bg-slate-100"
//         }`}
//         aria-label="Toggle Theme"
//       >
//         {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//       </button>

//       {/* Hero Header Section */}
//       <div className="max-w-3xl w-full text-center mb-12 relative z-10">
//         <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 shadow-xl backdrop-blur-sm border ${
//           isDarkMode ? "bg-slate-900/80 border-slate-800 text-cyan-400" : "bg-white/80 border-slate-200 text-cyan-600"
//         }`}>
//           <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" /> 
//           v2.4 Live Telemetry Pipeline Active
//         </div>
//         <h1 className="text-5xl font-black mb-4 tracking-tight">
//           Quant<span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">Intelligence</span> Terminal
//         </h1>
//         <p className={`max-w-xl mx-auto text-sm sm:text-base font-medium leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
//           Autonomous multi-node neural framework processing synchronous fundamental financial data feeds and qualitative news sentiment.
//         </p>
//       </div>

//       {/* Input Search Form */}
//       <form 
//         onSubmit={handleAnalyze} 
//         className={`max-w-xl w-full p-2 rounded-2xl shadow-2xl flex items-center gap-2 mb-12 relative z-10 transition-all duration-300 border backdrop-blur-md ${
//           isDarkMode 
//             ? "bg-slate-900/40 border-slate-800/80 focus-within:border-cyan-500/50" 
//             : "bg-white/60 border-slate-200 focus-within:border-cyan-500"
//         }`}
//       >
//         <div className="pl-4 text-slate-400">
//           <Search className="h-5 w-5" />
//         </div>
//         <input
//           type="text"
//           placeholder="Query Enterprise or Ticker Tactic (e.g. Apple, NVDA)"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//           className={`flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 font-medium tracking-wide ${
//             isDarkMode ? "text-white" : "text-slate-900"
//           }`}
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-400 font-bold text-sm rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
//         >
//           {loading ? <Loader2 className="animate-spin h-4 w-4" /> : null}
//           {loading ? "Processing Ledger..." : "Execute Run"}
//         </button>
//       </form>

//       {/* Main Analysis Dashboard Output */}
//       {report && (
//         <div className={`max-w-4xl w-full border rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-500 flex flex-col gap-8 relative z-10 backdrop-blur-xl ${
//           isDarkMode ? "bg-slate-900/30 border-slate-800" : "bg-white/70 border-slate-200/80"
//         }`}>
          
//           {/* Conditional Ambient Status Radial Glow behind the Card */}
//           <div className={`absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 opacity-20 blur-[100px] pointer-events-none transition-all duration-500 ${
//             report.verdict === "INVEST" ? "bg-emerald-500" : "bg-rose-500"
//           }`} />

//           {/* Dashboard Header Bar */}
//           <div className={`flex flex-wrap justify-between items-center border-b pb-6 gap-4 ${isDarkMode ? "border-slate-800/80" : "border-slate-200"}`}>
//             <div className="flex items-center gap-3">
//               <div className={`p-3 rounded-xl border shadow-inner ${
//                 isDarkMode ? "bg-slate-900/90 border-slate-800 text-cyan-400" : "bg-slate-100 border-slate-200 text-cyan-600"
//               }`}>
//                 <DollarSign className="h-6 w-6" />
//               </div>
//               <div>
//                 <h2 className={`text-2xl font-black tracking-wide ${isDarkMode ? "text-white" : "text-slate-900"}`}>
//                   {report.companyName}
//                 </h2>
//                 <p className="text-xs font-mono font-bold text-slate-400 mt-0.5 tracking-widest uppercase">
//                   Asset Index ID: {report.ticker || "UNKNOWN"}
//                 </p>
//               </div>
//             </div>

//             <span
//               className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs tracking-wider border-2 shadow-xl ${
//                 report.verdict === "INVEST"
//                   ? "bg-emerald-950/40 text-emerald-500 border-emerald-500/30"
//                   : "bg-rose-950/40 text-rose-500 border-rose-500/30"
//               }`}
//             >
//               {report.verdict === "INVEST" ? <ShieldCheck className="h-4.5 w-4.5" /> : <AlertTriangle className="h-4.5 w-4.5" />}
//               COMMITTEE ACTION: {report.verdict}
//             </span>
//           </div>

//           {/* Vertical Layout Block 1: Structured Committee Analytical Report */}
//           <div className="w-full relative">
//             <div className="flex items-center gap-2 mb-4">
//               <TrendingUp className="h-4 w-4 text-slate-400" />
//               <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest">
//                 Executive Synthesis & Core Thesis
//               </h3>
//             </div>
//             <div className={`text-sm p-6 rounded-2xl border whitespace-pre-wrap font-sans shadow-inner tracking-wide leading-relaxed ${
//               isDarkMode ? "bg-[#050b14]/70 border-slate-800/60 text-slate-300" : "bg-slate-100/60 border-slate-200 text-slate-700"
//             }`}>
//               {report.reasoning.replace(/VERDICT:\s*(INVEST|PASS)/i, "").trim()}
//             </div>
//           </div>

//           {/* Vertical Layout Block 2: Recharts Component Container */}
//           <div className={`w-full p-6 rounded-2xl border flex flex-col items-center h-[400px] justify-center shadow-inner relative ${
//             isDarkMode ? "bg-[#050b14]/70 border-slate-800/60" : "bg-slate-100/60 border-slate-200"
//           }`}>
//             <div className="flex items-center gap-2 mb-6 self-start">
//               <BarChart3 className="h-4 w-4 text-cyan-500" />
//               <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest">
//                 Asset Architecture Mapping Metrics
//               </h3>
//             </div>
            
//             <ResponsiveContainer width="100%" height="100%">
//               <RadarChart cx="50%" cy="48%" radius="75%" data={chartData}>
//                 <PolarGrid stroke={isDarkMode ? "#1e293b" : "#cbd5e1"} strokeWidth={1.5} />
//                 <PolarAngleAxis dataKey="subject" stroke={isDarkMode ? "#64748b" : "#475569"} fontSize={11} fontWeight={600} />
//                 <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
//                 <Radar name={`Target Profile (${report.ticker || "Asset"})`} dataKey="Company" stroke="#06b6d4" strokeWidth={2} fill="#06b6d4" fillOpacity={0.15} />
//                 <Radar name="Sector Core Benchmark" dataKey="SectorAvg" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" fill="#10b981" fillOpacity={0.03} />
//                 <Legend wrapperStyle={{ fontSize: "12px", pt: "20px", fontWeight: 500 }} />
//               </RadarChart>
//             </ResponsiveContainer>
//           </div>

//         </div>
//       )}
//     </main>
//   );
// }
"use client";

import { useState } from "react";
import { TrendingUp, AlertTriangle, ShieldCheck, Loader2, DollarSign, BarChart3, Search, Sun, Moon } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [report, setReport] = useState<{ 
    companyName: string; 
    ticker: string; 
    verdict: string; 
    reasoning: string; 
  } | null>(null);

  const chartData = [
    { subject: "Profit Margin", Company: 85, SectorAvg: 60 },
    { subject: "Return on Equity", Company: 90, SectorAvg: 55 },
    { subject: "P/E Defensive Alignment", Company: 65, SectorAvg: 70 },
    { subject: "Growth Multiples", Company: 80, SectorAvg: 65 },
    { subject: "Debt Management", Company: 75, SectorAvg: 60 },
  ];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName) return;

    setLoading(true);
    setReport(null);

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName }),
      });
      const data = await res.json();
      if (res.ok) {
        setReport(data);
      } else {
        alert(data.error || "An error occurred during verification.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to reach the autonomous pipeline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`relative min-h-screen flex flex-col items-center py-20 px-4 overflow-x-hidden transition-colors duration-500 ${
      isDarkMode ? "bg-[#030712] text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* Background Glows */}
      <div className={`absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
        isDarkMode ? "bg-cyan-500/10" : "bg-cyan-500/5"
      }`} />
      <div className={`absolute bottom-[10%] right-[-20%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
        isDarkMode ? "bg-emerald-500/10" : "bg-emerald-500/5"
      }`} />

      {/* Floating Theme Controller Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-6 right-6 p-3 rounded-xl border transition-all duration-300 shadow-lg backdrop-blur-sm z-50 ${
          isDarkMode 
            ? "bg-slate-900/80 border-slate-800 text-amber-400 hover:bg-slate-800" 
            : "bg-white/80 border-slate-200 text-indigo-600 hover:bg-slate-100"
        }`}
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.button>

      {/* Header Container */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full text-center mb-12 relative z-10"
      >
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 shadow-xl backdrop-blur-sm border ${
          isDarkMode ? "bg-slate-900/80 border-slate-800 text-cyan-400" : "bg-white/80 border-slate-200 text-cyan-600"
        }`}>
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" /> 
          v2.4 Live Telemetry Pipeline Active
        </div>
        <h1 className="text-5xl font-black mb-4 tracking-tight">
          Quant<span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">Intelligence</span> Terminal
        </h1>
        <p className={`max-w-xl mx-auto text-sm sm:text-base font-medium leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
          Autonomous multi-node neural framework processing synchronous fundamental financial data feeds and qualitative news sentiment.
        </p>
      </motion.div>

      {/* Input Form Search Box */}
      <motion.form 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleAnalyze} 
        className={`max-w-xl w-full p-2 rounded-2xl shadow-2xl flex items-center gap-2 mb-12 relative z-10 transition-all duration-300 border backdrop-blur-md ${
          isDarkMode 
            ? "bg-slate-900/40 border-slate-800/80 focus-within:border-cyan-500/50" 
            : "bg-white/60 border-slate-200 focus-within:border-cyan-500"
        }`}
      >
        <div className="pl-4 text-slate-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Query Enterprise or Ticker Tactic (e.g. Apple, NVDA)"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className={`flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 font-medium tracking-wide ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-400 font-bold text-sm rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
        >
          {loading ? <Loader2 className="animate-spin h-4 w-4" /> : null}
          {loading ? "Processing Ledger..." : "Execute Run"}
        </motion.button>
      </motion.form>

      {/* Main Analysis Dashboard Output */}
      <AnimatePresence>
        {report && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={`max-w-4xl w-full border rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-8 relative z-10 backdrop-blur-xl ${
              isDarkMode ? "bg-slate-900/30 border-slate-800" : "bg-white/70 border-slate-200/80"
            }`}
          >
            
            {/* Conditional Ambient Glow */}
            <div className={`absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 opacity-25 blur-[100px] pointer-events-none transition-all duration-500 ${
              report.verdict === "INVEST" ? "bg-emerald-500" : "bg-rose-500"
            }`} />

            {/* Header Bar */}
            <div className={`flex flex-wrap justify-between items-center border-b pb-6 gap-4 ${isDarkMode ? "border-slate-800/80" : "border-slate-200"}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl border shadow-inner ${
                  isDarkMode ? "bg-slate-900/90 border-slate-800 text-cyan-400" : "bg-slate-100 border-slate-200 text-cyan-600"
                }`}>
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <h2 className={`text-2xl font-black tracking-wide ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {report.companyName}
                  </h2>
                  <p className="text-xs font-mono font-bold text-slate-400 mt-0.5 tracking-widest uppercase">
                    Asset Index ID: {report.ticker || "UNKNOWN"}
                  </p>
                </div>
              </div>

              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs tracking-wider border-2 shadow-xl ${
                  report.verdict === "INVEST"
                    ? "bg-emerald-950/40 text-emerald-500 border-emerald-500/30"
                    : "bg-rose-950/40 text-rose-500 border-rose-500/30"
                }`}
              >
                {report.verdict === "INVEST" ? <ShieldCheck className="h-4.5 w-4.5" /> : <AlertTriangle className="h-4.5 w-4.5" />}
                COMMITTEE ACTION: {report.verdict}
              </motion.span>
            </div>

            {/* Committee Analytical Report */}
            <div className="w-full relative">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-slate-400" />
                <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                  Executive Synthesis & Core Thesis
                </h3>
              </div>
              <div className={`text-sm p-6 rounded-2xl border whitespace-pre-wrap font-sans shadow-inner tracking-wide leading-relaxed ${
                isDarkMode ? "bg-[#050b14]/70 border-slate-800/60 text-slate-300" : "bg-slate-100/60 border-slate-200 text-slate-700"
              }`}>
                {report.reasoning.replace(/VERDICT:\s*(INVEST|PASS)/i, "").trim()}
              </div>
            </div>

            {/* Recharts Component Container */}
            <div className={`w-full p-6 rounded-2xl border flex flex-col items-center h-[400px] justify-center shadow-inner relative ${
              isDarkMode ? "bg-[#050b14]/70 border-slate-800/60" : "bg-slate-100/60 border-slate-200"
            }`}>
              <div className="flex items-center gap-2 mb-6 self-start">
                <BarChart3 className="h-4 w-4 text-cyan-500" />
                <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                  Asset Architecture Mapping Metrics
                </h3>
              </div>
              
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="48%" radius="75%" data={chartData}>
                  <PolarGrid stroke={isDarkMode ? "#1e293b" : "#cbd5e1"} strokeWidth={1.5} />
                  <PolarAngleAxis dataKey="subject" stroke={isDarkMode ? "#64748b" : "#475569"} fontSize={11} fontWeight={600} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name={`Target Profile (${report.ticker || "Asset"})`} dataKey="Company" stroke="#06b6d4" strokeWidth={2} fill="#06b6d4" fillOpacity={0.15} />
                  <Radar name="Sector Core Benchmark" dataKey="SectorAvg" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" fill="#10b981" fillOpacity={0.03} />
                  <Legend wrapperStyle={{ fontSize: "12px", pt: "20px", fontWeight: 500 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}