import { FinancialMetrics } from "@/types/financial";
import { TrendingUp, DollarSign, BarChart3, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useFinancialData } from "@/contexts/FinancialContext";

interface Props {
  metrics: FinancialMetrics;
}

import { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function OverviewCards({ metrics }: Props) {
  const { openDrillDown } = useFinancialData();

  const cards = [
    {
      title: "Revenue",
      metric: metrics.revenue,
      value: metrics.revenue?.value ?? 0,
      trend: "+12.4%",
      icon: DollarSign,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Gross Profit",
      metric: metrics.grossProfit,
      value: metrics.grossProfit?.value ?? 0,
      trend: "+8.2%",
      icon: BarChart3,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Net Income",
      metric: metrics.netIncome,
      value: metrics.netIncome?.value ?? 0,
      trend: "+15.3%",
      icon: LineChart,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10"
    },
    {
      title: "Cash Balance",
      metric: metrics.cash,
      value: metrics.cash?.value ?? 0,
      trend: "+4.1%",
      icon: DollarSign,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            variants={itemVariants}
            key={card.title}
            onClick={() => openDrillDown({ name: card.title, metric: card.metric })}
            className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden cursor-pointer"
          >
            {/* Subtle Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                {card.title}
              </p>
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${card.bg} border border-white/5 shadow-inner group-hover:border-white/10 transition-colors`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>

            <h2 className="relative z-10 text-[32px] font-bold tracking-tight text-white mb-3 drop-shadow-sm flex items-center">
              $
              <AnimatedCounter 
                value={card.value} 
                formatter={(val) => val.toLocaleString()} 
                duration={1.5} 
              />
            </h2>

            <div className="relative z-10 flex items-center gap-2">
              <div className="flex items-center justify-center px-2 py-1 rounded-md text-[11px] font-bold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 gap-1.5 shadow-inner backdrop-blur-md">
                <TrendingUp className="w-3 h-3" />
                {card.trend}
              </div>
              <span className="text-[11px] font-medium text-zinc-500 tracking-wide uppercase">
                vs last year
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}