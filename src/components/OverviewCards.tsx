import { FinancialMetrics } from "@/types/financial";

interface Props {
  metrics: FinancialMetrics;
}

export default function OverviewCards({ metrics }: Props) {
  const cards = [
    {
      title: "Revenue",
      value: `$${(metrics.revenue ?? 0).toLocaleString()}`
    },
    {
      title: "Gross Profit",
      value: `$${(metrics.grossProfit ?? 0).toLocaleString()}`
    },
    {
      title: "Net Income",
      value: `$${(metrics.netIncome ?? 0).toLocaleString()}`
    },
    {
      title: "Cash",
      value: `$${(metrics.cash ?? 0).toLocaleString()}`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="border rounded-xl p-5 bg-zinc-900 shadow-lg"
        >
          <p className="text-gray-400 text-sm">
            {card.title}
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}