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
      className="bg-[#0a0a0a]/60 border border-white/5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl p-6 lg:p-10 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-violet-500/[0.02] z-0 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        
        {/* Left: Company & Verdict */}
        <div className="space-y-5 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-inner">
              <Building2 className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-bold tracking-[0.2em] uppercase text-[11px] text-zinc-500">
              Intelligence Target
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
            {metrics.company || "Unknown Entity"}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest flex items-center gap-2 shadow-inner ${
              isPositiveVerdict 
                ? 'bg-emerald-500/[0.05] text-emerald-400 border border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' 
                : 'bg-rose-500/[0.05] text-rose-400 border border-rose-500/20 shadow-[inset_0_0_20px_rgba(244,63,94,0.05)]'
            }`}>
              {isPositiveVerdict ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
              {isPositiveVerdict ? "Investable" : "High Risk"}
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 shadow-inner">
              <Activity className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-400">System Health Rating</span>
              <strong className="text-base text-white ml-1 font-mono">{investmentScore}/100</strong>
            </div>
          </div>
        </div>

        {/* Right: Core Metrics & Insights Grid */}
        <div className="grid grid-cols-2 gap-6 lg:gap-8 lg:w-[600px] shrink-0">
          
          <div className="space-y-1.5 p-4 rounded-xl bg-white/[0.02] border border-white/5 shadow-inner group-hover:bg-white/[0.04] transition-colors">
            <p className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-zinc-400" /> Total Revenue
            </p>
            <p className="text-2xl font-bold text-white tracking-tight">${(metrics.revenue || 0).toLocaleString()}</p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-white/[0.02] border border-white/5 shadow-inner group-hover:bg-white/[0.04] transition-colors">
            <p className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-zinc-400" /> Net Income
            </p>
            <p className="text-2xl font-bold text-white tracking-tight">${(metrics.netIncome || 0).toLocaleString()}</p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-emerald-500/[0.02] border border-emerald-500/10 shadow-inner group-hover:bg-emerald-500/[0.04] transition-colors">
            <p className="text-[11px] font-bold tracking-widest text-emerald-500 uppercase flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" /> Primary Strength
            </p>
            <p className="text-sm font-medium text-emerald-300/90 leading-relaxed line-clamp-2">{keyStrength}</p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-rose-500/[0.02] border border-rose-500/10 shadow-inner group-hover:bg-rose-500/[0.04] transition-colors">
            <p className="text-[11px] font-bold tracking-widest text-rose-500 uppercase flex items-center gap-2">
              <TrendingDown className="w-3.5 h-3.5" /> Primary Risk
            </p>
            <p className="text-sm font-medium text-rose-300/90 leading-relaxed line-clamp-2">{keyRisk}</p>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
