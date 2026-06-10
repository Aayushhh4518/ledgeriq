import { FinancialMetrics } from "@/types/financial";
import { TrendingUp, DollarSign, BarChart3, LineChart } from "lucide-react";

interface Props {
  metrics: FinancialMetrics;
}

export default function OverviewCards({ metrics }: Props) {
  const cards = [
    {
      title: "Revenue",
      value: `$${(metrics.revenue ?? 0).toLocaleString()}`,
      trend: "+12.4%",
      icon: DollarSign,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Gross Profit",
      value: `$${(metrics.grossProfit ?? 0).toLocaleString()}`,
      trend: "+8.2%",
      icon: BarChart3,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Net Income",
      value: `$${(metrics.netIncome ?? 0).toLocaleString()}`,
      trend: "+15.3%",
      icon: LineChart,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10"
    },
    {
      title: "Cash Balance",
      value: `$${(metrics.cash ?? 0).toLocaleString()}`,
      trend: "+4.1%",
      icon: DollarSign,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-6 relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                {card.title}
              </p>
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
              {card.value}
            </h2>

            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center justify-center px-1.5 py-0.5 rounded text-[11px] font-medium text-emerald-400 bg-emerald-400/10 gap-1">
                <TrendingUp className="w-3 h-3" />
                {card.trend}
              </div>
              <span className="text-xs text-zinc-500">vs last period</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}