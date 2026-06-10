import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FinancialMetrics } from "@/types/financial";

interface Props {
  metrics: FinancialMetrics;
}

export default function HealthScore({ metrics }: Props) {
  const margin = ((metrics.netIncome ?? 0) / (metrics.revenue || 1)) * 100;

  let score = 50;

  if (margin > 25) score += 20;
  if ((metrics.cash ?? 0) > 20000) score += 15;
  if ((metrics.grossProfit ?? 0) > (metrics.revenue ?? 0) * 0.4) score += 15;

  score = Math.min(score, 100);

  // Gauge setup
  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  let color = "#10b981"; // Emerald
  if (score < 50) color = "#ef4444"; // Rose
  else if (score < 80) color = "#f59e0b"; // Amber

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 relative overflow-hidden group">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-2 relative z-10">
        Financial Health Score
      </h2>

      <div className="w-full h-48 relative mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="80%" // Move down since it's a half-circle
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
            >
              <Cell fill={color} />
              <Cell fill="#27272a" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black tracking-tighter" style={{ color }}>
              {score}
            </span>
            <span className="text-lg text-zinc-500 font-medium">/100</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 relative z-10">
        <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          Net Margin Impact:
        </span>
        <span className="text-sm font-medium text-zinc-300">
          {margin.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}