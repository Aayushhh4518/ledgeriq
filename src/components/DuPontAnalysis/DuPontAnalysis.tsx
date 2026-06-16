import { FinancialMetrics } from "@/types/financial";
import { calculateDuPont } from "@/lib/analysis/profitability";

interface Props {
  metrics: FinancialMetrics;
}

import IntelligentMissingData from "@/components/ui/IntelligentMissingData";
import { PieChart, DollarSign, Activity, TrendingUp } from "lucide-react";

export default function DuPontAnalysis({ metrics }: Props) {
  const dupont = calculateDuPont(metrics);

  if (!dupont) {
    return <IntelligentMissingData metricName="DuPont Components (ROE)" reason="The Balance Sheet and Income Statement were not fully extracted from this filing." suggestion="Upload a complete 10-K to calculate Return on Equity." />;
  }

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl transition-all duration-700 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-900/30">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-100 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-500" />
            DuPont Analysis
          </h2>
          <p className="text-sm text-zinc-400 mt-1">Breaking down Return on Equity into its core drivers.</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white drop-shadow-sm">
            {dupont.roe?.value !== undefined ? (dupont.roe.value * 100).toFixed(1) : "N/A"}%
          </div>
          <div className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">ROE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
        {/* Profit Margin */}
        <div className="p-6 space-y-4 hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">
                {dupont.profitMargin?.value !== undefined ? (dupont.profitMargin.value * 100).toFixed(1) : "N/A"}%
              </div>
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Profit Margin</div>
            </div>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Operating efficiency. How much of each dollar of revenue is converted into net income.
          </p>
        </div>

        {/* Asset Turnover */}
        <div className="p-6 space-y-4 hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">
                {dupont.assetTurnover?.value !== undefined ? dupont.assetTurnover.value.toFixed(2) : "N/A"}x
              </div>
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Asset Turnover</div>
            </div>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Asset use efficiency. Revenue generated for every dollar of assets owned.
          </p>
        </div>

        {/* Financial Leverage */}
        <div className="p-6 space-y-4 hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">
                {dupont.financialLeverage?.value !== undefined ? dupont.financialLeverage.value.toFixed(2) : "N/A"}x
              </div>
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Financial Leverage</div>
            </div>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Debt utilization. Total assets relative to shareholder equity.
          </p>
        </div>
      </div>
      <div className="px-6 pb-6">
        <p className="text-xs text-zinc-600 font-mono bg-zinc-950/50 p-2 rounded inline-block border border-zinc-800/30">
          ROE = Profit Margin × Asset Turnover × Financial Leverage
        </p>
      </div>
    </div>
  );
}
