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

  const profitMargin = metrics.netIncome.value / metrics.revenue.value;
  const assetTurnover = metrics.revenue.value / metrics.totalAssets.value;
  const financialLeverage = metrics.totalAssets.value / metrics.shareholderEquity.value;
  const roe = profitMargin * assetTurnover * financialLeverage;

  return {
    profitMargin,
    assetTurnover,
    financialLeverage,
    roe,
  };
}
