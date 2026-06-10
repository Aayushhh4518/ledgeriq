"use client";

import { Download, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useFinancialData } from "@/contexts/FinancialContext";
import { useNotifications } from "@/contexts/NotificationContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// We import the key panels to render them off-screen for the PDF
import HeroSummary from "../HeroSummary/HeroSummary";
import OverviewCards from "../OverviewCards";
import RevenueChart from "../RevenueChart";
import HealthScore from "../HealthScore";
import InvestmentVerdict from "../InvestmentVerdict/InvestmentVerdict";
import RiskPanel from "../RiskPanel";
import StrengthsWeaknesses from "../StrengthsWeaknesses/StrengthsWeaknesses";
import ExecutiveSummary from "../ExecutiveSummary/ExecutiveSummary";

interface ExportReportProps {
  company: string;
}

export default function ExportReport({
  company,
}: ExportReportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { metrics, responseData } = useFinancialData();
  const { addNotification } = useNotifications();
  const printRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!printRef.current || !metrics) return;
    
    setIsExporting(true);
    try {
      // Small delay to ensure Recharts animations finish if they just mounted
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // higher resolution
        useCORS: true,
        backgroundColor: "#000000",
        windowWidth: 1200,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let position = 0;
      let heightLeft = pdfHeight;
      const pageHeight = pdf.internal.pageSize.getHeight();

      // First page
      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      // Add new pages if the content is taller than A4
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${company.replace(/\s+/g, '_')}_Financial_Analysis.pdf`);
      
      addNotification(
        "Export Complete",
        `Successfully generated PDF report for ${company}.`,
        "success"
      );
    } catch (error) {
      console.error("Export failed:", error);
      addNotification("Export Failed", "There was an error generating the PDF.", "warning");
    } finally {
      setIsExporting(false);
    }
  };

  const investmentScore = metrics
    ? Math.min(
        100,
        Math.round(
          ((metrics.netIncome ?? 0) / (metrics.revenue || 1)) * 100 +
          ((metrics.cash ?? 0) / (metrics.revenue || 1)) * 100
        )
      )
    : 0;

  return (
    <>
      <div className="group relative bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100 mb-2">
          Export Analysis Report
        </h2>

        <p className="text-sm text-zinc-500 mb-6 max-w-sm">
          Download a comprehensive, printable PDF report of the financial analysis for {company}.
        </p>

        <button
          onClick={handleExport}
          disabled={isExporting || !metrics}
          className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 rounded-lg font-medium transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Export as PDF
            </>
          )}
        </button>
      </div>

      {/* Hidden layout purely for PDF generation */}
      {metrics && (
        <div className="absolute left-[-9999px] top-[-9999px] w-[1200px] bg-black text-white p-12">
          <div ref={printRef} className="space-y-12 bg-black pb-12">
            
            {/* Report Header */}
            <div className="border-b border-zinc-800 pb-8 text-center">
              <h1 className="text-4xl font-bold mb-2">LedgerIQ Financial Report</h1>
              <p className="text-xl text-zinc-400">Comprehensive AI Analysis for {company}</p>
            </div>

            <HeroSummary metrics={metrics} investmentScore={investmentScore} />
            
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 space-y-8">
                <OverviewCards metrics={metrics} />
                <RevenueChart metrics={metrics} />
              </div>
              <div className="col-span-4 space-y-8">
                <HealthScore metrics={metrics} />
                <InvestmentVerdict score={investmentScore} />
              </div>
            </div>

            <RiskPanel metrics={metrics} />
            <StrengthsWeaknesses metrics={metrics} />
            
            <ExecutiveSummary 
              company={company} 
              revenue={metrics.revenue ?? 0} 
              netIncome={metrics.netIncome ?? 0} 
              cash={metrics.cash ?? 0} 
            />

            <div className="mt-16 pt-8 border-t border-zinc-800 text-center text-zinc-600 text-sm">
              Generated by LedgerIQ Enterprise Financial Intelligence
            </div>
          </div>
        </div>
      )}
    </>
  );
}