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
      value: metrics.revenue?.value,
      fill: "url(#colorRevenue)",
    },
    {
      name: "Gross Profit",
      value: metrics.grossProfit?.value,
      fill: "url(#colorGross)",
    },
    {
      name: "Net Income",
      value: metrics.netIncome?.value,
      fill: "url(#colorNet)",
    },
    {
      name: "Cash",
      value: metrics.cash?.value,
      fill: "url(#colorCash)",
    },
  ];

  // Placeholder Industry Target (e.g. 75% of Revenue)
   
  const benchmarkValue = (metrics.revenue?.value ?? 0) * 0.75;

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex justify-between items-center mb-8">
        <h2 className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
          Financial Overview
        </h2>
        <div className="flex items-center gap-3">
          <span className="w-4 h-px bg-indigo-500/80 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.1em]">Target Benchmark</span>
        </div>
      </div>

      <div className="relative z-10 w-full h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }} maxBarSize={48}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={1}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c084fc" stopOpacity={1}/>
                <stop offset="95%" stopColor="#9333ea" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={1}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={1}/>
                <stop offset="95%" stopColor="#d97706" stopOpacity={0.6}/>
              </linearGradient>
            </defs>

            <XAxis 
              dataKey="name" 
              stroke="#52525b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              dy={12}
              fontWeight={600}
            />
            <YAxis 
              stroke="#52525b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={{ stroke: '#27272a', strokeWidth: 1 }}
              tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
              fontWeight={500}
            />
            <Tooltip 
              cursor={{ fill: '#ffffff', opacity: 0.04 }}
              contentStyle={{ 
                backgroundColor: 'rgba(10, 10, 10, 0.8)', 
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                borderRadius: '12px', 
                color: '#f4f4f5',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                padding: '12px 16px'
              }}
              itemStyle={{ color: '#fff', fontWeight: 800, fontSize: '15px' }}
              labelStyle={{ color: '#a1a1aa', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}
              formatter={(value: unknown) => [`$${Number(value || 0).toLocaleString()}`, '']}
            />
            
            {benchmarkValue > 0 && (
              <ReferenceLine 
                y={benchmarkValue} 
                stroke="#6366f1" 
                strokeDasharray="4 4" 
                strokeOpacity={0.4}
                label={{ position: 'top', value: 'TARGET', fill: '#71717a', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em' }}
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