interface Props {
  score: number;
}

export default function InvestmentVerdict({
  score,
}: Props) {

  let verdict = "";
  let confidence = score;

  if (score >= 80) {
    verdict = "STRONG BUY";
  } else if (score >= 65) {
    verdict = "BUY";
  } else if (score >= 50) {
    verdict = "HOLD";
  } else if (score >= 35) {
    verdict = "WEAK HOLD";
  } else {
    verdict = "AVOID";
  }

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-8 relative overflow-hidden group">
      <div className={`absolute top-0 left-0 w-1 h-full ${
        score >= 80 ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]' : 
        score >= 65 ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 
        score >= 50 ? 'bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.8)]' : 
        'bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.8)]'
      }`} />
      
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-6 ml-2">
        AI Investment Verdict
      </h2>

      <div className="space-y-4 ml-2">
        <p className={`text-5xl font-black tracking-tight ${
          score >= 80 ? 'text-emerald-400' : 
          score >= 65 ? 'text-blue-400' : 
          score >= 50 ? 'text-amber-400' : 
          'text-rose-400'
        }`}>
          {verdict}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            Confidence Score:
          </p>
          <span className="text-sm font-bold text-zinc-300 bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-700/50">
            {confidence}%
          </span>
        </div>
      </div>
    </div>
  );
}