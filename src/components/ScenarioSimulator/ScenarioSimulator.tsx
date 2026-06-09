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
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">
        Scenario Simulator
      </h2>

      <label className="block mb-4">
        Revenue Change: {growth}%
      </label>

      <input
        type="range"
        min="-20"
        max="50"
        value={growth}
        onChange={(e) =>
          setGrowth(Number(e.target.value))
        }
        className="w-full"
      />

      <div className="grid md:grid-cols-3 gap-4 mt-6">

        <div className="bg-slate-800 rounded-lg p-4">
          <p>Projected Revenue</p>

          <p className="text-2xl font-bold">
            ${projectedRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <p>Projected Net Income</p>

          <p className="text-2xl font-bold">
            ${projectedNetIncome.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <p>Net Margin</p>

          <p className="text-2xl font-bold">
            {(margin * 100).toFixed(2)}%
          </p>
        </div>

      </div>
    </div>
  );
}