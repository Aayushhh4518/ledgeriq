"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell
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
      fill: "url(#colorRevenue)",
    },
    {
      name: "Gross Profit",
      value: metrics.grossProfit,
      fill: "url(#colorGross)",
    },
    {
      name: "Net Income",
      value: metrics.netIncome,
      fill: "url(#colorNet)",
    },
    {
      name: "Cash",
      value: metrics.cash,
      fill: "url(#colorCash)",
    },
  ];

  // Placeholder Industry Target (e.g. 75% of Revenue)
  const benchmarkValue = (metrics.revenue ?? 0) * 0.75;

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
          Financial Overview
        </h2>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-blue-500/50 rounded-full" />
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Benchmark</span>
        </div>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }} maxBarSize={60}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={1}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.3}/>
              </linearGradient>
            </defs>

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
              cursor={{ fill: '#27272a', opacity: 0.2 }}
              contentStyle={{ 
                backgroundColor: 'rgba(9, 9, 11, 0.9)', 
                backdropFilter: 'blur(8px)',
                border: '1px solid #27272a', 
                borderRadius: '12px', 
                color: '#f4f4f5',
                boxShadow: '0 8px 32px -8px rgba(0,0,0,0.6)',
                padding: '12px 16px'
              }}
              itemStyle={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}
              labelStyle={{ color: '#a1a1aa', fontSize: '13px', marginBottom: '4px' }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
            />
            
            {benchmarkValue > 0 && (
              <ReferenceLine 
                y={benchmarkValue} 
                stroke="#3b82f6" 
                strokeDasharray="4 4" 
                strokeOpacity={0.5}
                label={{ position: 'top', value: 'Target', fill: '#71717a', fontSize: 10 }}
              />
            )}

            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}