import { FinancialMetrics } from "@/types/financial";

interface Props {
  metrics: FinancialMetrics;
}

import IntelligentMissingData from "@/components/ui/IntelligentMissingData";
import { useFinancialData } from "@/contexts/FinancialContext";

export default function EarningsQuality({ metrics }: Props) {
  if (!metrics.operatingCashFlow?.value || !metrics.netIncome?.value) {
    return <IntelligentMissingData metricName="Earnings Quality" reason="Cash Flows from Operations or Net Income could not be located in this filing." suggestion="Upload a complete 10-K to analyze earnings quality." />;
  }

  const { openDrillDown } = useFinancialData();

  const qualityRatio = metrics.operatingCashFlow.value / metrics.netIncome.value;

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">Earnings Quality</h2>

      <div className="flex flex-col md:flex-row md:items-stretch gap-4">
        <div 
          onClick={() => openDrillDown({
            name: "OCF to Net Income Ratio",
            formula: "Operating Cash Flow / Net Income",
            underlyingMetrics: [
              { name: "Operating Cash Flow", metric: metrics.operatingCashFlow },
              { name: "Net Income", metric: metrics.netIncome }
            ]
          })}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex-1 flex flex-col justify-center cursor-pointer"
        >
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">OCF to Net Income Ratio</p>
          <p className="text-4xl font-bold tracking-tight text-white mb-4">
            {qualityRatio.toFixed(2)}x
          </p>
          <p className="text-[11px] text-zinc-500 bg-zinc-950/50 p-2 rounded inline-block border border-zinc-800/30">
            Values &gt; 1.0 indicate strong cash generation supporting reported earnings.
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div 
            onClick={() => openDrillDown({ name: "Operating Cash Flow", metric: metrics.operatingCashFlow })}
            className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex-1 flex flex-col justify-center cursor-pointer"
          >
            <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-1">Operating Cash Flow</p>
            <p className="text-xl font-bold tracking-tight text-zinc-300">${metrics.operatingCashFlow.value.toLocaleString()}</p>
          </div>
          <div 
            onClick={() => openDrillDown({ name: "Net Income", metric: metrics.netIncome })}
            className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex-1 flex flex-col justify-center cursor-pointer"
          >
            <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-1">Net Income</p>
            <p className="text-xl font-bold tracking-tight text-zinc-300">${metrics.netIncome.value.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
