import { FinancialMetrics } from "@/types/financial";
import { calculateDuPont } from "./profitability";
import { calculateLiquidity } from "./liquidity";

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

  // Profitability Insights
  if (dupont) {
    if (dupont.roe > 0.15) {
      insights.push({
        type: "strength",
        title: "Strong Return on Equity",
        description: `Company generates excellent returns for shareholders (ROE: ${(dupont.roe * 100).toFixed(1)}%).`,
        generatedFrom: ["Net Income", "Shareholder Equity"]
      });
    } else if (dupont.roe < 0.05) {
      insights.push({
        type: "weakness",
        title: "Weak Return on Equity",
        description: `Company struggles to generate returns on shareholder capital (ROE: ${(dupont.roe * 100).toFixed(1)}%).`,
        generatedFrom: ["Net Income", "Shareholder Equity"]
      });
    }

    if (dupont.profitMargin > 0.20) {
      insights.push({
        type: "strength",
        title: "High Profit Margins",
        description: "Company has strong pricing power and cost control.",
        generatedFrom: ["Net Income", "Revenue"]
      });
    }
  }

  // Liquidity Insights
  if (liquidity) {
    if (liquidity.currentRatio > 1.5) {
      insights.push({
        type: "strength",
        title: "Healthy Liquidity",
        description: `Current Ratio of ${liquidity.currentRatio.toFixed(2)} indicates strong short-term solvency.`,
        generatedFrom: ["Current Assets", "Current Liabilities"]
      });
    } else if (liquidity.currentRatio < 1.0) {
      insights.push({
        type: "weakness",
        title: "Liquidity Warning",
        description: `Current Ratio below 1.0 indicates potential short-term cash flow issues.`,
        generatedFrom: ["Current Assets", "Current Liabilities"]
      });
    }

    if (liquidity.debtToEquity > 2.0) {
      insights.push({
        type: "weakness",
        title: "High Leverage",
        description: `High Debt-to-Equity ratio (${liquidity.debtToEquity.toFixed(2)}) indicates high reliance on debt.`,
        generatedFrom: ["Total Debt", "Shareholder Equity"]
      });
    } else if (liquidity.debtToEquity < 1.0) {
      insights.push({
        type: "strength",
        title: "Conservative Leverage",
        description: `Low Debt-to-Equity ratio implies strong financial stability.`,
        generatedFrom: ["Total Debt", "Shareholder Equity"]
      });
    }
  }

  // Earnings Quality
  if (metrics.operatingCashFlow && metrics.netIncome) {
    const qualityRatio = metrics.operatingCashFlow.value / metrics.netIncome.value;
    if (qualityRatio > 1.0) {
      insights.push({
        type: "strength",
        title: "High Earnings Quality",
        description: "Operating cash flow exceeds net income, indicating real cash generation.",
        generatedFrom: ["Operating Cash Flow", "Net Income"]
      });
    } else if (qualityRatio < 0.5) {
      insights.push({
        type: "weakness",
        title: "Low Earnings Quality",
        description: "Net income is significantly higher than operating cash flow. Earnings may be inflated by accounting methods.",
        generatedFrom: ["Operating Cash Flow", "Net Income"]
      });
    }
  }

  return insights;
}
