import { FinancialMetrics } from "@/types/financial";

interface Props {
  metrics: FinancialMetrics;
}

export default function HealthScore({ metrics }: Props) {
  const margin =
    ((metrics.netIncome ?? 0) / (metrics.revenue || 1)) * 100;

  let score = 50;

  if (margin > 25) score += 20;
  if ((metrics.cash ?? 0) > 20000) score += 15;
  if ((metrics.grossProfit ?? 0) > (metrics.revenue ?? 0) * 0.4)
    score += 15;

  score = Math.min(score, 100);

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <div className="text-[120px] font-black leading-none tracking-tighter mix-blend-overlay">
          {score}
        </div>
      </div>
      
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6 relative z-10">
        Financial Health Score
      </h2>

      <div className="flex items-end gap-3 relative z-10">
        <div className={`text-6xl font-bold tracking-tighter ${score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
          {score}
        </div>
        <div className="text-xl text-zinc-500 font-medium mb-1">/ 100</div>
      </div>

      <div className="mt-6 flex items-center gap-2 relative z-10">
        <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          Net Margin Impact:
        </span>
        <span className="text-sm font-medium text-zinc-300">
          {margin.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}