"use client";

import { useState } from "react";

interface Props {
  revenue: number;
  netIncome: number;
}

export default function ScenarioSimulator({
  revenue,
  netIncome,
}: Props) {

  const [growth, setGrowth] =
    useState(10);

  const projectedRevenue =
    revenue * (1 + growth / 100);

  const margin =
    netIncome / revenue;

  const projectedNetIncome =
    projectedRevenue * margin;

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 relative overflow-hidden group">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">
        Scenario Simulator
      </h2>

      <div className="bg-zinc-950/50 p-6 rounded-lg border border-zinc-800/50 mb-6 relative">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
            Revenue Change
          </label>
          <span className={`text-lg font-bold ${growth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {growth > 0 ? '+' : ''}{growth}%
          </span>
        </div>

        <input
          type="range"
          min="-20"
          max="50"
          value={growth}
          onChange={(e) =>
            setGrowth(Number(e.target.value))
          }
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 mt-2 font-mono">
          <span>-20%</span>
          <span>0%</span>
          <span>+50%</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">

        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Projected Revenue</p>

          <p className="text-xl font-bold text-white">
            ${projectedRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>

        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Projected Net Income</p>

          <p className="text-xl font-bold text-white">
            ${projectedNetIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>

        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">Net Margin</p>

          <p className="text-xl font-bold text-white">
            {(margin * 100).toFixed(2)}%
          </p>
        </div>

      </div>
    </div>
  );
}