import { FinancialMetrics, ExtractedMetric } from "@/types/financial";
import { calculateNetMargin, calculateAssetTurnover, calculateFinancialLeverage, calculateROE } from "./calculations";

export interface DuPontMetrics {
  profitMargin: ExtractedMetric<number> | null; 
  assetTurnover: ExtractedMetric<number> | null; 
  financialLeverage: ExtractedMetric<number> | null; 
  roe: ExtractedMetric<number> | null; 
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

  const profitMargin = calculateNetMargin(metrics.revenue, metrics.netIncome);
  const assetTurnover = calculateAssetTurnover(metrics.revenue, metrics.totalAssets);
  const financialLeverage = calculateFinancialLeverage(metrics.totalAssets, metrics.shareholderEquity);
  const roe = calculateROE(metrics.netIncome, metrics.shareholderEquity);

  return {
    profitMargin,
    assetTurnover,
    financialLeverage,
    roe,
  };
}
