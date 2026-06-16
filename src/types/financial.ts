export interface ExtractedMetric<T = number> {
  value: T;
  confidence: number; // 0 to 100
  sourcePage?: number;
  sourceDocument?: string;
  sourceSection?: string;
  source?: string;
  formula?: string;
}

export interface FinancialMetrics {
  company?: ExtractedMetric<string>;
  ticker?: ExtractedMetric<string>;
  fiscalYear?: ExtractedMetric<string>;
  quarter?: ExtractedMetric<string>;
  filingDate?: ExtractedMetric<string>;
  periodEndDate?: ExtractedMetric<string>;
  reportType?: ExtractedMetric<string>;
  industry?: ExtractedMetric<string>;
  currency?: ExtractedMetric<string>;

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

export interface StatementCoverage {
  incomeStatement: boolean;
  balanceSheet: boolean;
  cashFlowStatement: boolean;
  segmentInformation: boolean;
  missingNotes: boolean;
}

export interface ValidationResult {
  rule: string;
  status: "passed" | "warning" | "error";
  impact: number;
  message: string;
  field?: string;
}

export interface DocumentQualityScore {
  score: number; // 0 to 100
  statementCoverage: StatementCoverage;
  validationResults: ValidationResult[];
}