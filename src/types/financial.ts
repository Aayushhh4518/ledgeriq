export interface FinancialMetrics {
  revenue?: number;
  grossProfit?: number;
  operatingIncome?: number;
  netIncome?: number;

  totalAssets?: number;
  totalLiabilities?: number;

  totalDebt?: number;
  cash?: number;

  operatingCashFlow?: number;

  currentAssets?: number;
  currentLiabilities?: number;

  shareholderEquity?: number;
}
export interface SegmentData {
  iphone: number;
  mac: number;
  ipad: number;
  wearables: number;
  services: number;
}
export interface HistoricalData {
  revenue: {
    current: number;
    previous: number;
  };
  netIncome: {
    current: number;
    previous: number;
  };
}