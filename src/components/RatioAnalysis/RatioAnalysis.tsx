import { FinancialMetrics } from "@/types/financial";

interface Props {
  metrics: FinancialMetrics;
}

import IntelligentMissingData from "@/components/ui/IntelligentMissingData";
import { useFinancialData } from "@/contexts/FinancialContext";

export default function RatioAnalysis({ metrics }: Props) {
  if (metrics.revenue?.value === undefined && metrics.netIncome?.value === undefined && metrics.grossProfit?.value === undefined && metrics.cash?.value === undefined) {
    return <IntelligentMissingData metricName="Ratio Analysis" reason="The Income Statement and Balance Sheet were not fully extracted from this filing." suggestion="Upload a complete 10-K to perform Ratio Analysis." />;
  }

  const { openDrillDown } = useFinancialData();

  const grossMargin =
    ((metrics.grossProfit?.value ?? 0) / (metrics.revenue?.value || 1)) * 100;

  const netMargin =
    ((metrics.netIncome?.value ?? 0) / (metrics.revenue?.value || 1)) * 100;

  const cashRatio =
    ((metrics.cash?.value ?? 0) / (metrics.revenue?.value || 1)) * 100;

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">
        Ratio Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => openDrillDown({
            name: "Gross Margin",
            formula: "Gross Profit / Revenue",
            underlyingMetrics: [
              { name: "Gross Profit", metric: metrics.grossProfit },
              { name: "Total Revenue", metric: metrics.revenue }
            ]
          })}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors cursor-pointer"
        >
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">
            Gross Margin
          </p>
          <p className="text-2xl font-bold tracking-tight text-white">
            {grossMargin.toFixed(1)}%
          </p>
        </div>

        <div 
          onClick={() => openDrillDown({
            name: "Net Margin",
            formula: "Net Income / Revenue",
            underlyingMetrics: [
              { name: "Net Income", metric: metrics.netIncome },
              { name: "Total Revenue", metric: metrics.revenue }
            ]
          })}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors cursor-pointer"
        >
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">
            Net Margin
          </p>
          <p className="text-2xl font-bold tracking-tight text-white">
            {netMargin.toFixed(1)}%
          </p>
        </div>

        <div 
          onClick={() => openDrillDown({
            name: "Cash Ratio",
            formula: "Cash / Revenue",
            underlyingMetrics: [
              { name: "Cash Balance", metric: metrics.cash },
              { name: "Total Revenue", metric: metrics.revenue }
            ]
          })}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors cursor-pointer"
        >
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">
            Cash Ratio
          </p>
          <p className="text-2xl font-bold tracking-tight text-white">
            {cashRatio.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}