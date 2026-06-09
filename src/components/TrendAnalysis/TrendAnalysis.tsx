"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  revenueCurrent: number;
  revenuePrevious: number;
  netIncomeCurrent: number;
  netIncomePrevious: number;
}

export default function TrendAnalysis({
  revenueCurrent,
  revenuePrevious,
  netIncomeCurrent,
  netIncomePrevious,
}: Props) {

  const data = [
    {
      year: "2024",
      revenue: revenuePrevious,
      netIncome: netIncomePrevious,
    },
    {
      year: "2025",
      revenue: revenueCurrent,
      netIncome: netIncomeCurrent,
    },
  ];

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Financial Trend Analysis
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="netIncome"
              stroke="#22c55e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}