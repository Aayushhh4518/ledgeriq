import { SegmentData } from "@/types/financial";

interface SegmentAnalysisProps {
  data?: SegmentData | null;
}

export default function SegmentAnalysis({ data }: SegmentAnalysisProps) {
  if (!data) return null;

  const totalSegments = Object.values(data).filter((val) => typeof val === 'number' && val > 0).length;

  return (
    <div className="group relative bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-6 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">Segment Analysis</h2>
        <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold px-2 py-1 bg-zinc-800/50 rounded">
          {totalSegments} Segments
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">iPhone</p>
          <p className="text-xl font-bold tracking-tight text-white">${data.iphone.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Mac</p>
          <p className="text-xl font-bold tracking-tight text-white">${data.mac.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">iPad</p>
          <p className="text-xl font-bold tracking-tight text-white">${data.ipad.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center col-span-2 md:col-span-1">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2 truncate" title="Wearables, Home & Accessories">Wearables</p>
          <p className="text-xl font-bold tracking-tight text-white">${data.wearables.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center col-span-2 md:col-span-1">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Services</p>
          <p className="text-xl font-bold tracking-tight text-white">${data.services.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}