import { SegmentData } from "@/types/financial";

interface SegmentAnalysisProps {
  data?: SegmentData | null;
}

export default function SegmentAnalysis({ data }: SegmentAnalysisProps) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
          <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-base font-semibold tracking-tight text-zinc-300 mb-1">Data Unavailable</h2>
        <p className="text-sm text-zinc-500 max-w-sm">Insufficient data extracted from PDF to perform Segment Analysis.</p>
      </div>
    );
  }

  const totalSegments = Object.values(data).filter((val) => typeof val === 'number' && val > 0).length;

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">Segment Analysis</h2>
        <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold px-2 py-1 bg-zinc-800/50 rounded">
          {totalSegments} Segments
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2 truncate" title={key}>{key}</p>
            <p className="text-xl font-bold tracking-tight text-white">${value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}