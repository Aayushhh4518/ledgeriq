"use client";

import { FinancialMetrics } from "@/types/financial";
import { formatCurrency } from "@/lib/utils";
import { Trophy, Target, AlertTriangle } from "lucide-react";

interface Props {
  metrics1: FinancialMetrics;
  metrics2: FinancialMetrics;
}

export default function CompareExecutiveSummary({ metrics1, metrics2 }: Props) {
  const getScore = (m: FinancialMetrics) => {
    return Math.min(
      100,
      Math.round(
        ((m.netIncome ?? 0) / (m.revenue || 1)) * 100 +
        ((m.cash ?? 0) / (m.revenue || 1)) * 100
      )
    );
  };

  const getHeaderLabel = (m: FinancialMetrics, defaultLabel: string) => {
    if (!m.company) return defaultLabel;
    const ticker = m.ticker ? ` (${m.ticker})` : "";
    return `${m.company}${ticker} ${m.reportType || ''} ${m.fiscalYear || ''}`.trim();
  };

  const score1 = getScore(metrics1);
  const score2 = getScore(metrics2);

  const name1 = getHeaderLabel(metrics1, "Primary Company");
  const name2 = getHeaderLabel(metrics2, "Competitor Company");

  const isTie = score1 === score2;
  const winnerMetrics = score1 > score2 ? metrics1 : metrics2;
  const loserMetrics = score1 > score2 ? metrics2 : metrics1;
  const winnerName = score1 > score2 ? name1 : name2;
  const loserName = score1 > score2 ? name2 : name1;
  const winnerScore = Math.max(score1, score2);
  const loserScore = Math.min(score1, score2);

  const revenueDiff = (winnerMetrics.revenue ?? 0) - (loserMetrics.revenue ?? 0);
  const revenuePercentDiff = loserMetrics.revenue ? (revenueDiff / loserMetrics.revenue) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-[#0a0a0a]/80 to-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 mb-8 shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Winner Badge Area */}
        <div className="flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-xl">
          <Trophy className="w-12 h-12 text-yellow-500 mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
          <h3 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">Overall Winner</h3>
          <div className="text-3xl font-black text-white tracking-tight text-center">
            {isTie ? "TIE" : winnerName}
          </div>
          <div className="mt-4 flex items-center gap-2 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            <span className="text-emerald-400 font-bold text-lg">{winnerScore}</span>
            <span className="text-emerald-500/60 text-sm font-medium">/ 100</span>
          </div>
        </div>

        {/* Executive Summary Paragraph */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-indigo-400" />
              Executive Comparison Summary
            </h2>
            <p className="text-zinc-300 leading-relaxed text-[15px]">
              {isTie ? (
                `Both ${name1} and ${name2} present an equal fundamental profile based on our extraction, each scoring a ${winnerScore}/100.`
              ) : (
                `Based on our deep financial extraction and comparative analysis, **${winnerName}** exhibits a fundamentally stronger profile than ${loserName}. ` +
                `With an overall health score of ${winnerScore} vs ${loserScore}, ${winnerName} demonstrates superior operational efficiency.`
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-950/50 border border-white/5 rounded-lg p-4">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Scale Advantage</div>
              <div className="text-sm text-zinc-300">
                {revenueDiff > 0 
                  ? `${winnerName} generates ${formatCurrency(revenueDiff)} more in revenue (${revenuePercentDiff.toFixed(1)}% larger).`
                  : `${loserName} maintains a larger top-line scale despite a lower overall health score.`}
              </div>
            </div>
            <div className="bg-zinc-950/50 border border-white/5 rounded-lg p-4">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                Key Recommendation
              </div>
              <div className="text-sm text-amber-400/90 font-medium">
                {isTie 
                  ? "Diversify. Both assets show equal merit." 
                  : `Overweight ${winnerName} in capital allocation strategies.`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
