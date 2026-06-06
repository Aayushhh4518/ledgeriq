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
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Executive Summary
      </h2>

      <p className="leading-8 text-gray-300">
        <strong>{company}</strong> reported revenue of{" "}
        <strong>${revenue.toLocaleString()}</strong> and net income of{" "}
        <strong>${netIncome.toLocaleString()}</strong>.
      </p>

      <p className="leading-8 text-gray-300 mt-2">
        The company achieved a net profit margin of{" "}
        <strong>{margin}%</strong>, indicating strong profitability.
      </p>

      <p className="leading-8 text-gray-300 mt-2">
        Cash reserves stand at{" "}
        <strong>${cash.toLocaleString()}</strong>, providing healthy liquidity.
      </p>

      <p className="leading-8 text-gray-300 mt-2">
        Overall financial performance appears stable with low financial risk.
      </p>
    </div>
  );
}