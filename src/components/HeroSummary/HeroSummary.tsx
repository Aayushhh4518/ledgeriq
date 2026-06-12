import { FinancialMetrics } from "@/types/financial";
import { generateInsights } from "@/lib/analysis/insights";
import { TrendingUp, TrendingDown, Activity, DollarSign, Building2, ShieldCheck, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { generateHeroNarrative } from "@/lib/analysis/narrativeEngine";

interface Props {
  metrics: FinancialMetrics;
  investmentScore: number;
}

import { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function HeroSummary({ metrics, investmentScore }: Props) {
  const insights = generateInsights(metrics);
  const keyStrength = insights.find((i) => i.type === "strength")?.title || "Stable Operations";
  const keyRisk = insights.find((i) => i.type === "weakness")?.title || "Market Volatility";

  const isPositiveVerdict = investmentScore >= 60;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="bg-[#0a0a0a]/50 border border-white/5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl p-6 lg:p-10 relative overflow-hidden group transition-all duration-700 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        
        {/* Left: Company & Verdict */}
        <div className="space-y-6 flex-1">
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center shadow-inner group-hover:border-white/10 transition-colors">
              <Building2 className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-semibold tracking-[0.2em] uppercase text-[11px] text-zinc-500">
              Intelligence Target
            </span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
            {metrics.company || "Unknown Entity"}
          </motion.h1>
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-sm backdrop-blur-md ${
              isPositiveVerdict 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              {isPositiveVerdict ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
              {isPositiveVerdict ? "Investable" : "High Risk"}
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 shadow-sm backdrop-blur-md">
              <Activity className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-semibold text-zinc-400 tracking-wide">Health Score</span>
              <strong className="text-sm text-white ml-1 font-mono"><AnimatedCounter value={investmentScore} duration={2} />/100</strong>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="pt-2">
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
              {generateHeroNarrative(metrics, investmentScore)}
            </p>
          </motion.div>
        </div>

        {/* Right: Core Metrics & Insights Grid */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6 lg:w-[600px] shrink-0">
          
          <motion.div variants={itemVariants} className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner hover:bg-white/[0.04] transition-all duration-300">
            <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-zinc-400" /> Total Revenue
            </p>
            <p className="text-2xl font-bold text-white tracking-tight">
              $<AnimatedCounter value={metrics.revenue?.value || 0} />
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner hover:bg-white/[0.04] transition-all duration-300">
            <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-zinc-400" /> Net Income
            </p>
            <p className="text-2xl font-bold text-white tracking-tight">
              $<AnimatedCounter value={metrics.netIncome?.value || 0} />
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2 p-5 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10 shadow-inner hover:bg-emerald-500/[0.05] transition-all duration-300">
            <p className="text-[10px] font-bold tracking-widest text-emerald-500/70 uppercase flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" /> Primary Strength
            </p>
            <p className="text-[13px] font-medium text-emerald-100/90 leading-relaxed line-clamp-2">{keyStrength}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2 p-5 rounded-2xl bg-rose-500/[0.02] border border-rose-500/10 shadow-inner hover:bg-rose-500/[0.05] transition-all duration-300">
            <p className="text-[10px] font-bold tracking-widest text-rose-500/70 uppercase flex items-center gap-2">
              <TrendingDown className="w-3.5 h-3.5" /> Primary Risk
            </p>
            <p className="text-[13px] font-medium text-rose-100/90 leading-relaxed line-clamp-2">{keyRisk}</p>
          </motion.div>

        </div>

      </div>
    </motion.div>
  );
}
