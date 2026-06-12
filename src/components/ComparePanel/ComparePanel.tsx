import { FinancialMetrics } from "@/types/financial";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, DollarSign, Activity, Percent, AlertTriangle } from "lucide-react";

import { UploadResponse, ComparisonContextData } from "@/contexts/FinancialContext";

interface ComparePanelProps {
  metrics1: FinancialMetrics;
  metrics2: FinancialMetrics;
  hist1?: UploadResponse["historicalData"] | null;
  hist2?: UploadResponse["historicalData"] | null;
  context: ComparisonContextData;
}

const getWinnerColor = (val1?: number, val2?: number, invert = false) => {
  if (val1 === undefined || val2 === undefined) return "text-zinc-400";
  if (val1 === val2) return "text-blue-400"; // tie
  
  const oneWins = invert ? val1 < val2 : val1 > val2;
  return oneWins ? "text-emerald-400 font-bold" : "text-rose-400";
};

const getWinnerColor2 = (val1?: number, val2?: number, invert = false) => {
  if (val1 === undefined || val2 === undefined) return "text-zinc-400";
  if (val1 === val2) return "text-blue-400"; // tie
  
  const twoWins = invert ? val2 < val1 : val2 > val1;
  return twoWins ? "text-emerald-400 font-bold" : "text-rose-400";
};

const ComparisonRow = ({
  label,
  val1,
  val2,
  formatter,
  formatter1,
  formatter2,
  invert = false,
  isYoY = false,
}: {
  label: string;
  val1?: number;
  val2?: number;
  formatter?: (v?: number) => string;
  formatter1?: (v?: number) => string;
  formatter2?: (v?: number) => string;
  invert?: boolean;
  isYoY?: boolean;
}) => {
  const f1 = formatter1 || formatter || ((v) => String(v));
  const f2 = formatter2 || formatter || ((v) => String(v));
  
  return (
    <div className="grid grid-cols-3 gap-4 items-center p-3 border-b border-zinc-800/40 hover:bg-zinc-900/40 transition-colors">
      <div className="text-zinc-400 font-medium text-[13px]">{label}</div>
      <div className={`text-base font-medium text-center ${!isYoY ? getWinnerColor(val1, val2, invert) : "text-zinc-200"}`}>
        {f1(val1)}
      </div>
      <div className={`text-base font-medium text-center ${!isYoY ? getWinnerColor2(val1, val2, invert) : "text-zinc-200"}`}>
        {f2(val2)}
      </div>
    </div>
  );
};

export default function ComparePanel({ metrics1, metrics2, hist1, hist2, context }: ComparePanelProps) {
  const getScore = (m: FinancialMetrics) => {
    return Math.min(
      100,
      Math.round(
        ((m.netIncome ?? 0) / (m.revenue || 1)) * 100 +
        ((m.cash ?? 0) / (m.revenue || 1)) * 100
      )
    );
  };

  const score1 = getScore(metrics1);
  const score2 = getScore(metrics2);
  const isYoY = context.mode === 'YoY';

  const formatPercentage = (value?: number | string, isValid: boolean = true) => {
    if (!isValid) return "Anomaly";
    if (typeof value === "string") return value;
    return value !== undefined ? `${value.toFixed(1)}%` : "N/A";
  };
  
  const formatRatio = (value?: number) => {
    return value !== undefined ? `${value.toFixed(2)}x` : "N/A";
  };

  const revGrowth1 = hist1?.revenue.growth ?? undefined;
  const revGrowth2 = hist2?.revenue.growth ?? undefined;
  const niGrowth1 = hist1?.netIncome.growth ?? undefined;
  const niGrowth2 = hist2?.netIncome.growth ?? undefined;

  const header1 = context.primaryLabel;
  const header2 = context.compareLabel;

  return (
    <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="grid grid-cols-3 gap-4 bg-zinc-900/60 p-4 lg:p-6 border-b border-zinc-800">
        <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center">
          Metric
        </div>
        <div className="text-center">
          <div className="text-lg lg:text-xl font-bold text-white tracking-tight leading-tight">{header1}</div>
          <div className="text-[10px] lg:text-xs text-blue-400 mt-1 uppercase tracking-wider font-semibold">Primary</div>
        </div>
        <div className="text-center border-l border-zinc-800/80 pl-4">
          <div className="text-lg lg:text-xl font-bold text-white tracking-tight leading-tight">{header2}</div>
          <div className="text-[10px] lg:text-xs text-violet-400 mt-1 uppercase tracking-wider font-semibold">{isYoY ? 'Previous' : 'Competitor'}</div>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        <ComparisonRow 
          label="Total Revenue" 
          val1={metrics1.revenue} 
          val2={metrics2.revenue} 
          formatter={(v) => v ? formatCurrency(v) : "N/A"} 
          isYoY={isYoY}
        />
        <ComparisonRow 
          label="Net Income" 
          val1={metrics1.netIncome} 
          val2={metrics2.netIncome} 
          formatter={(v) => v ? formatCurrency(v) : "N/A"} 
          isYoY={isYoY}
        />
        <ComparisonRow 
          label="Gross Profit" 
          val1={metrics1.grossProfit} 
          val2={metrics2.grossProfit} 
          formatter={(v) => v ? formatCurrency(v) : "N/A"} 
          isYoY={isYoY}
        />
        <ComparisonRow 
          label="Cash Position" 
          val1={metrics1.cash} 
          val2={metrics2.cash} 
          formatter={(v) => v ? formatCurrency(v) : "N/A"} 
          isYoY={isYoY}
        />
        
        {/* Calculated Metrics */}
        <div className="bg-zinc-900/20 py-2 px-4 border-b border-zinc-800/40">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Profitability & Growth</span>
        </div>

        <ComparisonRow 
          label="Net Profit Margin" 
          val1={metrics1.revenue && metrics1.netIncome ? (metrics1.netIncome / metrics1.revenue) * 100 : undefined} 
          val2={metrics2.revenue && metrics2.netIncome ? (metrics2.netIncome / metrics2.revenue) * 100 : undefined} 
          formatter={formatPercentage} 
          isYoY={isYoY}
        />
        <ComparisonRow 
          label="Gross Margin" 
          val1={metrics1.revenue && metrics1.grossProfit ? (metrics1.grossProfit / metrics1.revenue) * 100 : undefined} 
          val2={metrics2.revenue && metrics2.grossProfit ? (metrics2.grossProfit / metrics2.revenue) * 100 : undefined} 
          formatter={formatPercentage} 
          isYoY={isYoY}
        />
        <ComparisonRow 
          label="Revenue Growth (YoY)" 
          val1={revGrowth1} 
          val2={revGrowth2} 
          formatter1={(v) => formatPercentage(v, hist1?.isValid !== false)}
          formatter2={(v) => formatPercentage(v, hist2?.isValid !== false)}
          isYoY={isYoY}
        />
        <ComparisonRow 
          label="Net Income Growth (YoY)" 
          val1={niGrowth1} 
          val2={niGrowth2} 
          formatter1={(v) => formatPercentage(v, hist1?.isValid !== false)}
          formatter2={(v) => formatPercentage(v, hist2?.isValid !== false)}
          isYoY={isYoY}
        />

        <div className="bg-zinc-900/20 py-2 px-4 border-b border-zinc-800/40">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Risk & Efficiency Ratios</span>
        </div>

        <ComparisonRow 
          label="Return on Equity (ROE)" 
          val1={metrics1.netIncome && metrics1.shareholderEquity ? (metrics1.netIncome / metrics1.shareholderEquity) * 100 : undefined} 
          val2={metrics2.netIncome && metrics2.shareholderEquity ? (metrics2.netIncome / metrics2.shareholderEquity) * 100 : undefined} 
          formatter={formatPercentage} 
          isYoY={isYoY}
        />
        <ComparisonRow 
          label="Return on Assets (ROA)" 
          val1={metrics1.netIncome && metrics1.totalAssets ? (metrics1.netIncome / metrics1.totalAssets) * 100 : undefined} 
          val2={metrics2.netIncome && metrics2.totalAssets ? (metrics2.netIncome / metrics2.totalAssets) * 100 : undefined} 
          formatter={formatPercentage} 
          isYoY={isYoY}
        />
        <ComparisonRow 
          label="Current Ratio" 
          val1={metrics1.currentAssets && metrics1.currentLiabilities ? (metrics1.currentAssets / metrics1.currentLiabilities) : undefined} 
          val2={metrics2.currentAssets && metrics2.currentLiabilities ? (metrics2.currentAssets / metrics2.currentLiabilities) : undefined} 
          formatter={formatRatio} 
          isYoY={isYoY}
        />
        <ComparisonRow 
          label="Debt-to-Equity Ratio" 
          val1={metrics1.totalDebt && metrics1.shareholderEquity ? (metrics1.totalDebt / metrics1.shareholderEquity) : undefined} 
          val2={metrics2.totalDebt && metrics2.shareholderEquity ? (metrics2.totalDebt / metrics2.shareholderEquity) : undefined} 
          formatter={formatRatio} 
          invert={true} // Lower is better for debt
          isYoY={isYoY}
        />

        <div className="bg-zinc-900/20 py-2 px-4 border-b border-zinc-800/40">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Overall</span>
        </div>

        <ComparisonRow 
          label="Overall Health Score" 
          val1={score1} 
          val2={score2} 
          formatter={(v) => v ? `${v}/100` : "N/A"} 
          isYoY={isYoY}
        />
      </div>

      {/* Footer Verdict */}
      <div className="p-6 bg-gradient-to-t from-zinc-900/50 to-zinc-950 border-t border-zinc-800">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-500" />
          {isYoY ? 'Trend Analysis' : 'Comparison Verdict'}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          {isYoY ? (
            <>
              Comparing {header1} to {header2}, the fundamental health score {score1 > score2 ? 'improved' : score1 < score2 ? 'declined' : 'remained stable'} from {score2} to {score1}. 
              {score1 > score2 
                ? ` This indicates a strengthening of core financial health across the period.`
                : score1 < score2 ? ` This indicates a potential softening of financial health compared to the prior period.` : ` Financial health metrics remained consistent.`}
            </>
          ) : (
            <>
              Based on the financial extractions, <strong className="text-white">{score1 > score2 ? header1 : header2}</strong> appears to be fundamentally stronger with a Health Score of {Math.max(score1, score2)} compared to {Math.min(score1, score2)}. 
              {score1 > score2 
                ? ` ${header1} exhibits better relative margins and liquidity depth.`
                : ` ${header2} shows stronger profitability parameters and cash reserves.`}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
