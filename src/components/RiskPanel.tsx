import { FinancialMetrics } from "@/types/financial";

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

  return (
    <div className="border rounded-xl p-6 bg-zinc-900 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Risk Analysis
      </h2>

      <div className="space-y-3">
        <p>
          Liquidity Risk: <strong>{liquidityRisk}</strong>
        </p>

        <p>
          Profitability Risk: <strong>{profitabilityRisk}</strong>
        </p>

        <p>
          Growth Risk: <strong>{growthRisk}</strong>
        </p>
      </div>
    </div>
  );
}