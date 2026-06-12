"use client";

import { FinancialMetrics } from "@/types/financial";
import { formatCurrency } from "@/lib/utils";
import { Trophy, Target, AlertTriangle, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { ComparisonContextData } from "@/contexts/FinancialContext";
import { generateCompareNarrative } from "@/lib/analysis/narrativeEngine";

interface Props {
  metrics1: FinancialMetrics;
  metrics2: FinancialMetrics;
  context: ComparisonContextData;
}

export default function CompareExecutiveSummary({ metrics1, metrics2, context }: Props) {
  const getScore = (m: FinancialMetrics) => {
    return Math.min(
      100,
      Math.round(
        ((m.netIncome?.value ?? 0) / (m.revenue?.value || 1)) * 100 +
        ((m.cash?.value ?? 0) / (m.revenue?.value || 1)) * 100
      )
    );
  };

  const score1 = getScore(metrics1);
  const score2 = getScore(metrics2);

  const name1 = context.primaryLabel;
  const name2 = context.compareLabel;
  const isYoY = context.mode === 'YoY';

  const isTie = score1 === score2;
  const winnerMetrics = score1 > score2 ? metrics1 : metrics2;
  const loserMetrics = score1 > score2 ? metrics2 : metrics1;
  const winnerName = score1 > score2 ? name1 : name2;
  const loserName = score1 > score2 ? name2 : name1;
  const winnerScore = Math.max(score1, score2);
  const loserScore = Math.min(score1, score2);

  const revenueDiff = (metrics1.revenue?.value ?? 0) - (metrics2.revenue?.value ?? 0);
  const revenuePercentDiff = metrics2.revenue?.value ? (revenueDiff / metrics2.revenue.value) * 100 : 0;

  const isPositiveTrend = score1 > score2;

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 mb-8 relative overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Badge Area */}
        <div className="flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-xl">
          {isYoY ? (
            <>
              {isPositiveTrend ? (
                <TrendingUp className="w-12 h-12 text-emerald-500 mb-4" />
              ) : (
                <TrendingDown className="w-12 h-12 text-rose-500 mb-4" />
              )}
              <h3 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">Trend Trajectory</h3>
              <div className="text-xl font-bold text-white tracking-tight text-center">
                {isTie ? "Stable" : isPositiveTrend ? "Improving" : "Declining"}
              </div>
              <div className="mt-4 flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                <span className="text-zinc-300 font-bold text-sm">Score: {score1}</span>
              </div>
            </>
          ) : (
            <>
              <Trophy className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">Overall Winner</h3>
              <div className="text-3xl font-black text-white tracking-tight text-center">
                {isTie ? "TIE" : winnerName}
              </div>
              <div className="mt-4 flex items-center gap-2 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                <span className="text-emerald-400 font-bold text-lg">{winnerScore}</span>
                <span className="text-emerald-500/60 text-sm font-medium">/ 100</span>
              </div>
            </>
          )}
        </div>

        {/* Executive Summary Paragraph */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-indigo-400" />
              {isYoY ? 'Trend Analysis Summary' : 'Executive Comparison Summary'}
            </h2>
            <p className="text-zinc-300 leading-relaxed text-[15px]">
              {generateCompareNarrative(metrics1, metrics2, context, score1, score2)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/40 border border-white/5 rounded-lg p-4">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Scale Difference</div>
              <div className="text-sm text-zinc-300">
                {isYoY ? (
                  `Revenue shifted by ${formatCurrency(Math.abs(revenueDiff))} (${revenuePercentDiff.toFixed(1)}%).`
                ) : revenueDiff > 0 ? (
                  `${winnerName} generates ${formatCurrency(Math.abs((winnerMetrics.revenue?.value ?? 0) - (loserMetrics.revenue?.value ?? 0)))} more in revenue.`
                ) : (
                  `${loserName} maintains a larger top-line scale despite a lower overall health score.`
                )}
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-lg p-4">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                Key Recommendation
              </div>
              <div className="text-sm text-amber-400/90 font-medium">
                {isYoY ? (
                  isPositiveTrend ? "Maintain current strategic initiatives." : "Review capital allocation; metrics are softening."
                ) : isTie ? (
                  "Diversify. Both assets show equal merit." 
                ) : (
                  `Overweight ${winnerName} in capital allocation strategies.`
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
