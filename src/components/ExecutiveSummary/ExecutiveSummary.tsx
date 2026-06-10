interface ExecutiveSummaryProps {
  company: string;
  revenue: number;
  netIncome: number;
  cash: number;
}

export default function ExecutiveSummary({
  company,
  revenue,
  netIncome,
  cash,
}: ExecutiveSummaryProps) {
  const margin = ((netIncome / revenue) * 100).toFixed(1);

  return (
    <div className="group relative bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-8 relative overflow-hidden group">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">
        Executive Summary
      </h2>

      <div className="space-y-4">
        <p className="leading-relaxed text-zinc-400 text-sm">
          <strong className="text-white font-semibold">{company}</strong> reported revenue of{" "}
          <strong className="text-white font-semibold">${revenue.toLocaleString()}</strong> and net income of{" "}
          <strong className="text-white font-semibold">${netIncome.toLocaleString()}</strong>.
        </p>

        <p className="leading-relaxed text-zinc-400 text-sm">
          The company achieved a net profit margin of{" "}
          <strong className="text-white font-semibold">{margin}%</strong>, indicating strong profitability.
        </p>

        <p className="leading-relaxed text-zinc-400 text-sm">
          Cash reserves stand at{" "}
          <strong className="text-white font-semibold">${cash.toLocaleString()}</strong>, providing healthy liquidity.
        </p>

        <p className="leading-relaxed text-zinc-400 text-sm">
          Overall financial performance appears stable with low financial risk.
        </p>
      </div>
    </div>
  );
}