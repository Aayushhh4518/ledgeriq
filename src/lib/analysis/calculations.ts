import { ExtractedMetric } from "@/types/financial";

export function safeDivide(numerator?: ExtractedMetric, denominator?: ExtractedMetric, sourceName: string = "Derived"): ExtractedMetric<number> | null {
  if (!numerator || !denominator || denominator.value <= 0) {
    if (numerator && denominator && denominator.value < 0) {
       console.warn(`[CALCULATION ENGINE] Failed to calculate ${sourceName}: Denominator is negative (${denominator.value})`);
    } else {
       console.warn(`[CALCULATION ENGINE] Failed to calculate ${sourceName}: Missing inputs or zero denominator.`);
    }
    return null;
  }
  
  const val = numerator.value / denominator.value;
  if (!isFinite(val) || isNaN(val)) {
    console.warn(`[CALCULATION ENGINE] Failed to calculate ${sourceName}: Result is NaN or Infinity.`);
    return null;
  }

  const confidence = Math.round((numerator.confidence + denominator.confidence) / 2);
  
  return {
    value: val,
    confidence,
    sourceDocument: numerator.sourceDocument || denominator.sourceDocument,
    source: sourceName,
  };
}

export function calculateGrossMargin(revenue?: ExtractedMetric, grossProfit?: ExtractedMetric): ExtractedMetric<number> | null {
  return safeDivide(grossProfit, revenue, "Gross Margin");
}

export function calculateNetMargin(revenue?: ExtractedMetric, netIncome?: ExtractedMetric): ExtractedMetric<number> | null {
  return safeDivide(netIncome, revenue, "Net Margin");
}

export function calculateAssetTurnover(revenue?: ExtractedMetric, totalAssets?: ExtractedMetric): ExtractedMetric<number> | null {
  return safeDivide(revenue, totalAssets, "Asset Turnover");
}

export function calculateFinancialLeverage(totalAssets?: ExtractedMetric, shareholderEquity?: ExtractedMetric): ExtractedMetric<number> | null {
  return safeDivide(totalAssets, shareholderEquity, "Financial Leverage");
}

export function calculateROE(netIncome?: ExtractedMetric, shareholderEquity?: ExtractedMetric): ExtractedMetric<number> | null {
  return safeDivide(netIncome, shareholderEquity, "ROE");
}

export function calculateROA(netIncome?: ExtractedMetric, totalAssets?: ExtractedMetric): ExtractedMetric<number> | null {
  return safeDivide(netIncome, totalAssets, "ROA");
}

export function calculateCurrentRatio(currentAssets?: ExtractedMetric, currentLiabilities?: ExtractedMetric): ExtractedMetric<number> | null {
  return safeDivide(currentAssets, currentLiabilities, "Current Ratio");
}

export function calculateDebtToEquity(totalDebtOrLiabilities?: ExtractedMetric, shareholderEquity?: ExtractedMetric): ExtractedMetric<number> | null {
  return safeDivide(totalDebtOrLiabilities, shareholderEquity, "Debt-to-Equity");
}

export function calculateCashRatio(cash?: ExtractedMetric, currentLiabilities?: ExtractedMetric): ExtractedMetric<number> | null {
  return safeDivide(cash, currentLiabilities, "Cash Ratio");
}

export function calculateGrowth(currentVal: number | undefined | null, prevVal: number | undefined | null, sourceName: string): number | null {
  if (currentVal === undefined || currentVal === null || prevVal === undefined || prevVal === null) {
    return null;
  }
  if (prevVal <= 0) {
    console.warn(`[CALCULATION ENGINE] Failed to calculate ${sourceName} Growth: Previous value <= 0.`);
    return null;
  }
  
  const val = ((currentVal - prevVal) / prevVal) * 100;
  if (!isFinite(val) || isNaN(val)) {
    console.warn(`[CALCULATION ENGINE] Failed to calculate ${sourceName} Growth: Result is NaN or Infinity.`);
    return null;
  }
  return val;
}
