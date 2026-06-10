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
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 relative overflow-hidden group">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">
        Financial Overview
      </h2>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              stroke="#71717a" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#71717a" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
            />
            <Tooltip 
              cursor={{ fill: '#27272a', opacity: 0.4 }}
              contentStyle={{ 
                backgroundColor: '#09090b', 
                border: '1px solid #27272a', 
                borderRadius: '8px', 
                color: '#f4f4f5',
                boxShadow: '0 4px 24px -8px rgba(0,0,0,0.5)'
              }}
              itemStyle={{ color: '#60a5fa', fontWeight: 600 }}
            />

            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}