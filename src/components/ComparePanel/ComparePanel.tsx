import { FinancialMetrics } from "@/types/financial";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, DollarSign, Activity, Percent } from "lucide-react";

interface ComparePanelProps {
  metrics1: FinancialMetrics;
  metrics2: FinancialMetrics;
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
  invert = false,
}: {
  label: string;
  val1?: number;
  val2?: number;
  formatter: (v?: number) => string;
  invert?: boolean;
}) => (
  <div className="grid grid-cols-3 gap-4 items-center p-4 border-b border-zinc-800/40 hover:bg-zinc-900/40 transition-colors">
    <div className="text-zinc-400 font-medium text-sm">{label}</div>
    <div className={`text-lg text-center ${getWinnerColor(val1, val2, invert)}`}>
      {formatter(val1)}
    </div>
    <div className={`text-lg text-center ${getWinnerColor2(val1, val2, invert)}`}>
      {formatter(val2)}
    </div>
  </div>
);

export default function ComparePanel({ metrics1, metrics2 }: ComparePanelProps) {
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

  const formatPercentage = (value?: number) => {
    return value ? `${value.toFixed(1)}%` : "N/A";
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="grid grid-cols-3 gap-4 bg-zinc-900/60 p-6 border-b border-zinc-800">
        <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center">
          Metric
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white tracking-tight">{metrics1.company}</div>
          <div className="text-xs text-blue-400 mt-1 uppercase tracking-wider font-semibold">Primary</div>
        </div>
        <div className="text-center border-l border-zinc-800/80 pl-4">
          <div className="text-2xl font-bold text-white tracking-tight">{metrics2.company}</div>
          <div className="text-xs text-violet-400 mt-1 uppercase tracking-wider font-semibold">Competitor</div>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        <ComparisonRow 
          label="Total Revenue" 
          val1={metrics1.revenue} 
          val2={metrics2.revenue} 
          formatter={(v) => v ? formatCurrency(v) : "N/A"} 
        />
        <ComparisonRow 
          label="Net Income" 
          val1={metrics1.netIncome} 
          val2={metrics2.netIncome} 
          formatter={(v) => v ? formatCurrency(v) : "N/A"} 
        />
        <ComparisonRow 
          label="Gross Profit" 
          val1={metrics1.grossProfit} 
          val2={metrics2.grossProfit} 
          formatter={(v) => v ? formatCurrency(v) : "N/A"} 
        />
        <ComparisonRow 
          label="Cash Position" 
          val1={metrics1.cash} 
          val2={metrics2.cash} 
          formatter={(v) => v ? formatCurrency(v) : "N/A"} 
        />
        
        {/* Calculated Metrics */}
        <div className="bg-zinc-900/20 py-2 px-4 border-b border-zinc-800/40">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Derived Analytics</span>
        </div>

        <ComparisonRow 
          label="Net Profit Margin" 
          val1={metrics1.revenue && metrics1.netIncome ? (metrics1.netIncome / metrics1.revenue) * 100 : undefined} 
          val2={metrics2.revenue && metrics2.netIncome ? (metrics2.netIncome / metrics2.revenue) * 100 : undefined} 
          formatter={formatPercentage} 
        />
        <ComparisonRow 
          label="Gross Margin" 
          val1={metrics1.revenue && metrics1.grossProfit ? (metrics1.grossProfit / metrics1.revenue) * 100 : undefined} 
          val2={metrics2.revenue && metrics2.grossProfit ? (metrics2.grossProfit / metrics2.revenue) * 100 : undefined} 
          formatter={formatPercentage} 
        />
        <ComparisonRow 
          label="Overall Health Score" 
          val1={score1} 
          val2={score2} 
          formatter={(v) => v ? `${v}/100` : "N/A"} 
        />
      </div>

      {/* Footer Verdict */}
      <div className="p-6 bg-gradient-to-t from-zinc-900/50 to-zinc-950 border-t border-zinc-800">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-500" />
          Comparison Verdict
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Based on the financial extractions, <strong className="text-white">{score1 > score2 ? metrics1.company : metrics2.company}</strong> appears to be fundamentally stronger with a Health Score of {Math.max(score1, score2)} compared to {Math.min(score1, score2)}. 
          {score1 > score2 
            ? ` ${metrics1.company} exhibits better relative margins and liquidity depth.`
            : ` ${metrics2.company} shows stronger profitability parameters and cash reserves.`}
        </p>
      </div>
    </div>
  );
}
