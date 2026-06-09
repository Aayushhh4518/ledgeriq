import { FinancialMetrics } from "@/types/financial";

export interface DuPontMetrics {
  profitMargin: number; // Net Income / Revenue
  assetTurnover: number; // Revenue / Total Assets
  financialLeverage: number; // Total Assets / Shareholder Equity
  roe: number; // profitMargin * assetTurnover * financialLeverage
}

export function calculateDuPont(metrics: FinancialMetrics): DuPontMetrics | null {
  if (
    !metrics.revenue ||
    !metrics.netIncome ||
    !metrics.totalAssets ||
    !metrics.shareholderEquity
  ) {
    return null;
  }

  const profitMargin = metrics.netIncome / metrics.revenue;
  const assetTurnover = metrics.revenue / metrics.totalAssets;
  const financialLeverage = metrics.totalAssets / metrics.shareholderEquity;
  const roe = profitMargin * assetTurnover * financialLeverage;

  return {
    profitMargin,
    assetTurnover,
    financialLeverage,
    roe,
  };
}
