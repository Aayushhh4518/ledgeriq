import { HealthBreakdownItem } from "@/lib/analysis/insights";
import { Activity, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface Props {
  breakdown: HealthBreakdownItem[];
  finalScore: number;
}

export default function HealthBreakdown({ breakdown, finalScore }: Props) {
  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-indigo-400" />
        <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Health Score Breakdown</h2>
      </div>

      <div className="mb-6 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-white">{finalScore}</span>
        <span className="text-zinc-500 text-sm font-mono">/100 FINAL</span>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {breakdown.map((item, idx) => (
          <div key={idx} className="flex gap-3 p-3 -mx-3 rounded-lg hover:bg-white/[0.03] transition-colors border-b border-zinc-800/50 hover:border-transparent last:border-0">
            <div className="mt-0.5">
              {item.status === 'passed' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {item.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {item.status === 'error' && <XCircle className="w-4 h-4 text-rose-400" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-zinc-200">{item.component}</span>
                <span className={`text-xs font-mono ${item.impact >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {item.impact >= 0 ? '+' : ''}{item.impact}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
