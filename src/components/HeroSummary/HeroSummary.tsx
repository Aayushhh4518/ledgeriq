import { FinancialMetrics } from "@/types/financial";
import { generateInsights } from "@/lib/analysis/insights";
import { TrendingUp, TrendingDown, Activity, DollarSign, Wallet, Building2, ShieldCheck, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  metrics: FinancialMetrics;
  investmentScore: number;
}

export default function HeroSummary({ metrics, investmentScore }: Props) {
  const insights = generateInsights(metrics);
  const keyStrength = insights.find((i) => i.type === "strength")?.title || "Stable Operations";
  const keyRisk = insights.find((i) => i.type === "weakness")?.title || "Market Volatility";

  const isPositiveVerdict = investmentScore >= 60;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 lg:p-8 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50" />
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Left: Company & Verdict */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-zinc-400">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span className="font-medium tracking-wider uppercase text-sm">Target Company</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {metrics.company || "Unknown Company"}
          </h1>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-md text-sm font-semibold uppercase tracking-wide flex items-center gap-2 ${
              isPositiveVerdict ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              {isPositiveVerdict ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
              {isPositiveVerdict ? "Investable" : "High Risk"}
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <Activity className="w-4 h-4" />
              Health Score: <strong className="text-white">{investmentScore}/100</strong>
            </div>
          </div>
        </div>

        {/* Right: Core Metrics & Insights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 flex-1 lg:pl-12 lg:border-l lg:border-zinc-800/60">
          
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-zinc-400" /> Revenue
            </p>
            <p className="text-xl font-bold text-white">${(metrics.revenue || 0).toLocaleString()}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-zinc-400" /> Net Income
            </p>
            <p className="text-xl font-bold text-white">${(metrics.netIncome || 0).toLocaleString()}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-wider text-emerald-500 uppercase flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Key Strength
            </p>
            <p className="text-sm font-medium text-emerald-300 line-clamp-2">{keyStrength}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-wider text-rose-500 uppercase flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" /> Key Risk
            </p>
            <p className="text-sm font-medium text-rose-300 line-clamp-2">{keyRisk}</p>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
