"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ExecutiveSummary from "@/components/ExecutiveSummary/ExecutiveSummary";
import ExportReport from "@/components/ExportReport/ExportReport";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function ReportsPage() {
  const { responseData, metrics } = useFinancialData();
  const router = useRouter();

  useEffect(() => {
    if (!responseData || !metrics) {
      router.push("/");
    }
  }, [responseData, metrics, router]);

  if (!responseData || !metrics) return null;

  return (
    <main className="p-8 lg:p-10">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8 max-w-[1600px] mx-auto"
      >
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-3 border-b border-zinc-800 pb-4">
            <FileText className="w-6 h-6 text-zinc-400" /> 
            Reporting & Export
          </h2>
          <p className="text-zinc-400 mt-2 text-sm">
            Generate executive summaries and export professional PDF reports.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <ExecutiveSummary
              company={responseData.financialData?.company ?? "Unknown"}
              revenue={metrics.revenue?.value ?? 0}
              netIncome={metrics.netIncome?.value ?? 0}
              cash={metrics.cash?.value ?? 0}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <ExportReport company={responseData.financialData?.company ?? "Unknown"}/>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
