import { FinancialMetrics } from "@/types/financial";
import { calculateLiquidity } from "@/lib/analysis/liquidity";

interface Props {
  metrics: FinancialMetrics;
}

export default function LiquidityPanel({ metrics }: Props) {
  const liquidity = calculateLiquidity(metrics);

  if (!liquidity) {
    return (
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
          <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-base font-semibold tracking-tight text-zinc-300 mb-1">Data Unavailable</h2>
        <p className="text-sm text-zinc-500 max-w-sm">Insufficient data extracted from PDF to calculate Liquidity & Solvency.</p>
      </div>
    );
  }

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
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
