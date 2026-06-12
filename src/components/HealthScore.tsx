import { FinancialMetrics } from "@/types/financial";
import { motion } from "framer-motion";

interface Props {
  metrics: FinancialMetrics;
}

export default function HealthScore({ metrics }: Props) {
  const margin = ((metrics.netIncome?.value ?? 0) / (metrics.revenue?.value || 1)) * 100;

  let score = 50;
  if (margin > 25) score += 20;
  if ((metrics.cash?.value ?? 0) > 20000) score += 15;
  if ((metrics.grossProfit?.value ?? 0) > (metrics.revenue?.value ?? 0) * 0.4) score += 15;
  score = Math.min(score, 100);

  let color = "#10b981"; // Emerald
  let glowColor = "rgba(16, 185, 129, 0.4)";
  if (score < 50) {
    color = "#ef4444"; // Rose
    glowColor = "rgba(239, 68, 68, 0.4)";
  } else if (score < 80) {
    color = "#f59e0b"; // Amber
    glowColor = "rgba(245, 158, 11, 0.4)";
  }

  // SVG Arc Calculations
  const radius = 80;
  const circumference = Math.PI * radius; // Half circle
  const dashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
          System Health Score
        </h2>
      </div>

      <div className="flex flex-col items-center relative z-10">
        <div className="relative w-48 h-24">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100">
            {/* Background Arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Glowing Shadow Arc */}
            <motion.path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ filter: `drop-shadow(0 0 12px ${glowColor})` }}
            />
          </svg>
          
          {/* Center Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-baseline gap-1 drop-shadow-md"
            >
              <span className="text-[56px] font-black tracking-tighter leading-none" style={{ color }}>
                {score}
              </span>
              <span className="text-xl text-zinc-600 font-bold">/100</span>
            </motion.div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 shadow-inner">
          <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
            Net Margin Impact
          </span>
          <span className="text-[13px] font-bold text-zinc-300 font-mono">
            {margin.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}