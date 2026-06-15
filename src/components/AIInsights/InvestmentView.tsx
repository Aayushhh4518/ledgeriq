import { InvestmentRecommendation, KeyDriver } from "@/lib/analysis/insights";
import { Target, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";

interface Props {
  recommendation: InvestmentRecommendation;
  drivers: KeyDriver[];
}

export default function InvestmentView({ recommendation, drivers }: Props) {
  const getViewColor = (view: string) => {
    if (view.includes("Buy")) return "text-emerald-400";
    if (view.includes("Hold")) return "text-amber-400";
    return "text-rose-400";
  };

  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-zinc-800 bg-zinc-900/30">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">AI Investment View</h2>
        </div>
        <div className="flex items-baseline gap-4 mb-3">
          <h3 className={`text-4xl font-bold tracking-tight ${getViewColor(recommendation.view)}`}>{recommendation.view}</h3>
          <span className="text-zinc-500 text-sm font-mono">{recommendation.confidence}% CONF</span>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed mb-6">{recommendation.reasoning}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> {recommendation.bullCase.title}
            </h4>
            <ul className="space-y-1">
              {recommendation.bullCase.drivers.map((driver, idx) => (
                <li key={idx} className="text-xs text-zinc-400 list-disc list-inside">{driver}</li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-4">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <TrendingDown className="w-4 h-4" /> {recommendation.bearCase.title}
            </h4>
            <ul className="space-y-1">
              {recommendation.bearCase.drivers.map((driver, idx) => (
                <li key={idx} className="text-xs text-zinc-400 list-disc list-inside">{driver}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-1">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Key Financial Drivers</h4>
        <div className="space-y-3">
          {drivers.map((driver, idx) => (
            <div key={idx} className="flex items-center justify-between pb-3 border-b border-zinc-800/50 last:border-0 last:pb-0">
              <span className="text-sm text-zinc-300">{driver.metric}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-zinc-100">{driver.value}</span>
                {driver.trend === 'positive' && <TrendingUp className="w-4 h-4 text-emerald-400" />}
                {driver.trend === 'negative' && <TrendingDown className="w-4 h-4 text-rose-400" />}
                {driver.trend === 'neutral' && <div className="w-4 h-0.5 bg-zinc-600 rounded-full" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
