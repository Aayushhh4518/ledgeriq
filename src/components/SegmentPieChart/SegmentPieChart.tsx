"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector
} from "recharts";

interface SegmentPieChartProps {
  segmentData: {
    iphone: number;
    mac: number;
    ipad: number;
    wearables: number;
    services: number;
  };
}

// Premium SaaS Color Palette
const COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Rose
  "#8b5cf6", // Violet
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#f4f4f5" className="text-xl font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill="#a1a1aa" className="text-sm">
        {`$${(value / 1000).toFixed(1)}k`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 14}
        fill={fill}
      />
    </g>
  );
};

export default function SegmentPieChart({
  segmentData,
}: SegmentPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const data = [
    { name: "iPhone", value: segmentData.iphone },
    { name: "Mac", value: segmentData.mac },
    { name: "iPad", value: segmentData.ipad },
    { name: "Wearables", value: segmentData.wearables },
    { name: "Services", value: segmentData.services },
  ];

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">
        Segment Revenue Distribution
      </h2>

      <div className="h-80 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...({ activeIndex, activeShape: renderActiveShape } as any)}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              stroke="none"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="transition-all duration-300 outline-none hover:opacity-100"
                  style={{ filter: activeIndex === index || activeIndex === undefined ? 'opacity(1)' : 'opacity(0.3)' }}
                />
              ))}
            </Pie>

            <Tooltip 
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
              formatter={(value: any) => [`$${Number(value || 0).toLocaleString()}`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}