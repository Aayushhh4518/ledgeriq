interface Props {
  score: number;
}

export default function InvestmentVerdict({
  score,
}: Props) {

  let verdict = "";
  const confidence = score;

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
    <div className="group relative bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a0a0a]/60 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Analyst Glowing Left Border */}
      <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors duration-500 ${
        score >= 80 ? 'bg-emerald-500 shadow-[0_0_24px_rgba(16,185,129,1)]' : 
        score >= 65 ? 'bg-blue-500 shadow-[0_0_24px_rgba(59,130,246,1)]' : 
        score >= 50 ? 'bg-amber-500 shadow-[0_0_24px_rgba(245,158,11,1)]' : 
        'bg-rose-500 shadow-[0_0_24px_rgba(244,63,94,1)]'
      }`} />
      
      <div className="ml-4 relative z-10 flex flex-col h-full justify-between">
        <h2 className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-8">
          Analyst Consensus
        </h2>

        <div className="space-y-6">
          <div className="inline-block">
            <p className={`text-5xl font-black tracking-tight leading-none drop-shadow-md ${
              score >= 80 ? 'text-emerald-400' : 
              score >= 65 ? 'text-blue-400' : 
              score >= 50 ? 'text-amber-400' : 
              'text-rose-400'
            }`}>
              {verdict}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
              Confidence Index
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden border border-white/[0.05]">
                <div 
                  className={`h-full rounded-full ${
                    score >= 80 ? 'bg-emerald-500' : 
                    score >= 65 ? 'bg-blue-500' : 
                    score >= 50 ? 'bg-amber-500' : 
                    'bg-rose-500'
                  }`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <span className="text-sm font-bold text-white font-mono tracking-wide">
                {confidence}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}