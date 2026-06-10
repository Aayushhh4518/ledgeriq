import { FinancialMetrics } from "@/types/financial";
import { calculateLiquidity } from "@/lib/analysis/liquidity";

interface Props {
  metrics: FinancialMetrics;
}

export default function LiquidityPanel({ metrics }: Props) {
  const liquidity = calculateLiquidity(metrics);

  if (!liquidity) {
    return (
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-6 relative overflow-hidden group opacity-50">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-2">Liquidity & Solvency</h2>
        <p className="text-sm text-zinc-500">Insufficient data extracted from PDF (missing Assets or Liabilities).</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 relative overflow-hidden group">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">Liquidity & Solvency</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Current Ratio</p>
          <p className="text-2xl font-bold tracking-tight text-white mb-2">
            {liquidity.currentRatio.toFixed(2)}
          </p>
          <p className="text-[11px] text-zinc-500 bg-zinc-950/50 p-2 rounded inline-block border border-zinc-800/30">
            Short-term liquidity (Current Assets / Current Liabilities)
          </p>
        </div>
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Debt to Equity</p>
          <p className="text-2xl font-bold tracking-tight text-white mb-2">
            {liquidity.debtToEquity.toFixed(2)}
          </p>
          <p className="text-[11px] text-zinc-500 bg-zinc-950/50 p-2 rounded inline-block border border-zinc-800/30">
            Financial leverage (Total Liabilities / Shareholder Equity)
          </p>
        </div>
      </div>
    </div>
  );
}
