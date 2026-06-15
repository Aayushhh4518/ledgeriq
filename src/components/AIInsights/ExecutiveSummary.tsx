import { ExecutiveSummary as ExecSummaryType } from "@/lib/analysis/insights";
import { BrainCircuit } from "lucide-react";

interface Props {
  summary: ExecSummaryType;
  companyName: string;
}

export default function ExecutiveSummary({ summary }: Props) {
  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
      <div className="flex items-center gap-2 mb-4">
        <BrainCircuit className="w-5 h-5 text-indigo-400" />
        <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Executive Intelligence Summary</h2>
      </div>
      <p className="text-lg text-zinc-300 leading-relaxed font-serif">
        {summary.assessment} Primary strengths include {summary.strengths}, while key risks stem from {summary.risks}. The overall trajectory indicates {summary.trajectory.toLowerCase()}.
      </p>
    </div>
  );
}
