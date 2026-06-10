import { FinancialMetrics } from "@/types/financial";
import { ShieldAlert, ShieldCheck, Shield } from "lucide-react";

interface Props {
  metrics: FinancialMetrics;
}

export default function RiskPanel({ metrics }: Props) {
  const netMargin =
    ((metrics.netIncome ?? 0) / (metrics.revenue || 1)) * 100;

  const liquidityRisk =
    (metrics.cash ?? 0) > 20000 ? "LOW" : "HIGH";

  const profitabilityRisk =
    netMargin > 15 ? "LOW" : "HIGH";

  const growthRisk =
    (metrics.revenue ?? 0) > 100000 ? "LOW" : "MEDIUM";

  const getRiskColor = (risk: string) => {
    if (risk === "LOW") return "text-emerald-400 bg-emerald-400/10 border-emerald-500/20";
    if (risk === "MEDIUM") return "text-amber-400 bg-amber-400/10 border-amber-500/20";
    return "text-rose-400 bg-rose-400/10 border-rose-500/20";
  };

  const getRiskIcon = (risk: string) => {
    if (risk === "LOW") return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
    if (risk === "MEDIUM") return <Shield className="w-4 h-4 text-amber-500" />;
    return <ShieldAlert className="w-4 h-4 text-rose-500" />;
  };

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">
        Risk Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-400">Liquidity Risk</p>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded border ${getRiskColor(liquidityRisk)}`}>
            {getRiskIcon(liquidityRisk)}
            <span className="text-xs font-bold tracking-wider">{liquidityRisk}</span>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-400">Profitability Risk</p>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded border ${getRiskColor(profitabilityRisk)}`}>
            {getRiskIcon(profitabilityRisk)}
            <span className="text-xs font-bold tracking-wider">{profitabilityRisk}</span>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-400">Growth Risk</p>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded border ${getRiskColor(growthRisk)}`}>
            {getRiskIcon(growthRisk)}
            <span className="text-xs font-bold tracking-wider">{growthRisk}</span>
          </div>
        </div>
      </div>
    </div>
  );
}