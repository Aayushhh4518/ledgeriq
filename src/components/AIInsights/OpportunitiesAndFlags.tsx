import { StrategicOpportunity, AIRedFlag, AIEvidenceInsight } from "@/lib/analysis/insights";
import { Lightbulb, AlertOctagon, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  opportunities: StrategicOpportunity[];
  redFlags: AIRedFlag[];
  insights: AIEvidenceInsight[];
}

export default function OpportunitiesAndFlags({ opportunities, redFlags, insights }: Props) {
  const strengths = insights.filter(i => i.type === 'strength');

  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl flex flex-col h-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full divide-y md:divide-y-0 md:divide-x divide-zinc-800">
        
        {/* Left Column: Strengths & Opportunities */}
        <div className="p-6 space-y-8 bg-zinc-900/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Proven Strengths</h2>
            </div>
            <div className="space-y-3">
              {strengths.map((s, idx) => (
                <div key={idx} className="border-l-2 border-emerald-500/50 pl-4 py-1">
                  <h3 className="text-sm font-semibold text-zinc-200 mb-1">{s.title}</h3>
                  <p className="text-[11px] text-emerald-400/80 font-mono bg-emerald-500/10 inline-block px-2 py-0.5 rounded">
                    Evidence: {s.evidence}
                  </p>
                </div>
              ))}
              {strengths.length === 0 && <p className="text-xs text-zinc-500 italic">No significant strengths detected.</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-indigo-400" />
              <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Strategic Opportunities</h2>
            </div>
            <div className="space-y-4">
              {opportunities.map((opp, idx) => (
                <div key={idx} className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3">
                  <h3 className="text-sm font-semibold text-indigo-300 mb-1">{opp.title}</h3>
                  <p className="text-xs text-zinc-400 mb-2">{opp.description}</p>
                  <p className="text-[11px] text-indigo-400 font-mono flex items-center gap-1 before:content-[''] before:w-1 before:h-1 before:bg-indigo-400 before:rounded-full">
                    {opp.metricTarget}
                  </p>
                </div>
              ))}
              {opportunities.length === 0 && <p className="text-xs text-zinc-500 italic">No clear strategic opportunities identified.</p>}
            </div>
          </div>
        </div>

        {/* Right Column: Red Flags */}
        <div className="p-6 space-y-8 bg-rose-500/[0.02]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertOctagon className="w-5 h-5 text-rose-400" />
              <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">AI Red Flags</h2>
            </div>
            <div className="space-y-3">
              {redFlags.map((flag, idx) => (
                <div key={idx} className="border-l-2 border-rose-500 pl-4 py-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-zinc-200">{flag.title}</h3>
                    <span className="text-[9px] uppercase font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
                      {flag.severity} RISK
                    </span>
                  </div>
                  <p className="text-xs text-rose-200/70">{flag.description}</p>
                </div>
              ))}
              {redFlags.length === 0 && (
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4 flex items-center gap-3">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  <p className="text-xs text-emerald-400">No critical red flags detected in current financial profile.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
