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
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6">
        Industry Benchmark
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {benchmarks.map((item) => (
          <div
            key={item.company}
            className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center"
          >
            <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-2">
              {item.company}
            </p>
            <p className="text-2xl font-bold tracking-tight text-white">
              {item.margin}%
            </p>
          </div>
        ))}

        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors flex flex-col justify-center shadow-[inset_0_0_20px_rgba(37,99,235,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 blur-xl rounded-full" />
          <p className="text-xs font-semibold tracking-wider text-blue-400 uppercase mb-2 relative z-10">Target Co.</p>
          <p className="text-2xl font-bold tracking-tight text-blue-500 relative z-10">
            {companyMargin.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}