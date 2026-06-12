export interface FinancialMetrics {
  company?: string;
  ticker?: string;
  fiscalYear?: string;
  quarter?: string;
  filingDate?: string;
  periodEndDate?: string;
  reportType?: string;
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
export type SegmentData = Record<string, number>;
export interface HistoricalData {
  revenue: {
    current: number;
    previous: number;
  };
  netIncome: {
    current: number;
    previous: number;
  };
  isValid?: boolean; // Flag for anomalous growth data
}