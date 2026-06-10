"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
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

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function SegmentPieChart({
  segmentData,
}: SegmentPieChartProps) {
  const data = [
    { name: "iPhone", value: segmentData.iphone },
    { name: "Mac", value: segmentData.mac },
    { name: "iPad", value: segmentData.ipad },
    { name: "Wearables", value: segmentData.wearables },
    { name: "Services", value: segmentData.services },
  ];

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 relative overflow-hidden group">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">
        Segment Revenue Distribution
      </h2>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#09090b', 
                border: '1px solid #27272a', 
                borderRadius: '8px', 
                color: '#f4f4f5',
                boxShadow: '0 4px 24px -8px rgba(0,0,0,0.5)'
              }}
              itemStyle={{ fontWeight: 600 }}
              formatter={(value: any) => `$${Number(value).toLocaleString()}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}