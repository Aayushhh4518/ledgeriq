import { ShieldAlert } from "lucide-react";

interface Props {
  metricName: string;
  expectedSection: string;
  suggestion?: string;
}

export function MissingDataCard({ metricName, expectedSection, suggestion }: Props) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
        <ShieldAlert className="w-6 h-6 text-zinc-500" />
      </div>
      <h2 className="text-base font-semibold tracking-tight text-zinc-300 mb-1">Missing {metricName}</h2>
      <p className="text-sm text-zinc-500 max-w-sm mb-2">
        This value could not be reliably extracted from the <strong>{expectedSection}</strong> section of the uploaded document.
      </p>
      {suggestion && (
        <p className="text-xs text-indigo-400/80 bg-indigo-500/10 px-3 py-1.5 rounded-full mt-2">
          {suggestion}
        </p>
      )}
    </div>
  );
}
