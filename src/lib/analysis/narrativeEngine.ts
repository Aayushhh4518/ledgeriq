import { FinancialMetrics } from "@/types/financial";
import { ComparisonContextData } from "@/contexts/FinancialContext";
import { formatCurrency } from "@/lib/utils";

/**
 * Generates a comprehensive narrative for the HeroSummary.
 * Considers metric confidence to highlight potential risks in the extraction.
 */
export function generateHeroNarrative(metrics: FinancialMetrics, investmentScore: number): string {
  const companyName = metrics.company || "the company";
  
  // Health score evaluation
  let healthDesc = "";
  if (investmentScore >= 80) healthDesc = "an exceptionally strong";
  else if (investmentScore >= 60) healthDesc = "a solid";
  else if (investmentScore >= 40) healthDesc = "a moderate";
  else healthDesc = "a vulnerable";

  // Check data confidence
  const lowConfidenceMetrics = [];
  if (metrics.revenue?.confidence !== undefined && metrics.revenue.confidence < 70) lowConfidenceMetrics.push("Revenue");
  if (metrics.netIncome?.confidence !== undefined && metrics.netIncome.confidence < 70) lowConfidenceMetrics.push("Net Income");
  if (metrics.cash?.confidence !== undefined && metrics.cash.confidence < 70) lowConfidenceMetrics.push("Cash Position");

  let confidenceWarning = "";
  if (lowConfidenceMetrics.length > 0) {
    confidenceWarning = ` Note: The extraction confidence for ${lowConfidenceMetrics.join(", ")} is low, which may impact the reliability of this analysis.`;
  }

  // Profitability assessment
  const margin = metrics.revenue?.value && metrics.netIncome?.value 
    ? (metrics.netIncome.value / metrics.revenue.value) * 100 
    : 0;

  let profitabilityDesc = "";
  if (margin > 20) profitabilityDesc = "highly profitable operations";
  else if (margin > 10) profitabilityDesc = "healthy profit margins";
  else if (margin > 0) profitabilityDesc = "thin but positive margins";
  else profitabilityDesc = "operating at a loss";

  return `Based on the latest financial extraction, ${companyName} demonstrates ${healthDesc} financial profile with an overall health score of ${investmentScore}/100. The company maintains ${profitabilityDesc}, generating ${metrics.revenue?.value ? formatCurrency(metrics.revenue.value) : 'N/A'} in top-line revenue and ${metrics.netIncome?.value ? formatCurrency(metrics.netIncome.value) : 'N/A'} in net income.${confidenceWarning}`;
}

/**
 * Generates a comparative narrative based on two sets of metrics and the comparison mode.
 */
export function generateCompareNarrative(metrics1: FinancialMetrics, metrics2: FinancialMetrics, context: ComparisonContextData, score1: number, score2: number): string {
  const isYoY = context.mode === 'YoY';
  const name1 = context.primaryLabel;
  const name2 = context.compareLabel;
  const isTie = score1 === score2;
  const isPositiveTrend = score1 > score2;
  
  const winnerName = score1 > score2 ? name1 : name2;
  const loserName = score1 > score2 ? name2 : name1;
  const winnerScore = Math.max(score1, score2);
  const loserScore = Math.min(score1, score2);

  const rev1 = metrics1.revenue?.value ?? 0;
  const rev2 = metrics2.revenue?.value ?? 0;
  const revenueDiff = rev1 - rev2;
  const revenuePercentDiff = rev2 ? (revenueDiff / rev2) * 100 : 0;

  // Confidence check
  const lowConf = [];
  if ((metrics1.revenue?.confidence ?? 100) < 70 || (metrics2.revenue?.confidence ?? 100) < 70) lowConf.push("Revenue");
  if ((metrics1.netIncome?.confidence ?? 100) < 70 || (metrics2.netIncome?.confidence ?? 100) < 70) lowConf.push("Net Income");

  let confidenceDesc = "";
  if (lowConf.length > 0) {
    confidenceDesc = ` Certain underlying metrics (${lowConf.join(", ")}) exhibited low extraction confidence, warranting manual verification.`;
  }

  if (isYoY) {
    const trendAction = isPositiveTrend ? 'expanded' : 'contracted';
    const healthShift = isPositiveTrend ? 'improved' : 'declined';
    
    return `Comparing ${name1} against its prior period (${name2}), the overall financial health score ${healthShift} from ${score2} to ${score1}. ` +
           `Top-line revenue shifted by ${revenuePercentDiff > 0 ? '+' : ''}${revenuePercentDiff.toFixed(1)}% year-over-year, moving from ${formatCurrency(rev2)} to ${formatCurrency(rev1)}. ` +
           `This indicates that operational efficiency and margin retention have ${trendAction} over the period.${confidenceDesc}`;
  } else {
    if (isTie) {
      return `Both ${name1} and ${name2} present an equally balanced fundamental profile based on our extraction, each scoring a ${winnerScore}/100. ` +
             `While ${name1} generates ${formatCurrency(rev1)} in revenue and ${name2} generates ${formatCurrency(rev2)}, their underlying efficiency, liquidity, and profitability metrics normalize to an identical health assessment.${confidenceDesc}`;
    }

    const scaleDesc = revenueDiff > 0 
      ? `${winnerName} also operates at a larger scale` 
      : `${loserName} maintains a larger top-line scale, yet ${winnerName} operates far more efficiently`;

    return `Based on our deep financial extraction and comparative analysis, ${winnerName} exhibits a fundamentally stronger profile than ${loserName}. ` +
           `Achieving an overall health score of ${winnerScore} vs ${loserScore}, ${winnerName} demonstrates superior operational efficiency and balance sheet resilience. ` +
           `${scaleDesc}, highlighting structural advantages in its current financial posture.${confidenceDesc}`;
  }
}
