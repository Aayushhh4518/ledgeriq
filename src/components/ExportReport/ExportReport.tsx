import { Download } from "lucide-react";

interface ExportReportProps {
  company: string;
}

export default function ExportReport({
  company,
}: ExportReportProps) {

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-2">
        Export Analysis Report
      </h2>

      <p className="text-sm text-zinc-500 mb-6 max-w-sm">
        Download a comprehensive, printable PDF report of the financial analysis for {company}.
      </p>

      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 rounded-lg font-medium transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        <Download className="w-4 h-4" />
        Export as PDF
      </button>
    </div>
  );
}