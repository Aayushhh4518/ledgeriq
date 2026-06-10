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
            className="group relative bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Subtle Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                {card.title}
              </p>
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${card.bg} border border-white/5 shadow-inner`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>

            <h2 className="relative z-10 text-[32px] font-bold tracking-tight text-white mb-3 drop-shadow-sm">
              {card.value}
            </h2>

            <div className="relative z-10 flex items-center gap-2">
              <div className="flex items-center justify-center px-2 py-1 rounded-md text-[11px] font-bold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 gap-1.5 shadow-inner">
                <TrendingUp className="w-3 h-3" />
                {card.trend}
              </div>
              <span className="text-[11px] font-medium text-zinc-500 tracking-wide uppercase">
                vs last year
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}