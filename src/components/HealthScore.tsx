import { FinancialMetrics } from "@/types/financial";

interface Props {
  metrics: FinancialMetrics;
}

export default function HealthScore({ metrics }: Props) {
  const margin =
    ((metrics.netIncome ?? 0) / (metrics.revenue || 1)) * 100;

  let score = 50;

  if (margin > 25) score += 20;
  if ((metrics.cash ?? 0) > 20000) score += 15;
  if ((metrics.grossProfit ?? 0) > (metrics.revenue ?? 0) * 0.4)
    score += 15;

  score = Math.min(score, 100);

  return (
    <div className="border rounded-xl p-6 bg-zinc-900 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Financial Health Score
      </h2>

      <div className="text-6xl font-bold">
        {score}/100
      </div>

      <p className="mt-4 text-gray-400">
        Net Margin: {margin.toFixed(2)}%
      </p>
    </div>
  );
}