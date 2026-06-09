import { FinancialMetrics } from "@/types/financial";
import { calculateLiquidity } from "@/lib/analysis/liquidity";

interface Props {
  metrics: FinancialMetrics;
}

export default function LiquidityPanel({ metrics }: Props) {
  const liquidity = calculateLiquidity(metrics);

  if (!liquidity) {
    return (
      <div className="border rounded-lg p-6 mt-6 opacity-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-400">Liquidity & Solvency</h2>
        <p className="text-sm text-gray-500">Insufficient data extracted from PDF (missing Assets or Liabilities).</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Liquidity & Solvency</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded dark:bg-gray-800">
          <p className="text-sm text-gray-500">Current Ratio</p>
          <p className="font-semibold text-2xl">
            {liquidity.currentRatio.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Short-term liquidity (Current Assets / Current Liabilities)</p>
        </div>
        <div className="bg-gray-100 p-4 rounded dark:bg-gray-800">
          <p className="text-sm text-gray-500">Debt to Equity</p>
          <p className="font-semibold text-2xl">
            {liquidity.debtToEquity.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Financial leverage (Total Liabilities / Shareholder Equity)</p>
        </div>
      </div>
    </div>
  );
}
