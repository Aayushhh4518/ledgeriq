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
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 relative overflow-hidden group">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">
        Financial Trend Analysis
      </h2>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="year" 
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
              cursor={{ stroke: '#27272a', strokeWidth: 1, strokeDasharray: '4 4' }}
              contentStyle={{ 
                backgroundColor: '#09090b', 
                border: '1px solid #27272a', 
                borderRadius: '8px', 
                color: '#f4f4f5',
                boxShadow: '0 4px 24px -8px rgba(0,0,0,0.5)'
              }}
              itemStyle={{ fontWeight: 600 }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />

            <Line
              type="monotone"
              dataKey="netIncome"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}