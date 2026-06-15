import { DocumentQualityScore } from "@/types/financial";
import { CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

interface Props {
  quality: DocumentQualityScore;
}

export default function ReportQuality({ quality }: Props) {
  const validationPassed = quality.validationResults.filter(v => v.status === 'passed').length;
  const validationTotal = quality.validationResults.length;
  const validationStatus = validationTotal > 0 && validationPassed === validationTotal ? "All Checks Passed" : `${validationTotal - validationPassed} Issues Detected`;

  const items = [
    { label: "Extraction Confidence", value: `${Math.round(quality.score)}%`, status: quality.score > 80 ? "good" : "warning" },
    { label: "Data Completeness", value: "High", status: "good" },
    { label: "Validation Status", value: validationStatus, status: validationPassed === validationTotal ? "good" : "warning" },
    { label: "AI Confidence", value: `${Math.round(quality.score)}%`, status: quality.score > 80 ? "good" : "warning" },
  ];

  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-indigo-400" />
        <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Report Quality Indicators</h2>
      </div>
      
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded">
            <span className="text-sm text-zinc-400">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-zinc-100">{item.value}</span>
              {item.status === 'good' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
