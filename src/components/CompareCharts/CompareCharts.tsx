"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell
} from "recharts";
import { FinancialMetrics } from "@/types/financial";

interface CompareChartsProps {
  metrics1: FinancialMetrics;
  metrics2: FinancialMetrics;
}

export default function CompareCharts({ metrics1, metrics2 }: CompareChartsProps) {
  const c1Name = metrics1.company?.value ?? "Company A";
  const c2Name = metrics2.company?.value ?? "Company B";

  // Combine data into a single array for grouped BarChart
  const revenueData = [
    {
      name: "Revenue",
      [c1Name]: metrics1.revenue?.value ?? 0,
      [c2Name]: metrics2.revenue?.value ?? 0,
    },
    {
      name: "Gross Profit",
      [c1Name]: metrics1.grossProfit?.value ?? 0,
      [c2Name]: metrics2.grossProfit?.value ?? 0,
    },
    {
      name: "Net Income",
      [c1Name]: metrics1.netIncome?.value ?? 0,
      [c2Name]: metrics2.netIncome?.value ?? 0,
    },
    {
      name: "Cash Position",
      [c1Name]: metrics1.cash?.value ?? 0,
      [c2Name]: metrics2.cash?.value ?? 0,
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex justify-between items-center mb-8">
          <h2 className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
            Financial Health
          </h2>
        </div>

        <div className="relative z-10 w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <BarChart data={revenueData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
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
                itemStyle={{ color: '#fff', fontWeight: 800, fontSize: '13px' }}
                labelStyle={{ color: '#a1a1aa', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}
                formatter={(value: any) => [`$${Number(value || 0).toLocaleString()}`]}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }} />
              <Bar dataKey={c1Name} fill="#4f46e5" radius={[4, 4, 0, 0]} animationDuration={1500} />
              <Bar dataKey={c2Name} fill="#c084fc" radius={[4, 4, 0, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex justify-between items-center mb-8">
          <h2 className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
            Risk & Profitability
          </h2>
        </div>

        <div className="relative z-10 w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <BarChart 
              data={[
                {
                  name: "ROE (%)",
                  [c1Name]: metrics1.netIncome?.value && metrics1.shareholderEquity?.value ? (metrics1.netIncome.value / metrics1.shareholderEquity.value) * 100 : 0,
                  [c2Name]: metrics2.netIncome?.value && metrics2.shareholderEquity?.value ? (metrics2.netIncome.value / metrics2.shareholderEquity.value) * 100 : 0,
                },
                {
                  name: "Net Margin (%)",
                  [c1Name]: metrics1.netIncome?.value && metrics1.revenue?.value ? (metrics1.netIncome.value / metrics1.revenue.value) * 100 : 0,
                  [c2Name]: metrics2.netIncome?.value && metrics2.revenue?.value ? (metrics2.netIncome.value / metrics2.revenue.value) * 100 : 0,
                },
                {
                  name: "Gross Margin (%)",
                  [c1Name]: metrics1.grossProfit?.value && metrics1.revenue?.value ? (metrics1.grossProfit.value / metrics1.revenue.value) * 100 : 0,
                  [c2Name]: metrics2.grossProfit?.value && metrics2.revenue?.value ? (metrics2.grossProfit.value / metrics2.revenue.value) * 100 : 0,
                }
              ]} 
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
            >
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
                tickFormatter={(value) => `${value.toFixed(0)}%`}
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
                itemStyle={{ color: '#fff', fontWeight: 800, fontSize: '13px' }}
                labelStyle={{ color: '#a1a1aa', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}
                formatter={(value: any) => [`${Number(value || 0).toFixed(1)}%`]}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }} />
              <Bar dataKey={c1Name} fill="#34d399" radius={[4, 4, 0, 0]} animationDuration={1500} />
              <Bar dataKey={c2Name} fill="#f43f5e" radius={[4, 4, 0, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
