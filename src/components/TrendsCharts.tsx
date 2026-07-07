"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { HistoricalData } from "@/types/financial";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  historicalData: HistoricalData;
}

export default function TrendsCharts({ historicalData }: Props) {
  // If data is invalid or missing, we don't render anything (handled by parent usually, but safe check here)
  if (!historicalData || !historicalData.isValid) return null;

  const data = [
    {
      period: "Previous Year",
      Revenue: historicalData.revenue?.previous || 0,
      "Net Income": historicalData.netIncome?.previous || 0,
    },
    {
      period: "Current Year",
      Revenue: historicalData.revenue?.current || 0,
      "Net Income": historicalData.netIncome?.current || 0,
    },
  ];

  // Calculate overall growth
  const revGrowth = historicalData.revenue?.growth ?? 0;
  const isRevPositive = revGrowth >= 0;

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex justify-between items-start mb-8">
        <div>
          <h2 className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">
            Historical Growth Trends
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white tracking-tight">
              {isRevPositive ? '+' : ''}{revGrowth.toFixed(1)}%
            </span>
            <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${isRevPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
              {isRevPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              YoY Revenue
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Net Income</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorNetArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            
            <XAxis 
              dataKey="period" 
              stroke="#52525b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={12}
              fontWeight={600}
            />
            <YAxis 
              stroke="#52525b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
              fontWeight={500}
            />
            <Tooltip 
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
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
              labelStyle={{ color: '#a1a1aa', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}
              formatter={(value: unknown) => [`$${Number(value || 0).toLocaleString()}`, '']}
            />
            
            <Area 
              type="monotone" 
              dataKey="Revenue" 
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevArea)" 
              animationDuration={1500}
            />
            <Area 
              type="monotone" 
              dataKey="Net Income" 
              stroke="#34d399" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorNetArea)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
