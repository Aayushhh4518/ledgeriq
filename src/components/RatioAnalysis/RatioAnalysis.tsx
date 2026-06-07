import { FinancialMetrics } from "@/types/financial";

interface Props {
  metrics: FinancialMetrics;
}

export default function RatioAnalysis({ metrics }: Props) {
  const grossMargin =
    (metrics.grossProfit / metrics.revenue) * 100;

  const netMargin =
    (metrics.netIncome / metrics.revenue) * 100;

  const cashRatio =
    (metrics.cash / metrics.revenue) * 100;

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        Ratio Analysis
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-gray-400">
            Gross Margin
          </p>
          <p className="text-xl font-bold">
            {grossMargin.toFixed(1)}%
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            Net Margin
          </p>
          <p className="text-xl font-bold">
            {netMargin.toFixed(1)}%
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            Cash Ratio
          </p>
          <p className="text-xl font-bold">
            {cashRatio.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}