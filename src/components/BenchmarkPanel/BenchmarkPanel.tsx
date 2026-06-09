interface Props {
  companyMargin: number;
}

export default function BenchmarkPanel({
  companyMargin,
}: Props) {

  const benchmarks = [
    {
      company: "Apple",
      margin: 29,
    },
    {
      company: "Microsoft",
      margin: 36,
    },
    {
      company: "Google",
      margin: 25,
    },
    {
      company: "Amazon",
      margin: 9,
    },
  ];

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Industry Benchmark
      </h2>

      <div className="grid md:grid-cols-4 gap-4">
        {benchmarks.map((item) => (
          <div
            key={item.company}
            className="bg-slate-800 rounded-lg p-4"
          >
            <p className="text-gray-400">
              {item.company}
            </p>

            <p className="text-2xl font-bold">
              {item.margin}%
            </p>
          </div>
        ))}

        <div className="bg-green-900 rounded-lg p-4">
          <p>Your Company</p>

          <p className="text-2xl font-bold">
            {companyMargin.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}