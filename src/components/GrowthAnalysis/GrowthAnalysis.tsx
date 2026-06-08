interface GrowthAnalysisProps {
  revenueCurrent: number;
  revenuePrevious: number;
  netIncomeCurrent: number;
  netIncomePrevious: number;
}

export default function GrowthAnalysis({
  revenueCurrent,
  revenuePrevious,
  netIncomeCurrent,
  netIncomePrevious,
}: GrowthAnalysisProps) {
  const revenueGrowth =
    ((revenueCurrent - revenuePrevious) / revenuePrevious) * 100;

  const netIncomeGrowth =
    ((netIncomeCurrent - netIncomePrevious) / netIncomePrevious) * 100;

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        Growth Analysis
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-gray-400">
            Revenue Growth
          </p>

          <p className="text-2xl font-bold">
            {revenueGrowth.toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            Net Income Growth
          </p>

          <p className="text-2xl font-bold">
            {netIncomeGrowth.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}