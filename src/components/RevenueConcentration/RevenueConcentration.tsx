interface RevenueConcentrationProps {
  segmentData: Record<string, number>;
}

export default function RevenueConcentration({
  segmentData,
}: RevenueConcentrationProps) {
  if (!segmentData || Object.keys(segmentData).length === 0) {
    return (
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
          <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-base font-semibold tracking-tight text-zinc-300 mb-1">Data Unavailable</h2>
        <p className="text-sm text-zinc-500 max-w-sm">Insufficient data extracted from PDF to perform Revenue Concentration Analysis.</p>
      </div>
    );
  }

  const segments = Object.entries(segmentData)
    .map(([key, value]) => ({
      name: key,
      value,
    }))
    .sort((a, b) => b.value - a.value);

  const totalRevenue = segments.reduce((sum, seg) => sum + seg.value, 0);
  const highestConcentration = segments.length > 0 ? (segments[0].value / totalRevenue) * 100 : 0;
  const riskLevel = highestConcentration > 50 ? "High" : highestConcentration > 30 ? "Medium" : "Low";

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">Revenue Concentration</h2>
        <span className={`text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded border ${
          riskLevel === 'High' ? 'text-rose-400 bg-rose-400/10 border-rose-500/20' :
          riskLevel === 'Medium' ? 'text-amber-400 bg-amber-400/10 border-amber-500/20' :
          'text-emerald-400 bg-emerald-400/10 border-emerald-500/20'
        }`}>
          {riskLevel} Risk
        </span>
      </div>

      <div className="space-y-3">
        {segments.map((segment) => {
          const percentage = ((segment.value / totalRevenue) * 100).toFixed(1);
          return (
            <div key={segment.name} className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50 flex items-center justify-between group-hover:border-zinc-700/50 transition-colors">
              <span className="text-sm font-medium text-zinc-300 truncate max-w-[60%]">{segment.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-500">${segment.value.toLocaleString()}</span>
                <span className="text-sm font-bold text-white bg-zinc-950/50 px-2 py-1 rounded min-w-[60px] text-right">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}