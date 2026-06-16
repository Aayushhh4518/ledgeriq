import { FinancialMetrics } from "@/types/financial";
import { evaluateAgainstBenchmark, BenchmarkMetricName, PerformanceRating, BENCHMARKS } from "@/lib/analysis/benchmarks";
import { calculateDuPont } from "@/lib/analysis/profitability";
import { calculateLiquidity } from "@/lib/analysis/liquidity";
import { Activity, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface Props {
  metrics: FinancialMetrics;
}

export default function BenchmarkPanel({ metrics }: Props) {
  const industryStr = metrics.industry?.value || "Unknown";
  const hasIndustry = Object.keys(BENCHMARKS).includes(industryStr);

  if (!hasIndustry) {
    return (
      <div className="bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
        <AlertTriangle className="w-8 h-8 text-zinc-500 mb-4" />
        <h2 className="text-base font-semibold tracking-tight text-zinc-300 mb-2">Industry Benchmarks Unavailable</h2>
        <p className="text-sm text-zinc-500 max-w-md">
          The document was classified as "{industryStr}". We currently only support benchmark comparisons for Technology, Financial Services, Healthcare, Consumer Goods, Energy, and Industrial sectors.
        </p>
      </div>
    );
  }

  const dupont = calculateDuPont(metrics);
  const liquidity = calculateLiquidity(metrics);

  const rawMetrics: Partial<Record<BenchmarkMetricName, number | null>> = {
    "Net Margin": dupont ? dupont.profitMargin * 100 : null,
    "ROE": dupont ? dupont.roe * 100 : null,
    "Current Ratio": liquidity ? liquidity.currentRatio : null,
    "Asset Turnover": dupont ? dupont.assetTurnover : null,
  };

  const results = Object.entries(rawMetrics).map(([name, value]) => {
    return evaluateAgainstBenchmark(name as BenchmarkMetricName, industryStr, value);
  }).filter(Boolean) as NonNullable<ReturnType<typeof evaluateAgainstBenchmark>>[];

  const getRatingColor = (rating: PerformanceRating) => {
    switch (rating) {
      case "Excellent": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "Above Average": return "text-emerald-300 bg-emerald-300/10 border-emerald-300/20";
      case "Average": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "Below Average": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "Poor": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default: return "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";
    }
  };

  const formatValue = (val: number | null | undefined, isPercentage: boolean) => {
    if (val === null || val === undefined) return "N/A";
    return isPercentage ? `${val.toFixed(1)}%` : `${val.toFixed(2)}x`;
  };

  return (
    <div className="bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-900/30">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Industry Benchmark Analysis
          </h2>
          <p className="text-sm text-zinc-400 mt-1">Comparing {metrics.company?.value || "Company"} against the <strong className="text-white">{industryStr}</strong> sector averages.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-zinc-900/50">
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Metric</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Company Value</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Industry Avg</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Variance</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {results.map((result) => (
              <tr key={result.metric} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <span className="font-medium text-zinc-200">{result.metric}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-white">
                    {formatValue(result.companyValue, result.isPercentage)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-zinc-400">
                    {formatValue(result.industryAverage, result.isPercentage)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {result.percentDifference === null || result.percentDifference === undefined ? (
                    <span className="text-zinc-500">-</span>
                  ) : (
                    <div className={`flex items-center gap-1 ${result.percentDifference > 0 ? "text-emerald-400" : result.percentDifference < 0 ? "text-rose-400" : "text-zinc-400"}`}>
                      {result.percentDifference > 0 ? <ArrowUpRight className="w-4 h-4" /> : result.percentDifference < 0 ? <ArrowDownRight className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                      <span className="font-medium">{Math.abs(result.percentDifference).toFixed(1)}%</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getRatingColor(result.rating)}`}>
                    {result.rating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}