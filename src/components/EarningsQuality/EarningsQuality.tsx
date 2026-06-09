import { FinancialMetrics } from "@/types/financial";

interface Props {
  metrics: FinancialMetrics;
}

export default function EarningsQuality({ metrics }: Props) {
  if (!metrics.operatingCashFlow || !metrics.netIncome) {
    return (
      <div className="border rounded-lg p-6 mt-6 opacity-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-400">Earnings Quality</h2>
        <p className="text-sm text-gray-500">Insufficient data extracted from PDF (missing Operating Cash Flow).</p>
      </div>
    );
  }

  const qualityRatio = metrics.operatingCashFlow / metrics.netIncome;

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Earnings Quality</h2>

      <div className="flex items-center space-x-6">
        <div>
          <p className="text-sm text-gray-500">OCF to Net Income Ratio</p>
          <p className="font-semibold text-3xl">
            {qualityRatio.toFixed(2)}x
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Operating Cash Flow</p>
          <p className="font-semibold text-lg">${metrics.operatingCashFlow.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Net Income</p>
          <p className="font-semibold text-lg">${metrics.netIncome.toLocaleString()}</p>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4">
        Values &gt; 1.0 indicate strong cash generation supporting reported earnings.
      </p>
    </div>
  );
}
