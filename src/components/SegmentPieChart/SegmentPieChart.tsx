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
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Segment Revenue Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}