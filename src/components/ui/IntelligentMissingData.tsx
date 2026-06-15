import React from "react";
import { AlertCircle, HelpCircle } from "lucide-react";

interface Props {
  metricName: string;
  reason?: string;
  suggestion?: string;
}

export default function IntelligentMissingData({ metricName, reason, suggestion }: Props) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-5 flex flex-col items-center justify-center text-center min-h-[160px]">
      <AlertCircle className="w-8 h-8 text-rose-500/50 mb-3" />
      <h3 className="text-zinc-300 font-medium mb-1">{metricName} Unavailable</h3>
      <p className="text-xs text-zinc-500 max-w-xs mb-3">
        {reason || `The required data to calculate ${metricName} could not be extracted from the uploaded document.`}
      </p>
      {suggestion && (
        <div className="flex items-center gap-1.5 text-[10px] text-amber-500/80 bg-amber-500/10 px-3 py-1.5 rounded-full">
          <HelpCircle className="w-3 h-3" />
          {suggestion}
        </div>
      )}
    </div>
  );
}
