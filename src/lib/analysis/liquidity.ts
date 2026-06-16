import { FinancialMetrics, ExtractedMetric } from "@/types/financial";
import { calculateCurrentRatio, calculateDebtToEquity } from "./calculations";

export interface LiquidityMetrics {
  currentRatio: ExtractedMetric<number> | null;
  debtToEquity: ExtractedMetric<number> | null;
}

export function calculateLiquidity(metrics: FinancialMetrics): LiquidityMetrics | null {
  if (
    !metrics.currentAssets ||
    !metrics.currentLiabilities ||
    !metrics.totalLiabilities ||
    !metrics.shareholderEquity
  ) {
    return null;
  }

  const currentRatio = calculateCurrentRatio(metrics.currentAssets, metrics.currentLiabilities);
  const debtToEquity = calculateDebtToEquity(metrics.totalLiabilities, metrics.shareholderEquity);

  return {
    currentRatio,
    debtToEquity,
  };
}
