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

  const currentRatio = metrics.currentAssets / metrics.currentLiabilities;
  const debtToEquity = metrics.totalLiabilities / metrics.shareholderEquity;

  return {
    currentRatio,
    debtToEquity,
  };
}
