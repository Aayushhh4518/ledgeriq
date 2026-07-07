import { AIEvidenceInsight } from "@/lib/analysis/insights";
import { TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  insights: AIEvidenceInsight[];
}

export default function StrengthsAndRisks({ insights }: Props) {
  const strengths = insights.filter(i => i.type === 'strength');
  const risks = insights.filter(i => i.type === 'risk');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Key Strengths</h2>
        </div>
        <div className="space-y-4">
          {strengths.map((s, idx) => (
            <div key={idx} className="border-l-2 border-emerald-500/50 pl-4 py-2 hover:border-emerald-400 hover:bg-emerald-500/5 transition-all duration-300 rounded-r-lg cursor-default">
              <h3 className="text-sm font-bold text-zinc-200 mb-1">{s.title}</h3>
              <p className="text-xs text-emerald-400/80 font-mono bg-emerald-500/10 inline-block px-2 py-0.5 rounded">
                Evidence: {s.evidence}
              </p>
            </div>
          ))}
          {strengths.length === 0 && <p className="text-sm text-zinc-500 italic">No significant strengths detected.</p>}
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingDown className="w-5 h-5 text-rose-400" />
          <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Key Risks</h2>
        </div>
        <div className="space-y-4">
          {risks.map((r, idx) => (
            <div key={idx} className="border-l-2 border-rose-500/50 pl-4 py-2 hover:border-rose-400 hover:bg-rose-500/5 transition-all duration-300 rounded-r-lg cursor-default">
              <h3 className="text-sm font-bold text-zinc-200 mb-1">{r.title}</h3>
              <p className="text-xs text-rose-400/80 font-mono bg-rose-500/10 inline-block px-2 py-0.5 rounded">
                Evidence: {r.evidence}
              </p>
            </div>
          ))}
          {risks.length === 0 && <p className="text-sm text-zinc-500 italic">No significant risks detected.</p>}
        </div>
      </div>
    </div>
  );
}
