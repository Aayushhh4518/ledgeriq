import { FinancialMetrics } from "@/types/financial";
import { calculateDuPont } from "@/lib/analysis/profitability";

interface Props {
  metrics: FinancialMetrics;
}

export default function DuPontAnalysis({ metrics }: Props) {
  const dupont = calculateDuPont(metrics);

  if (!dupont) {
    return (
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
          <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-base font-semibold tracking-tight text-zinc-300 mb-1">Data Unavailable</h2>
        <p className="text-sm text-zinc-500 max-w-sm">Insufficient data extracted from PDF to calculate ROE (missing Assets or Equity).</p>
      </div>
    );
  }

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">DuPont Analysis (ROE)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Return on Equity</p>
          <p className="text-2xl font-bold tracking-tight text-blue-500">
            {(dupont.roe * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Profit Margin</p>
          <p className="text-xl font-bold tracking-tight text-zinc-300">{(dupont.profitMargin * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Asset Turnover</p>
          <p className="text-xl font-bold tracking-tight text-zinc-300">{dupont.assetTurnover.toFixed(2)}x</p>
        </div>
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Financial Leverage</p>
          <p className="text-xl font-bold tracking-tight text-zinc-300">{dupont.financialLeverage.toFixed(2)}x</p>
        </div>
      </div>
      <p className="text-xs text-zinc-600 mt-4 font-mono bg-zinc-950/50 p-2 rounded inline-block border border-zinc-800/30">
        ROE = Profit Margin × Asset Turnover × Financial Leverage
      </p>
    </div>
  );
}
