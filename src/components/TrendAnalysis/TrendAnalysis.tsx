"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
      year: "Previous Period",
      revenue: revenuePrevious,
      netIncome: netIncomePrevious,
    },
    {
      year: "Current Period",
      revenue: revenueCurrent,
      netIncome: netIncomeCurrent,
    },
  ];

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
          Financial Trend Analysis
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="text-xs font-medium text-zinc-400">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-xs font-medium text-zinc-400">Net Income</span>
          </div>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>

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
                backgroundColor: 'rgba(9, 9, 11, 0.9)', 
                backdropFilter: 'blur(8px)',
                border: '1px solid #27272a', 
                borderRadius: '12px', 
                color: '#f4f4f5',
                boxShadow: '0 8px 32px -8px rgba(0,0,0,0.6)',
                padding: '12px 16px'
              }}
              itemStyle={{ fontWeight: 600, fontSize: '15px' }}
              labelStyle={{ color: '#a1a1aa', fontSize: '13px', marginBottom: '4px' }}
              formatter={(value: unknown, name: unknown) => [
                `$${Number(value || 0).toLocaleString()}`, 
                name === 'revenue' ? 'Revenue' : 'Net Income'
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRev)"
              animationDuration={1500}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
            />

            <Area
              type="monotone"
              dataKey="netIncome"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorInc)"
              animationDuration={1500}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}