import { useState } from "react";
import { Download, Loader2, CheckCircle2, Circle } from "lucide-react";

export type ReportType = "executive" | "investor" | "risk" | "full";

const REPORT_TYPES = [
  {
    id: "executive",
    title: "Executive Report",
    pages: "2-3 Pages",
    sections: ["Executive Summary", "Financial Performance", "AI Intelligence"]
  },
  {
    id: "investor",
    title: "Investor Report",
    pages: "4-5 Pages",
    sections: ["Executive Summary", "Financial Performance", "Growth Analysis", "Comparative Analysis"]
  },
  {
    id: "risk",
    title: "Risk Report",
    pages: "3-4 Pages",
    sections: ["Risk Assessment", "Validation Results", "Data Completeness"]
  },
  {
    id: "full",
    title: "Full Intelligence Report",
    pages: "6-8 Pages",
    sections: ["Executive Summary", "Financial Performance", "Risk Assessment", "Growth Analysis", "AI Intelligence", "Validation Results", "Comparative Analysis"]
  }
];

interface Props {
  isExporting: boolean;
  onExport: (type: ReportType) => void;
}

export default function ExportConfig({ isExporting, onExport }: Props) {
  const [selected, setSelected] = useState<ReportType>("full");

  const currentConfig = REPORT_TYPES.find(t => t.id === selected)!;

  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6">
      <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider mb-4">Export Configuration</h2>
      
      <div className="space-y-3 mb-6">
        {REPORT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelected(type.id as ReportType)}
            className={`w-full flex items-center justify-between p-3 rounded border text-left transition-colors ${
              selected === type.id 
                ? 'bg-indigo-500/10 border-indigo-500/50' 
                : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div>
              <p className={`text-sm font-semibold ${selected === type.id ? 'text-indigo-400' : 'text-zinc-300'}`}>{type.title}</p>
              <p className="text-xs text-zinc-500">{type.pages}</p>
            </div>
            {selected === type.id ? (
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            ) : (
              <Circle className="w-5 h-5 text-zinc-600" />
            )}
          </button>
        ))}
      </div>

      <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Included Sections</h3>
        <ul className="space-y-2">
          {currentConfig.sections.map((sec, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              {sec}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onExport(selected)}
        disabled={isExporting}
        className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Generate {currentConfig.title}
          </>
        )}
      </button>
    </div>
  );
}
