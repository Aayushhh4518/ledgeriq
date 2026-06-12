import { FinancialMetrics } from "@/types/financial";
import { generateInsights } from "@/lib/analysis/insights";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";

interface Props {
  metrics: FinancialMetrics;
}

export default function StrengthsWeaknesses({ metrics }: Props) {
  const insights = generateInsights(metrics);

  if (insights.length === 0) {
    return (
      <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 opacity-50 overflow-hidden">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-2">Strategic Insights Engine</h2>
        <p className="text-sm text-zinc-500">Not enough data to generate insights.</p>
      </div>
    );
  }

  const strengths = insights.filter((i) => i.type === "strength");
  const weaknesses = insights.filter((i) => i.type === "weakness");

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">Strategic Insights Engine</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" /> Key Strengths
          </h3>
          <div className="space-y-3">
            {strengths.map((s, idx) => (
              <div key={idx} className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg hover:bg-emerald-500/20 transition-colors">
                <p className="font-semibold text-emerald-300 mb-1">{s.title}</p>
                <p className="text-sm text-emerald-200/70">{s.description}</p>
              </div>
            ))}
            {strengths.length === 0 && <p className="text-sm text-zinc-500 italic">No significant strengths detected.</p>}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-rose-400 flex items-center gap-2 uppercase tracking-wider">
            <TrendingDown className="w-4 h-4" /> Key Weaknesses
          </h3>
          <div className="space-y-3">
            {weaknesses.map((w, idx) => (
              <div key={idx} className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-lg hover:bg-rose-500/20 transition-colors">
                <p className="font-semibold text-rose-300 mb-1">{w.title}</p>
                <p className="text-sm text-rose-200/70">{w.description}</p>
              </div>
            ))}
            {weaknesses.length === 0 && <p className="text-sm text-zinc-500 italic">No significant weaknesses detected.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
