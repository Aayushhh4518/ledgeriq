import { FinancialMetrics, HistoricalData, DocumentQualityScore } from "@/types/financial";
import { calculateDuPont } from "./profitability";
import { calculateLiquidity } from "./liquidity";
import { evaluateAgainstBenchmark, BenchmarkMetricName } from "./benchmarks";

// ---------------------------------------------------------
// Legacy Insights for backward compatibility (HeroSummary)
// ---------------------------------------------------------
export interface Insight {
  type: "strength" | "weakness" | "neutral";
  title: string;
  description: string;
  generatedFrom?: string[];
}

export function generateInsights(metrics: FinancialMetrics): Insight[] {
  const insights: Insight[] = [];

  const dupont = calculateDuPont(metrics);
  const liquidity = calculateLiquidity(metrics);

  if (dupont) {
    if (dupont.roe?.value !== undefined && dupont.roe.value > 0.15) {
      insights.push({ type: "strength", title: "Strong Return on Equity", description: `Company generates excellent returns (ROE: ${(dupont.roe.value * 100).toFixed(1)}%).`, generatedFrom: ["Net Income", "Shareholder Equity"] });
    } else if (dupont.roe?.value !== undefined && dupont.roe.value < 0.05) {
      insights.push({ type: "weakness", title: "Weak Return on Equity", description: `Company struggles to generate returns (ROE: ${(dupont.roe.value * 100).toFixed(1)}%).`, generatedFrom: ["Net Income", "Shareholder Equity"] });
    }
    if (dupont.profitMargin?.value !== undefined && dupont.profitMargin.value > 0.20) {
      insights.push({ type: "strength", title: "High Profit Margins", description: "Company has strong pricing power and cost control.", generatedFrom: ["Net Income", "Revenue"] });
    }
  }

  if (liquidity) {
    if (liquidity.currentRatio?.value !== undefined && liquidity.currentRatio.value > 1.5) {
      insights.push({ type: "strength", title: "Healthy Liquidity", description: `Current Ratio of ${liquidity.currentRatio.value.toFixed(2)} indicates strong short-term solvency.`, generatedFrom: ["Current Assets", "Current Liabilities"] });
    } else if (liquidity.currentRatio?.value !== undefined && liquidity.currentRatio.value < 1.0) {
      insights.push({ type: "weakness", title: "Liquidity Warning", description: `Current Ratio below 1.0 indicates potential short-term cash flow issues.`, generatedFrom: ["Current Assets", "Current Liabilities"] });
    }
  }

  return insights;
}

// ---------------------------------------------------------
// New Executive Intelligence Engine (v2)
// ---------------------------------------------------------
export interface ExecutiveSummary {
  assessment: string;
  strengths: string;
  risks: string;
  trajectory: string;
  confidenceScore: number;
}

export interface AISignal {
  name: string;
  status: "Strong" | "Moderate" | "Weak";
  explanation: string;
  analystReasoning: string;
  confidence: number;
}

export interface AIEvidenceInsight {
  type: "strength" | "risk";
  title: string;
  evidence: string;
}

export interface InvestmentRecommendation {
  view: "Strong Buy" | "Buy" | "Hold" | "Caution" | "Avoid";
  confidence: number;
  reasoning: string;
  bullCase: { title: string; drivers: string[] };
  bearCase: { title: string; drivers: string[] };
}

export interface KeyDriver {
  metric: string;
  impactRank: number;
  value: string;
  trend: "positive" | "negative" | "neutral";
}

export interface HealthBreakdownItem {
  component: string;
  impact: number;
  description: string;
  status: "passed" | "warning" | "error";
}

export interface StrategicOpportunity {
  title: string;
  description: string;
  metricTarget: string;
}

export interface AIRedFlag {
  title: string;
  description: string;
  severity: "High" | "Medium" | "Low";
}

export interface ExecutiveIntelligence {
  summary: ExecutiveSummary;
  signals: AISignal[];
  insights: AIEvidenceInsight[];
  recommendation: InvestmentRecommendation;
  drivers: KeyDriver[];
  healthBreakdown: HealthBreakdownItem[];
  opportunities: StrategicOpportunity[];
  redFlags: AIRedFlag[];
}

const getVal = (metric: any) => metric?.value as number | undefined;

export function generateExecutiveIntelligence(
  metrics: FinancialMetrics,
  historicalData: HistoricalData,
  documentQuality: DocumentQualityScore
): ExecutiveIntelligence {
  
  const dupont = calculateDuPont(metrics);
  const liquidity = calculateLiquidity(metrics);
  const companyName = metrics.company?.value || "The company";

  const signals: AISignal[] = [];
  const insights: AIEvidenceInsight[] = [];
  const drivers: KeyDriver[] = [];
  const opportunities: StrategicOpportunity[] = [];
  const redFlags: AIRedFlag[] = [];

  let scoreSum = 0;
  const industryStr = metrics.industry?.value || "Unknown";

  // Benchmarking Engine Evaluation
  const rawMetrics: Record<string, number | null> = {
    "Gross Margin": metrics.revenue?.value && metrics.grossProfit?.value ? (metrics.grossProfit.value / metrics.revenue.value) * 100 : null,
    "Net Margin": dupont?.profitMargin?.value !== undefined ? dupont.profitMargin.value * 100 : null,
    "ROE": dupont?.roe?.value !== undefined ? dupont.roe.value * 100 : null,
    "ROA": dupont?.profitMargin?.value !== undefined && dupont?.assetTurnover?.value !== undefined ? (dupont.profitMargin.value * dupont.assetTurnover.value) * 100 : null,
    "Current Ratio": liquidity?.currentRatio?.value ?? null,
    "Debt to Equity": metrics.totalDebt?.value !== undefined && metrics.shareholderEquity?.value ? (metrics.totalDebt.value / metrics.shareholderEquity.value) : null,
    "Asset Turnover": dupont?.assetTurnover?.value ?? null,
  };

  let benchmarkStrongCount = 0;
  let benchmarkWeakCount = 0;
  let hasBenchmarkSupport = false;

  Object.entries(rawMetrics).forEach(([metricName, value]) => {
    const res = evaluateAgainstBenchmark(metricName as BenchmarkMetricName, industryStr, value);
    if (res && res.percentDifference !== null && res.companyValue !== null) {
      hasBenchmarkSupport = true;
      const formattedValue = res.isPercentage ? `${res.companyValue.toFixed(1)}%` : `${res.companyValue.toFixed(2)}x`;
      const formattedAvg = res.isPercentage ? `${res.industryAverage.toFixed(1)}%` : `${res.industryAverage.toFixed(2)}x`;

      if (res.rating === "Excellent" || res.rating === "Above Average") {
        benchmarkStrongCount++;
        insights.push({
          type: "strength",
          title: `Industry Leading ${metricName}`,
          evidence: `${companyName}'s ${formattedValue} ${metricName.toLowerCase()} exceeds the ${industryStr} industry average of ${formattedAvg}, indicating superior performance and competitive advantage.`
        });
      } else if (res.rating === "Poor" || res.rating === "Below Average") {
        benchmarkWeakCount++;
        insights.push({
          type: "risk",
          title: `Underperforming ${metricName}`,
          evidence: `${companyName}'s ${formattedValue} ${metricName.toLowerCase()} falls below the ${industryStr} average of ${formattedAvg}.`
        });
        opportunities.push({
          title: `Optimize ${metricName}`,
          description: `Align operational performance closer to the ${industryStr} standard to remain competitive.`,
          metricTarget: `Target ${metricName} near ${formattedAvg}`
        });
      }
    }
  });

  if (hasBenchmarkSupport) {
    let status: "Strong" | "Moderate" | "Weak" = "Moderate";
    let explanation = "Performance aligns with industry averages.";
    let analystReasoning = `The company matches standard ${industryStr} performance benchmarks.`;
    
    if (benchmarkStrongCount > benchmarkWeakCount + 1) {
      status = "Strong";
      explanation = `Outperforming ${industryStr} peers across multiple metrics.`;
      analystReasoning = `The company significantly leads the ${industryStr} sector, registering ${benchmarkStrongCount} metrics above the industry average, demonstrating strong competitive moats.`;
      scoreSum += 3;
    } else if (benchmarkWeakCount > benchmarkStrongCount + 1) {
      status = "Weak";
      explanation = `Lagging behind ${industryStr} sector benchmarks.`;
      analystReasoning = `The company is struggling relative to its peers, with ${benchmarkWeakCount} key metrics falling below the ${industryStr} standard.`;
      scoreSum -= 3;
    }

    signals.push({
      name: "Industry Benchmarking",
      status,
      explanation,
      analystReasoning,
      confidence: 90
    });
  }
  
  // Profitability Signal
  if (dupont) {
    let status: "Strong" | "Moderate" | "Weak" = "Moderate";
    let explanation = "Profitability is average.";
    let analystReasoning = `Net margin of ${dupont.profitMargin?.value !== undefined ? (dupont.profitMargin.value * 100).toFixed(1) : "N/A"}% is in line with baseline expectations.`;
    
    if (dupont.profitMargin?.value !== undefined && dupont.profitMargin.value > 0.15) {
      status = "Strong";
      explanation = `Exceptional net margin of ${(dupont.profitMargin.value * 100).toFixed(1)}%.`;
      analystReasoning = `The company demonstrates strong pricing power and cost efficiency, converting ${(dupont.profitMargin.value * 100).toFixed(1)}% of top-line revenue directly to bottom-line net income.`;
      scoreSum += 2;
      insights.push({ type: "strength", title: "Strong Profitability", evidence: `Net margin ${(dupont.profitMargin.value * 100).toFixed(1)}%` });
    } else if (dupont.profitMargin?.value !== undefined && dupont.profitMargin.value < 0.05) {
      status = "Weak";
      explanation = `Thin net margin of ${(dupont.profitMargin.value * 100).toFixed(1)}%.`;
      analystReasoning = `High operating costs or lack of pricing power are compressing margins down to ${(dupont.profitMargin.value * 100).toFixed(1)}%, limiting capital available for reinvestment.`;
      scoreSum -= 2;
      insights.push({ type: "risk", title: "Weak Profitability", evidence: `Net margin ${(dupont.profitMargin.value * 100).toFixed(1)}%` });
      opportunities.push({ title: "Margin Expansion", description: "Implement stringent OPEX controls or optimize COGS.", metricTarget: `Target net margin > 10% (Currently ${(dupont.profitMargin.value * 100).toFixed(1)}%)`});
    }
    signals.push({ name: "Profitability", status, explanation, analystReasoning, confidence: metrics.netIncome?.confidence || 80 });
    
    drivers.push({
      metric: "Net Margin",
      impactRank: dupont.profitMargin?.value !== undefined ? Math.abs(dupont.profitMargin.value - 0.1) * 100 : 0,
      value: dupont.profitMargin?.value !== undefined ? `${(dupont.profitMargin.value * 100).toFixed(1)}%` : "N/A",
      trend: status === "Strong" ? "positive" : status === "Weak" ? "negative" : "neutral"
    });
  }

  // Liquidity Signal
  if (liquidity) {
    let status: "Strong" | "Moderate" | "Weak" = "Moderate";
    let explanation = "Sufficient liquidity to meet obligations.";
    let analystReasoning = `Current ratio of ${liquidity.currentRatio?.value !== undefined ? liquidity.currentRatio.value.toFixed(2) : "N/A"}x indicates standard working capital management.`;

    if (liquidity.currentRatio?.value !== undefined && liquidity.currentRatio.value > 1.5) {
      status = "Strong";
      explanation = `Robust current ratio of ${liquidity.currentRatio.value.toFixed(2)}x.`;
      analystReasoning = `Excellent short-term solvency profile. The company holds ${liquidity.currentRatio.value.toFixed(2)}x in current assets for every dollar of current liabilities, heavily insulating against cash crunches.`;
      scoreSum += 1;
      insights.push({ type: "strength", title: "Strong Liquidity", evidence: `Current ratio ${liquidity.currentRatio.value.toFixed(2)}x` });
    } else if (liquidity.currentRatio?.value !== undefined && liquidity.currentRatio.value < 1.0) {
      status = "Weak";
      explanation = `Current ratio of ${liquidity.currentRatio.value.toFixed(2)}x indicates potential short-term pressure.`;
      analystReasoning = `The balance sheet exhibits a working capital deficit. A ratio of ${liquidity.currentRatio.value.toFixed(2)}x means current obligations exceed easily liquidated assets.`;
      scoreSum -= 2;
      insights.push({ type: "risk", title: "Liquidity Pressure", evidence: `Current ratio below 1.0x` });
      redFlags.push({ title: "Working Capital Deficit", description: `Current liabilities exceed current assets.`, severity: "High" });
      opportunities.push({ title: "Debt Restructuring", description: "Convert short-term liabilities into long-term debt.", metricTarget: `Target current ratio > 1.2x` });
    }
    signals.push({ name: "Liquidity", status, explanation, analystReasoning, confidence: Math.min(metrics.currentAssets?.confidence || 80, metrics.currentLiabilities?.confidence || 80) });
  }

  // Growth Signal
  const revCurrent = historicalData.revenue?.current;
  const revPrev = historicalData.revenue?.previous;
  if (revCurrent !== undefined && revPrev !== undefined && revPrev > 0) {
    const revGrowth = (revCurrent - revPrev) / revPrev;
    let status: "Strong" | "Moderate" | "Weak" = "Moderate";
    let explanation = "Stable revenue growth.";
    let analystReasoning = `Top-line revenue grew by ${(revGrowth * 100).toFixed(1)}% year-over-year, tracking with standard market expansion.`;

    if (revGrowth > 0.1) {
      status = "Strong";
      explanation = `Strong top-line growth of ${(revGrowth * 100).toFixed(1)}% YoY.`;
      analystReasoning = `The company is aggressively capturing market share, outpacing baseline GDP growth significantly with a ${(revGrowth * 100).toFixed(1)}% YoY revenue surge.`;
      scoreSum += 2;
      insights.push({ type: "strength", title: "Revenue Expansion", evidence: `Top-line growth ${(revGrowth * 100).toFixed(1)}% YoY` });
    } else if (revGrowth < 0) {
      status = "Weak";
      explanation = `Revenue contracted by ${(Math.abs(revGrowth) * 100).toFixed(1)}% YoY.`;
      analystReasoning = `Loss of market share or sector headwinds resulted in a ${(Math.abs(revGrowth) * 100).toFixed(1)}% YoY contraction, a significant negative signal for future valuation.`;
      scoreSum -= 2;
      insights.push({ type: "risk", title: "Declining Momentum", evidence: `Revenue contraction of ${(Math.abs(revGrowth) * 100).toFixed(1)}% YoY` });
      redFlags.push({ title: "Top-Line Contraction", description: `Revenue shrank year-over-year, indicating structural business challenges.`, severity: "High" });
    }
    signals.push({ name: "Growth", status, explanation, analystReasoning, confidence: 90 });

    drivers.push({
      metric: "Revenue Growth",
      impactRank: Math.abs(revGrowth) * 100,
      value: `${(revGrowth * 100).toFixed(1)}%`,
      trend: status === "Strong" ? "positive" : status === "Weak" ? "negative" : "neutral"
    });
  } else {
    signals.push({ 
      name: "Growth", 
      status: "Moderate", 
      explanation: "Insufficient historical data to determine growth.", 
      analystReasoning: "Cannot compute YoY growth metrics due to missing historical filings.",
      confidence: 50 
    });
  }

  // Efficiency Signal
  if (dupont) {
    let status: "Strong" | "Moderate" | "Weak" = "Moderate";
    let explanation = "Average capital efficiency.";
    let analystReasoning = `Asset turnover of ${dupont.assetTurnover?.value !== undefined ? dupont.assetTurnover.value.toFixed(2) : "N/A"}x shows standard asset utilization.`;

    if (dupont.assetTurnover?.value !== undefined && dupont.assetTurnover.value > 1.0) {
      status = "Strong";
      explanation = `High asset turnover (${dupont.assetTurnover.value.toFixed(2)}x) indicates efficient capital use.`;
      analystReasoning = `Highly efficient operations: the company generates $${dupont.assetTurnover.value.toFixed(2)} in revenue for every $1.00 in assets on its balance sheet.`;
      scoreSum += 1;
    } else if (dupont.assetTurnover?.value !== undefined && dupont.assetTurnover.value < 0.5) {
      status = "Weak";
      explanation = `Low asset turnover (${dupont.assetTurnover.value.toFixed(2)}x) suggests capital inefficiency.`;
      analystReasoning = `Poor asset utilization. Generating only $${dupont.assetTurnover.value.toFixed(2)} per $1.00 of assets indicates bloated inventory or underperforming PP&E.`;
      scoreSum -= 1;
      opportunities.push({ title: "Asset Optimization", description: "Liquidate underperforming assets or tighten inventory cycles.", metricTarget: `Target Asset Turnover > 0.8x` });
    }
    signals.push({ name: "Efficiency", status, explanation, analystReasoning, confidence: 85 });
  }

  // Risk Signal & Health Breakdown
  const quality = documentQuality.score;
  const healthBreakdown: HealthBreakdownItem[] = [];
  
  healthBreakdown.push({
    component: "Base Extraction Confidence",
    impact: 100,
    description: "Initial automated document parsing confidence.",
    status: "passed"
  });

  documentQuality.validationResults.forEach(vr => {
    if (vr.impact !== 0) {
      healthBreakdown.push({
        component: vr.rule,
        impact: vr.impact, // Usually negative
        description: vr.message,
        status: vr.status
      });
    }
  });

  let riskStatus: "Strong" | "Moderate" | "Weak" = "Moderate"; 
  let riskExplanation = "Standard financial risk profile.";
  let riskReasoning = `The document quality score of ${quality}/100 indicates average data reliability.`;
  
  if (quality > 90) {
    riskStatus = "Strong";
    riskExplanation = "High data confidence and clean financial profile reduce overall risk.";
    riskReasoning = `Zero major validation anomalies and high extraction confidence (${quality}/100) point to exceptionally transparent accounting practices.`;
  } else if (quality < 70) {
    riskStatus = "Weak";
    riskExplanation = "Validation anomalies or missing statements elevate financial risk.";
    riskReasoning = `Significant validation failures (Score: ${quality}/100) such as unbalanced accounting equations or missing cash flows elevate systemic data risk.`;
    insights.push({ type: "risk", title: "Data Confidence", evidence: `Document quality score ${quality}/100` });
    redFlags.push({ title: "Financial Irregularities", description: `Multiple validation rules failed in the source document.`, severity: "High" });
  }
  signals.push({ name: "Risk Profile", status: riskStatus, explanation: riskExplanation, analystReasoning: riskReasoning, confidence: quality });


  // Calculate Investment View
  let view: "Strong Buy" | "Buy" | "Hold" | "Caution" | "Avoid" = "Hold";
  let reasoning = "Financials present a mixed or stable profile without a compelling edge.";
  
  const strengthDrivers = insights.filter(i => i.type === "strength").map(i => `${i.title} (${i.evidence})`);
  const riskDrivers = insights.filter(i => i.type === "risk").map(i => `${i.title} (${i.evidence})`);
  
  let bullCase = { 
    title: scoreSum >= 2 ? "Aggressive Upside" : "Bull Case", 
    drivers: strengthDrivers.length > 0 ? strengthDrivers : ["Stable market position", "Predictable baseline revenues"] 
  };
  let bearCase = { 
    title: scoreSum <= -2 ? "Systemic Decline" : "Bear Case", 
    drivers: riskDrivers.length > 0 ? riskDrivers : ["Lack of clear growth catalysts", "Potential margin compression"] 
  };

  if (scoreSum >= 4) {
    view = "Strong Buy";
    reasoning = "Exceptional profitability and strong growth indicators outweigh any minor risks.";
  } else if (scoreSum >= 2) {
    view = "Buy";
    reasoning = "Solid financial foundation with positive momentum in core metrics.";
  } else if (scoreSum <= -4) {
    view = "Avoid";
    reasoning = "Significant red flags across profitability, growth, or liquidity.";
  } else if (scoreSum <= -2) {
    view = "Caution";
    reasoning = "Declining momentum or balance sheet pressures warrant careful monitoring.";
  }

  // Sort drivers by impact rank
  drivers.sort((a, b) => b.impactRank - a.impactRank);
  if (drivers.length === 0) {
    drivers.push({ metric: "Revenue", impactRank: 50, value: getVal(metrics.revenue) ? `$${getVal(metrics.revenue)?.toLocaleString()}` : "N/A", trend: "neutral" });
    drivers.push({ metric: "Net Income", impactRank: 40, value: getVal(metrics.netIncome) ? `$${getVal(metrics.netIncome)?.toLocaleString()}` : "N/A", trend: "neutral" });
  }

  // Fallback opportunities if none generated
  if (opportunities.length === 0) {
    opportunities.push({ title: "Growth Incubation", description: "Reinvest stable cash flows into high-growth R&D initiatives.", metricTarget: "Revenue Growth > 10%" });
  }

  // Executive Summary
  const summary: ExecutiveSummary = {
    assessment: `${companyName} demonstrates a ${view.toLowerCase()} profile, supported by ${signals.filter(s => s.status === 'Strong').length} strong signals and ${signals.filter(s => s.status === 'Weak').length} key weaknesses.`,
    strengths: insights.filter(i => i.type === 'strength').map(i => i.title.toLowerCase()).join(", ") || "stable operations",
    risks: insights.filter(i => i.type === 'risk').map(i => i.title.toLowerCase()).join(", ") || "macroeconomic factors",
    trajectory: scoreSum > 0 ? "Positive momentum" : scoreSum < 0 ? "Declining momentum" : "Stable trajectory",
    confidenceScore: quality
  };

  return {
    summary,
    signals,
    insights,
    recommendation: {
      view,
      confidence: quality,
      reasoning,
      bullCase,
      bearCase
    },
    drivers: drivers.slice(0, 5),
    healthBreakdown,
    opportunities,
    redFlags
  };
}
