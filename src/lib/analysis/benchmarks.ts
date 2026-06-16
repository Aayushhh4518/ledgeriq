export type BenchmarkMetricName = 
  | "Gross Margin" 
  | "Net Margin" 
  | "ROE" 
  | "ROA" 
  | "Current Ratio" 
  | "Debt to Equity" 
  | "Asset Turnover";

export type PerformanceRating = "Excellent" | "Above Average" | "Average" | "Below Average" | "Poor";

export interface BenchmarkThresholds {
  average: number;
  // If higher is better:
  // Excellent > average + excellentDelta
  // Above Average > average + goodDelta
  // Below Average < average - badDelta
  // Poor < average - poorDelta
  // We'll use a simpler mapping: [poorThreshold, belowAvgThreshold, aboveAvgThreshold, excellentThreshold]
  thresholds: [number, number, number, number]; 
  invert: boolean; // if true, lower is better (e.g. Debt to Equity)
  isPercentage: boolean;
}

export type IndustryBenchmarks = Record<BenchmarkMetricName, BenchmarkThresholds>;

export const BENCHMARKS: Record<string, IndustryBenchmarks> = {
  "Technology": {
    "Gross Margin": { average: 60.0, thresholds: [30.0, 45.0, 70.0, 80.0], invert: false, isPercentage: true },
    "Net Margin": { average: 20.0, thresholds: [0.0, 10.0, 25.0, 35.0], invert: false, isPercentage: true },
    "ROE": { average: 25.0, thresholds: [5.0, 15.0, 35.0, 45.0], invert: false, isPercentage: true },
    "ROA": { average: 12.0, thresholds: [2.0, 8.0, 16.0, 22.0], invert: false, isPercentage: true },
    "Current Ratio": { average: 2.0, thresholds: [1.0, 1.5, 2.5, 3.5], invert: false, isPercentage: false },
    "Debt to Equity": { average: 0.8, thresholds: [2.5, 1.5, 0.5, 0.2], invert: true, isPercentage: false },
    "Asset Turnover": { average: 0.9, thresholds: [0.4, 0.6, 1.2, 1.6], invert: false, isPercentage: false },
  },
  "Financial Services": {
    "Gross Margin": { average: 100.0, thresholds: [100.0, 100.0, 100.0, 100.0], invert: false, isPercentage: true }, // Often N/A for banks
    "Net Margin": { average: 25.0, thresholds: [5.0, 15.0, 35.0, 45.0], invert: false, isPercentage: true },
    "ROE": { average: 12.0, thresholds: [5.0, 8.0, 15.0, 20.0], invert: false, isPercentage: true },
    "ROA": { average: 1.5, thresholds: [0.2, 0.8, 2.0, 3.0], invert: false, isPercentage: true },
    "Current Ratio": { average: 1.0, thresholds: [0.5, 0.8, 1.2, 1.5], invert: false, isPercentage: false },
    "Debt to Equity": { average: 5.0, thresholds: [15.0, 10.0, 3.0, 1.5], invert: true, isPercentage: false }, // Higher leverage is standard
    "Asset Turnover": { average: 0.1, thresholds: [0.02, 0.05, 0.15, 0.25], invert: false, isPercentage: false },
  },
  "Healthcare": {
    "Gross Margin": { average: 55.0, thresholds: [35.0, 45.0, 65.0, 75.0], invert: false, isPercentage: true },
    "Net Margin": { average: 15.0, thresholds: [0.0, 8.0, 22.0, 30.0], invert: false, isPercentage: true },
    "ROE": { average: 18.0, thresholds: [5.0, 12.0, 24.0, 30.0], invert: false, isPercentage: true },
    "ROA": { average: 8.0, thresholds: [2.0, 5.0, 12.0, 16.0], invert: false, isPercentage: true },
    "Current Ratio": { average: 1.5, thresholds: [0.8, 1.2, 2.0, 2.8], invert: false, isPercentage: false },
    "Debt to Equity": { average: 1.2, thresholds: [3.0, 2.0, 0.8, 0.4], invert: true, isPercentage: false },
    "Asset Turnover": { average: 0.8, thresholds: [0.4, 0.6, 1.1, 1.5], invert: false, isPercentage: false },
  },
  "Consumer Goods": {
    "Gross Margin": { average: 40.0, thresholds: [20.0, 30.0, 50.0, 60.0], invert: false, isPercentage: true },
    "Net Margin": { average: 8.0, thresholds: [1.0, 4.0, 12.0, 18.0], invert: false, isPercentage: true },
    "ROE": { average: 15.0, thresholds: [5.0, 10.0, 20.0, 28.0], invert: false, isPercentage: true },
    "ROA": { average: 7.0, thresholds: [2.0, 5.0, 10.0, 15.0], invert: false, isPercentage: true },
    "Current Ratio": { average: 1.2, thresholds: [0.8, 1.0, 1.5, 2.0], invert: false, isPercentage: false },
    "Debt to Equity": { average: 1.5, thresholds: [4.0, 2.5, 1.0, 0.5], invert: true, isPercentage: false },
    "Asset Turnover": { average: 1.5, thresholds: [0.8, 1.1, 1.9, 2.5], invert: false, isPercentage: false },
  },
  "Energy": {
    "Gross Margin": { average: 30.0, thresholds: [10.0, 20.0, 40.0, 55.0], invert: false, isPercentage: true },
    "Net Margin": { average: 10.0, thresholds: [-5.0, 5.0, 15.0, 25.0], invert: false, isPercentage: true },
    "ROE": { average: 14.0, thresholds: [2.0, 8.0, 20.0, 28.0], invert: false, isPercentage: true },
    "ROA": { average: 6.0, thresholds: [1.0, 4.0, 9.0, 14.0], invert: false, isPercentage: true },
    "Current Ratio": { average: 1.3, thresholds: [0.8, 1.1, 1.8, 2.5], invert: false, isPercentage: false },
    "Debt to Equity": { average: 1.8, thresholds: [4.0, 2.5, 1.2, 0.8], invert: true, isPercentage: false },
    "Asset Turnover": { average: 0.6, thresholds: [0.3, 0.45, 0.8, 1.2], invert: false, isPercentage: false },
  },
  "Industrial": {
    "Gross Margin": { average: 25.0, thresholds: [10.0, 18.0, 32.0, 40.0], invert: false, isPercentage: true },
    "Net Margin": { average: 7.0, thresholds: [0.0, 4.0, 10.0, 15.0], invert: false, isPercentage: true },
    "ROE": { average: 14.0, thresholds: [4.0, 9.0, 19.0, 25.0], invert: false, isPercentage: true },
    "ROA": { average: 6.0, thresholds: [2.0, 4.0, 8.0, 12.0], invert: false, isPercentage: true },
    "Current Ratio": { average: 1.4, thresholds: [0.9, 1.2, 1.8, 2.4], invert: false, isPercentage: false },
    "Debt to Equity": { average: 1.4, thresholds: [3.5, 2.0, 1.0, 0.6], invert: true, isPercentage: false },
    "Asset Turnover": { average: 1.1, thresholds: [0.6, 0.8, 1.4, 1.8], invert: false, isPercentage: false },
  }
};

export interface BenchmarkResult {
  metric: BenchmarkMetricName;
  companyValue: number | null;
  industryAverage: number;
  percentDifference: number | null;
  rating: PerformanceRating;
  isPercentage: boolean;
}

export function classifyPerformance(value: number, thresholds: BenchmarkThresholds): PerformanceRating {
  const [tPoor, tBelowAvg, tAboveAvg, tExcellent] = thresholds.thresholds;
  
  if (thresholds.invert) {
    if (value >= tPoor) return "Poor";
    if (value >= tBelowAvg) return "Below Average";
    if (value <= tExcellent) return "Excellent";
    if (value <= tAboveAvg) return "Above Average";
    return "Average";
  } else {
    if (value <= tPoor) return "Poor";
    if (value <= tBelowAvg) return "Below Average";
    if (value >= tExcellent) return "Excellent";
    if (value >= tAboveAvg) return "Above Average";
    return "Average";
  }
}

export function evaluateAgainstBenchmark(
  metric: BenchmarkMetricName,
  industry: string,
  companyValue: number | null | undefined
): BenchmarkResult | null {
  const benchmarkDict = BENCHMARKS[industry];
  if (!benchmarkDict) return null; // Unrecognized industry
  
  const metricConfig = benchmarkDict[metric];
  if (!metricConfig) return null; // Unrecognized metric

  const isPercentage = metricConfig.isPercentage;
  
  // If company value is null or undefined, we can't fully evaluate, but we can return the structure
  if (companyValue === null || companyValue === undefined) {
    return {
      metric,
      companyValue: null,
      industryAverage: metricConfig.average,
      percentDifference: null,
      rating: "Average", // Default neutral
      isPercentage
    };
  }

  const rating = classifyPerformance(companyValue, metricConfig);
  let percentDifference = 0;
  
  if (metricConfig.average !== 0) {
     percentDifference = ((companyValue - metricConfig.average) / Math.abs(metricConfig.average)) * 100;
  }

  return {
    metric,
    companyValue,
    industryAverage: metricConfig.average,
    percentDifference,
    rating,
    isPercentage
  };
}
