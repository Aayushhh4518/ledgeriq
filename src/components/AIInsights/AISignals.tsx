import { AISignal } from "@/lib/analysis/insights";
import { Activity, ArrowRight, ShieldAlert, ShieldCheck, Zap, MessageSquareQuote } from "lucide-react";

interface Props {
  signals: AISignal[];
}

export default function AISignals({ signals }: Props) {
  const getIcon = (name: string) => {
    if (name.includes('Profit')) return <Activity className="w-4 h-4" />;
    if (name.includes('Liquid')) return <Zap className="w-4 h-4" />;
    if (name.includes('Growth')) return <ArrowRight className="w-4 h-4" />;
    if (name.includes('Efficien')) return <ShieldCheck className="w-4 h-4" />;
    return <ShieldAlert className="w-4 h-4" />;
  };

  const getColor = (status: string) => {
    if (status === 'Strong') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (status === 'Weak') return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {signals.map((signal, idx) => (
        <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col justify-between overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-wider font-bold">
                {getIcon(signal.name)}
                {signal.name}
              </div>
              <div className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getColor(signal.status)}`}>
                {signal.status}
              </div>
            </div>
            <p className="text-sm font-semibold text-zinc-200 mb-4">{signal.explanation}</p>
            
            <div className="bg-zinc-950 p-3 rounded border border-zinc-800/50">
              <p className="text-[10px] uppercase text-indigo-400 font-bold mb-1 flex items-center gap-1">
                <MessageSquareQuote className="w-3 h-3" /> Analyst Reasoning
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {signal.analystReasoning}
              </p>
            </div>
          </div>
          <div className="px-4 py-3 bg-zinc-900 border-t border-zinc-800/50 flex justify-between items-center text-xs">
            <span className="text-zinc-500">Confidence</span>
            <span className="text-zinc-300 font-mono">{signal.confidence}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
