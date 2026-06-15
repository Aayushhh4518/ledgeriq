import { FinancialMetrics, ValidationResult, HistoricalData, SegmentData } from "@/types/financial";

export function performCrossValidation(
  metrics: FinancialMetrics,
  historicalData: HistoricalData,
  segmentData: SegmentData
): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Helper to extract value safely
  const val = (metric: any) => metric?.value as number | undefined;

  const assets = val(metrics.totalAssets);
  const liabilities = val(metrics.totalLiabilities);
  const equity = val(metrics.shareholderEquity);
  const revenue = val(metrics.revenue);
  const netIncome = val(metrics.netIncome);
  const grossProfit = val(metrics.grossProfit);
  const operatingIncome = val(metrics.operatingIncome);

  // 1. Accounting Equation: Assets = Liabilities + Equity
  if (assets !== undefined && liabilities !== undefined && equity !== undefined) {
    const calculatedAssets = liabilities + equity;
    const difference = Math.abs(assets - calculatedAssets);
    
    if (difference > (assets * 0.05)) {
      results.push({
        rule: "Accounting Equation",
        status: "error",
        impact: -10,
        message: `Assets (${assets.toLocaleString()}) ≠ Liabilities (${liabilities.toLocaleString()}) + Equity (${equity.toLocaleString()})`,
        field: "totalAssets"
      });
    } else {
      results.push({
        rule: "Accounting Equation",
        status: "passed",
        impact: 0,
        message: "Assets = Liabilities + Equity (within acceptable bounds).",
        field: "totalAssets"
      });
    }
  }

  // 2. Revenue > Gross Profit
  if (revenue !== undefined && grossProfit !== undefined) {
    if (revenue >= grossProfit) {
      results.push({
        rule: "Revenue vs Gross Profit",
        status: "passed",
        impact: 0,
        message: "Revenue is greater than or equal to Gross Profit.",
        field: "revenue"
      });
    } else {
      results.push({
        rule: "Revenue vs Gross Profit",
        status: "error",
        impact: -10,
        message: `Gross Profit (${grossProfit.toLocaleString()}) cannot exceed Revenue (${revenue.toLocaleString()}).`,
        field: "grossProfit"
      });
    }
  }

  // 3. Revenue > Net Income
  if (revenue !== undefined && netIncome !== undefined) {
    if (revenue >= netIncome) {
      results.push({
        rule: "Revenue vs Net Income",
        status: "passed",
        impact: 0,
        message: "Revenue is greater than or equal to Net Income.",
        field: "revenue"
      });
    } else {
      results.push({
        rule: "Revenue vs Net Income",
        status: "error",
        impact: -10,
        message: `Net Income (${netIncome.toLocaleString()}) cannot exceed Revenue (${revenue.toLocaleString()}) in normal conditions.`,
        field: "netIncome"
      });
    }
  }

  // 4. Margin calculations (Operating and Net Margin)
  if (revenue !== undefined && revenue > 0) {
    let marginIssues = false;
    if (operatingIncome !== undefined) {
      const opMargin = operatingIncome / revenue;
      if (opMargin > 1.0 || opMargin < -1.0) {
        marginIssues = true;
        results.push({
          rule: "Margin Boundaries",
          status: "warning",
          impact: -5,
          message: `Operating Margin is extreme (${(opMargin * 100).toFixed(1)}%).`,
          field: "operatingIncome"
        });
      }
    }
    if (netIncome !== undefined) {
      const netMargin = netIncome / revenue;
      if (netMargin > 1.0 || netMargin < -1.0) {
        marginIssues = true;
        results.push({
          rule: "Margin Boundaries",
          status: "warning",
          impact: -5,
          message: `Net Margin is extreme (${(netMargin * 100).toFixed(1)}%).`,
          field: "netIncome"
        });
      }
    }
    if (!marginIssues && operatingIncome !== undefined && netIncome !== undefined) {
      results.push({
        rule: "Margin Boundaries",
        status: "passed",
        impact: 0,
        message: "Profit margins are within normal logical boundaries.",
      });
    }
  }

  // 5. ROE calculations
  if (netIncome !== undefined && equity !== undefined && equity !== 0) {
    const roe = netIncome / equity;
    if (roe > 5.0 || roe < -5.0) { // > 500% or < -500%
      results.push({
        rule: "ROE Boundaries",
        status: "warning",
        impact: -5,
        message: `Return on Equity is highly anomalous (${(roe * 100).toFixed(1)}%).`,
        field: "shareholderEquity"
      });
    } else {
      results.push({
        rule: "ROE Boundaries",
        status: "passed",
        impact: 0,
        message: "Return on Equity is mathematically sound and within standard ranges.",
      });
    }
  }

  // 6. Growth calculations
  let growthIssues = false;
  const revGrowth = historicalData.revenue?.current !== undefined && historicalData.revenue?.previous !== undefined && historicalData.revenue?.previous !== 0
    ? (historicalData.revenue.current - historicalData.revenue.previous) / Math.abs(historicalData.revenue.previous)
    : undefined;
  
  const niGrowth = historicalData.netIncome?.current !== undefined && historicalData.netIncome?.previous !== undefined && historicalData.netIncome?.previous !== 0
    ? (historicalData.netIncome.current - historicalData.netIncome.previous) / Math.abs(historicalData.netIncome.previous)
    : undefined;

  if (revGrowth !== undefined) {
    if (revGrowth > 10.0 || revGrowth < -1.0) { // > 1000% or < -100%
      growthIssues = true;
      results.push({
        rule: "Growth Constraints",
        status: "error",
        impact: -10,
        message: `Revenue growth rate is anomalous (${(revGrowth * 100).toFixed(1)}%). Possible extraction error.`,
      });
    }
  }
  if (niGrowth !== undefined) {
    if (niGrowth > 10.0 || niGrowth < -1.0) { // > 1000% or < -100%
      growthIssues = true;
      results.push({
        rule: "Growth Constraints",
        status: "error",
        impact: -10,
        message: `Net Income growth rate is anomalous (${(niGrowth * 100).toFixed(1)}%). Possible extraction error.`,
      });
    }
  }
  
  if (!growthIssues && revGrowth !== undefined && niGrowth !== undefined) {
    results.push({
      rule: "Growth Constraints",
      status: "passed",
      impact: 0,
      message: "Historical growth percentages are valid and reasonable.",
    });
  }

  // 7. Historical period availability
  if (historicalData.revenue?.previous !== undefined && historicalData.netIncome?.previous !== undefined) {
    results.push({
      rule: "Historical Availability",
      status: "passed",
      impact: 0,
      message: "Prior period data successfully extracted for comparative analysis.",
    });
  } else {
    results.push({
      rule: "Historical Availability",
      status: "warning",
      impact: -5,
      message: "Missing previous period data. Comparative YoY growth calculations will be limited.",
    });
  }

  // 8. Segment consistency
  const segmentKeys = Object.keys(segmentData || {});
  if (segmentKeys.length > 0 && revenue !== undefined && revenue > 0) {
    const totalSegments = Object.values(segmentData).reduce((a, b) => a + b, 0);
    const difference = Math.abs(totalSegments - revenue);
    
    // Segment sum should be within 10% of total revenue
    if (difference <= revenue * 0.1) {
      results.push({
        rule: "Segment Consistency",
        status: "passed",
        impact: 0,
        message: "Sum of segments closely matches consolidated revenue.",
      });
    } else {
      results.push({
        rule: "Segment Consistency",
        status: "warning",
        impact: -5,
        message: `Segment total (${totalSegments.toLocaleString()}) diverges significantly from consolidated revenue (${revenue.toLocaleString()}).`,
      });
    }
  } else if (segmentKeys.length === 0) {
    results.push({
      rule: "Segment Consistency",
      status: "warning",
      impact: -5,
      message: "No business segments extracted. Detailed breakdown unavailable.",
    });
  }

  return results;
}
