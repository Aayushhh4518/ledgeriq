interface GrowthAnalysisProps {
  revenueCurrent: number;
  revenuePrevious: number;
  netIncomeCurrent: number;
  netIncomePrevious: number;
}

export default function GrowthAnalysis({
  revenueCurrent,
  revenuePrevious,
  netIncomeCurrent,
  netIncomePrevious,
}: GrowthAnalysisProps) {
  const revenueGrowth =
    ((revenueCurrent - revenuePrevious) / revenuePrevious) * 100;

  const netIncomeGrowth =
    ((netIncomeCurrent - netIncomePrevious) / netIncomePrevious) * 100;

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 relative overflow-hidden group">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">
        Growth Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">
            Revenue Growth
          </p>

          <p className={`text-3xl font-bold tracking-tight ${revenueGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {revenueGrowth > 0 ? '+' : ''}{revenueGrowth.toFixed(2)}%
          </p>
        </div>

        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">
            Net Income Growth
          </p>

          <p className={`text-3xl font-bold tracking-tight ${netIncomeGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {netIncomeGrowth > 0 ? '+' : ''}{netIncomeGrowth.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}