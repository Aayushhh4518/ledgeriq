import { FinancialMetrics } from "@/types/financial";
import { generateInsights } from "@/lib/analysis/insights";

interface Props {
  metrics: FinancialMetrics;
}

export default function StrengthsWeaknesses({ metrics }: Props) {
  const insights = generateInsights(metrics);

  if (insights.length === 0) {
    return (
      <div className="border rounded-lg p-6 mt-6 opacity-50">
        <h2 className="text-2xl font-bold mb-6 text-gray-400">AI Insights Engine</h2>
        <p className="text-sm text-gray-500">Not enough data to generate insights.</p>
      </div>
    );
  }

  const strengths = insights.filter((i) => i.type === "strength");
  const weaknesses = insights.filter((i) => i.type === "weakness");

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">AI Insights Engine</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
            <span className="mr-2">↑</span> Key Strengths
          </h3>
          <div className="space-y-4">
            {strengths.map((s, idx) => (
              <div key={idx} className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-green-800 dark:text-green-300">{s.title}</p>
                <p className="text-sm text-green-700 dark:text-green-400 mt-1">{s.description}</p>
              </div>
            ))}
            {strengths.length === 0 && <p className="text-sm text-gray-500">No significant strengths detected.</p>}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
            <span className="mr-2">↓</span> Key Weaknesses
          </h3>
          <div className="space-y-4">
            {weaknesses.map((w, idx) => (
              <div key={idx} className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                <p className="font-semibold text-red-800 dark:text-red-300">{w.title}</p>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">{w.description}</p>
              </div>
            ))}
            {weaknesses.length === 0 && <p className="text-sm text-gray-500">No significant weaknesses detected.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
