import { FinancialMetrics } from "@/types/financial";

interface Props {
  metrics: FinancialMetrics;
}

export default function RatioAnalysis({ metrics }: Props) {
  const grossMargin =
    ((metrics.grossProfit ?? 0) / (metrics.revenue || 1)) * 100;

  const netMargin =
    ((metrics.netIncome ?? 0) / (metrics.revenue || 1)) * 100;

  const cashRatio =
    ((metrics.cash ?? 0) / (metrics.revenue || 1)) * 100;

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 relative overflow-hidden group">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">
        Ratio Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">
            Gross Margin
          </p>
          <p className="text-2xl font-bold tracking-tight text-white">
            {grossMargin.toFixed(1)}%
          </p>
        </div>

        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">
            Net Margin
          </p>
          <p className="text-2xl font-bold tracking-tight text-white">
            {netMargin.toFixed(1)}%
          </p>
        </div>

        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">
            Cash Ratio
          </p>
          <p className="text-2xl font-bold tracking-tight text-white">
            {cashRatio.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}