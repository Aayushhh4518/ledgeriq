import { FinancialMetrics, HistoricalData, SegmentData, StatementCoverage, ValidationResult, DocumentQualityScore } from "@/types/financial";

export function evaluateQuality(
  metrics: FinancialMetrics,
  historicalData: HistoricalData,
  segmentData: SegmentData,
  text: string,
  validationResults: ValidationResult[]
): DocumentQualityScore {
  let score = 100;

  // 1. Statement Coverage
  const incomeStatement = /Statements of Operations/i.test(text) || /Income Statement/i.test(text);
  const balanceSheet = /Balance Sheets/i.test(text) || /Balance Sheet/i.test(text);
  const cashFlowStatement = /Cash Flows/i.test(text) || /Statement of Cash Flows/i.test(text);
  const segmentInformation = Object.keys(segmentData).length > 0;
  const missingNotes = !(/Notes to Consolidated Financial Statements/i.test(text));

  const statementCoverage: StatementCoverage = {
    incomeStatement,
    balanceSheet,
    cashFlowStatement,
    segmentInformation,
    missingNotes
  };

  if (!incomeStatement) score -= 15;
  if (!balanceSheet) score -= 15;
  if (!cashFlowStatement) score -= 10;
  if (missingNotes) score -= 5;

  // 2. Metadata Completeness
  const requiredMetadata = ['company', 'fiscalYear', 'reportType', 'filingDate'];
  requiredMetadata.forEach(field => {
    if (!metrics[field as keyof FinancialMetrics]) {
      score -= 5;
    }
  });

  // 3. Extraction Confidence & Missing Fields
  const coreMetrics = ['revenue', 'netIncome', 'totalAssets', 'cash'];
  coreMetrics.forEach(field => {
    const metric = metrics[field as keyof FinancialMetrics] as any;
    if (!metric || metric.value === undefined) {
      score -= 5;
    } else if (metric.confidence < 60) {
      score -= 2;
    }
  });

  // 4. Validation Impacts
  validationResults.forEach(result => {
    score += result.impact;
  });

  // 5. Historical Anomalies

  if (historicalData.isValid === false) {
    score -= 5;
  }

  return {
    score: Math.max(0, Math.min(score, 100)),
    statementCoverage,
    validationResults
  };
}
