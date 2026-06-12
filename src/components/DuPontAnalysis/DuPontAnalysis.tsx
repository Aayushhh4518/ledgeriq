import { FinancialMetrics } from "@/types/financial";
import { calculateDuPont } from "@/lib/analysis/profitability";

interface Props {
  metrics: FinancialMetrics;
}

import { MissingDataCard } from "@/components/ui/MissingDataCard";
import { useFinancialData } from "@/contexts/FinancialContext";

export default function DuPontAnalysis({ metrics }: Props) {
  const dupont = calculateDuPont(metrics);

  if (!dupont) {
    return <MissingDataCard metricName="DuPont Components (ROE)" expectedSection="Balance Sheet" suggestion="Upload a complete 10-K to calculate Return on Equity." />;
  }

  const { openDrillDown } = useFinancialData();

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">DuPont Analysis (ROE)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          onClick={() => openDrillDown({
            name: "Return on Equity",
            formula: "Net Income / Shareholder Equity",
            underlyingMetrics: [
              { name: "Net Income", metric: metrics.netIncome },
              { name: "Shareholder Equity", metric: metrics.shareholderEquity }
            ]
          })}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors cursor-pointer"
        >
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Return on Equity</p>
          <p className="text-2xl font-bold tracking-tight text-blue-500">
            {(dupont.roe * 100).toFixed(1)}%
          </p>
        </div>
        <div 
          onClick={() => openDrillDown({
            name: "Profit Margin",
            formula: "Net Income / Revenue",
            underlyingMetrics: [
              { name: "Net Income", metric: metrics.netIncome },
              { name: "Total Revenue", metric: metrics.revenue }
            ]
          })}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors cursor-pointer"
        >
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Profit Margin</p>
          <p className="text-xl font-bold tracking-tight text-zinc-300">{(dupont.profitMargin * 100).toFixed(1)}%</p>
        </div>
        <div 
          onClick={() => openDrillDown({
            name: "Asset Turnover",
            formula: "Revenue / Total Assets",
            underlyingMetrics: [
              { name: "Total Revenue", metric: metrics.revenue },
              { name: "Total Assets", metric: metrics.totalAssets }
            ]
          })}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors cursor-pointer"
        >
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Asset Turnover</p>
          <p className="text-xl font-bold tracking-tight text-zinc-300">{dupont.assetTurnover.toFixed(2)}x</p>
        </div>
        <div 
          onClick={() => openDrillDown({
            name: "Financial Leverage",
            formula: "Total Assets / Shareholder Equity",
            underlyingMetrics: [
              { name: "Total Assets", metric: metrics.totalAssets },
              { name: "Shareholder Equity", metric: metrics.shareholderEquity }
            ]
          })}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors cursor-pointer"
        >
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Financial Leverage</p>
          <p className="text-xl font-bold tracking-tight text-zinc-300">{dupont.financialLeverage.toFixed(2)}x</p>
        </div>
      </div>
      <p className="text-xs text-zinc-600 mt-4 font-mono bg-zinc-950/50 p-2 rounded inline-block border border-zinc-800/30">
        ROE = Profit Margin × Asset Turnover × Financial Leverage
      </p>
    </div>
  );
}
