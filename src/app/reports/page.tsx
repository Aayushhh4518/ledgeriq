"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FileText } from "lucide-react";
import { generateExecutiveIntelligence } from "@/lib/analysis/insights";

import ReportPreview from "@/components/Reporting/ReportPreview";
import ReportQuality from "@/components/Reporting/ReportQuality";
import ExportHistory from "@/components/Reporting/ExportHistory";
import ExportReport from "@/components/ExportReport/ExportReport";

export default function ReportsPage() {
  const { responseData, metrics } = useFinancialData();
  const router = useRouter();

  useEffect(() => {
    if (!responseData || !metrics) {
      router.push("/");
    }
  }, [responseData, metrics, router]);

  const intelligence = useMemo(() => {
    if (!metrics || !responseData?.historicalData || !responseData?.documentQuality) return null;
    return generateExecutiveIntelligence(metrics, responseData.historicalData, responseData.documentQuality);
  }, [metrics, responseData]);

  if (!responseData || !metrics || !intelligence || !responseData.documentQuality) return null;

  return (
    <main className="p-6 lg:p-8 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <FileText className="w-6 h-6 text-indigo-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-100 uppercase">Executive Reporting Center</h1>
            <p className="text-zinc-500 text-xs font-mono mt-1">GENERATE DYNAMIC FINANCIAL REPORTS</p>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Left Column (Report Preview) */}
          <div className="xl:col-span-8 h-[800px] xl:h-[900px]">
            <ReportPreview metrics={metrics} intelligence={intelligence} />
          </div>

          {/* Right Column (Controls) */}
          <div className="xl:col-span-4 space-y-6 flex flex-col">
            <ExportReport />
            <ReportQuality quality={responseData.documentQuality} />
            <ExportHistory />
          </div>

        </div>
      </div>
    </main>
  );
}
