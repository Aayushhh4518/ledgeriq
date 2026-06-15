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

  const profitMargin = metrics.revenue.value !== 0 ? metrics.netIncome.value / metrics.revenue.value : 0;
  const assetTurnover = metrics.totalAssets.value !== 0 ? metrics.revenue.value / metrics.totalAssets.value : 0;
  const financialLeverage = metrics.shareholderEquity.value !== 0 ? metrics.totalAssets.value / metrics.shareholderEquity.value : 0;
  const roe = profitMargin * assetTurnover * financialLeverage;

  return {
    profitMargin,
    assetTurnover,
    financialLeverage,
    roe,
  };
}
