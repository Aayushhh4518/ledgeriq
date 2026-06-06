"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { FinancialMetrics } from "@/types/financial";

interface Props {
  metrics: FinancialMetrics;
}

export default function RevenueChart({ metrics }: Props) {
  const data = [
    {
      name: "Revenue",
      value: metrics.revenue,
    },
    {
      name: "Gross Profit",
      value: metrics.grossProfit,
    },
    {
      name: "Net Income",
      value: metrics.netIncome,
    },
    {
      name: "Cash",
      value: metrics.cash,
    },
  ];

  return (
    <div className="border rounded-xl p-6 bg-zinc-900 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Financial Overview
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}