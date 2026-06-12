export interface ExtractedMetric {
  value: number;
  confidence: number; // 0 to 100
  sourcePage?: number;
  sourceDocument?: string;
  sourceSection?: string;
  formula?: string;
}

export interface FinancialMetrics {
  company?: string;
  ticker?: string;
  fiscalYear?: string;
  quarter?: string;
  filingDate?: string;
  periodEndDate?: string;
  reportType?: string;
  industry?: string;
  currency?: string;

  revenue?: ExtractedMetric;
  grossProfit?: ExtractedMetric;
  operatingIncome?: ExtractedMetric;
  netIncome?: ExtractedMetric;

  totalAssets?: ExtractedMetric;
  totalLiabilities?: ExtractedMetric;

  totalDebt?: ExtractedMetric;
  cash?: ExtractedMetric;

  operatingCashFlow?: ExtractedMetric;

  currentAssets?: ExtractedMetric;
  currentLiabilities?: ExtractedMetric;

  shareholderEquity?: ExtractedMetric;
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