import { FinancialMetrics } from "@/types/financial";
import { calculateDuPont } from "@/lib/analysis/profitability";

interface Props {
  metrics: FinancialMetrics;
}

export default function DuPontAnalysis({ metrics }: Props) {
  const dupont = calculateDuPont(metrics);

  if (!dupont) {
    return (
      <div className="border rounded-lg p-6 mt-6 opacity-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-400">DuPont Analysis (ROE)</h2>
        <p className="text-sm text-gray-500">Insufficient data extracted from PDF to calculate ROE (missing Assets or Equity).</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">DuPont Analysis (ROE)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-100 p-4 rounded dark:bg-gray-800">
          <p className="text-sm text-gray-500">Return on Equity</p>
          <p className="font-semibold text-2xl text-blue-600 dark:text-blue-400">
            {(dupont.roe * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded dark:bg-gray-800">
          <p className="text-sm text-gray-500">Profit Margin</p>
          <p className="font-semibold text-lg">{(dupont.profitMargin * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-gray-100 p-4 rounded dark:bg-gray-800">
          <p className="text-sm text-gray-500">Asset Turnover</p>
          <p className="font-semibold text-lg">{dupont.assetTurnover.toFixed(2)}x</p>
        </div>
        <div className="bg-gray-100 p-4 rounded dark:bg-gray-800">
          <p className="text-sm text-gray-500">Financial Leverage</p>
          <p className="font-semibold text-lg">{dupont.financialLeverage.toFixed(2)}x</p>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4">
        ROE = Profit Margin × Asset Turnover × Financial Leverage
      </p>
    </div>
  );
}
