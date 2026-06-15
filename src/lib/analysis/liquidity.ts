import { FinancialMetrics } from "@/types/financial";

export interface LiquidityMetrics {
  currentRatio: number; // Current Assets / Current Liabilities
  debtToEquity: number; // Total Debt or Total Liabilities / Shareholder Equity
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

  const currentRatio = metrics.currentLiabilities.value !== 0 ? metrics.currentAssets.value / metrics.currentLiabilities.value : 0;
  const debtToEquity = metrics.shareholderEquity.value !== 0 ? metrics.totalLiabilities.value / metrics.shareholderEquity.value : 0;

  return {
    currentRatio,
    debtToEquity,
  };
}
