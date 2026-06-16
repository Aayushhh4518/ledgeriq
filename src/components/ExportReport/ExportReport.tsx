"use client";

import { useState, useRef, useMemo } from "react";
import { useFinancialData } from "@/contexts/FinancialContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { exportToPDF } from "@/utils/exportPDF";
import ExportConfig, { ReportType } from "@/components/Reporting/ExportConfig";
import { generateExecutiveIntelligence } from "@/lib/analysis/insights";

import HeroSummary from "../HeroSummary/HeroSummary";
import OverviewCards from "../OverviewCards";
import RevenueChart from "../RevenueChart";
import HealthScore from "../HealthScore";
import InvestmentVerdict from "../InvestmentVerdict/InvestmentVerdict";
import RiskPanel from "../RiskPanel";
import StrengthsWeaknesses from "../StrengthsWeaknesses/StrengthsWeaknesses";
import ExecutiveSummary from "../ExecutiveSummary/ExecutiveSummary";
import LiquidityPanel from "../LiquidityPanel/LiquidityPanel";
import DuPontAnalysis from "../DuPontAnalysis/DuPontAnalysis";
import GrowthAnalysis from "../GrowthAnalysis/GrowthAnalysis";
import BenchmarkPanel from "../BenchmarkPanel/BenchmarkPanel";
import ReportQuality from "@/components/Reporting/ReportQuality";

export default function ExportReport() {
  const [isExporting, setIsExporting] = useState(false);
  const { metrics, responseData } = useFinancialData();
  const { addNotification } = useNotifications();
  const printRef = useRef<HTMLDivElement>(null);
  const [reportType, setReportType] = useState<ReportType>("full");

  const company = responseData?.financialData?.company?.value || "Unknown";

  const handleExport = async (type: ReportType) => {
    if (!printRef.current || !metrics) return;
    
    setReportType(type);
    setIsExporting(true);
    
    try {
      // Small delay to allow react to render the specific sections before taking the snapshot
      await new Promise(r => setTimeout(r, 100));
      const element = printRef.current;
      await exportToPDF(element, `${company.replace(/\s+/g, '_')}_${type.toUpperCase()}_Report.pdf`);
      
      addNotification(
        "Export Complete",
        `Successfully generated ${type} PDF report for ${company}.`,
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
          ((metrics.netIncome?.value ?? 0) / (metrics.revenue?.value || 1)) * 100 +
          ((metrics.cash?.value ?? 0) / (metrics.revenue?.value || 1)) * 100
        )
      )
    : 0;

  const intelligence = useMemo(() => {
    if (!metrics || !responseData?.historicalData || !responseData?.documentQuality) return null;
    return generateExecutiveIntelligence(metrics, responseData.historicalData, responseData.documentQuality);
  }, [metrics, responseData]);

  const getReportTitle = () => {
    switch (reportType) {
      case "executive": return `Executive Report`;
      case "investor": return `Investor Report`;
      case "risk": return `Risk Report`;
      case "full": return `Full Intelligence Report`;
    }
  };

  return (
    <>
      <ExportConfig isExporting={isExporting} onExport={handleExport} />

      {/* Hidden layout purely for PDF generation */}
      {metrics && (
        <div className="absolute left-[-9999px] top-[-9999px] w-[1200px] bg-black text-white p-12">
          <div ref={printRef} className="space-y-12 bg-black pb-12">
            
            {/* Report Header */}
            <div className="border-b border-zinc-800 pb-8 text-center">
              <h1 className="text-4xl font-bold mb-2">LedgerIQ {getReportTitle()}</h1>
              <p className="text-xl text-zinc-400">Analysis for {company} • FY {new Date().getFullYear()}</p>
            </div>

            {/* 1. EXECUTIVE REPORT */}
            {reportType === "executive" && (
              <div className="space-y-12">
                <HeroSummary metrics={metrics} investmentScore={investmentScore} />
                <ExecutiveSummary 
                  company={company} 
                  revenue={metrics.revenue?.value ?? 0} 
                  netIncome={metrics.netIncome?.value ?? 0} 
                  cash={metrics.cash?.value ?? 0} 
                />
                <div className="grid grid-cols-2 gap-8">
                  <HealthScore metrics={metrics} />
                  <InvestmentVerdict score={investmentScore} />
                </div>
                <StrengthsWeaknesses metrics={metrics} />
                <BenchmarkPanel metrics={metrics} />
              </div>
            )}

            {/* 2. RISK REPORT */}
            {reportType === "risk" && (
              <div className="space-y-12">
                <HeroSummary metrics={metrics} investmentScore={investmentScore} />
                <div className="grid grid-cols-1 gap-8">
                  <LiquidityPanel metrics={metrics} />
                  <RiskPanel metrics={metrics} />
                </div>
                <StrengthsWeaknesses metrics={metrics} />
                
                {responseData?.documentQuality && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Validation Results & Extraction Flags</h2>
                    <ReportQuality quality={responseData.documentQuality} />
                  </div>
                )}
              </div>
            )}

            {/* 3. INVESTOR REPORT */}
            {reportType === "investor" && (
              <div className="space-y-12">
                <HeroSummary metrics={metrics} investmentScore={investmentScore} />
                <OverviewCards metrics={metrics} />
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-8">
                    <RevenueChart metrics={metrics} />
                  </div>
                  <div className="col-span-4">
                    <InvestmentVerdict score={investmentScore} />
                  </div>
                </div>
                <GrowthAnalysis 
                  revenueGrowth={responseData?.historicalData?.revenue?.growth} 
                  netIncomeGrowth={responseData?.historicalData?.netIncome?.growth} 
                />
                <DuPontAnalysis metrics={metrics} />
                <BenchmarkPanel metrics={metrics} />
                <StrengthsWeaknesses metrics={metrics} />
              </div>
            )}

            {/* 4. FULL INTELLIGENCE REPORT */}
            {reportType === "full" && (
              <div className="space-y-12">
                <HeroSummary metrics={metrics} investmentScore={investmentScore} />
                <ExecutiveSummary 
                  company={company} 
                  revenue={metrics.revenue?.value ?? 0} 
                  netIncome={metrics.netIncome?.value ?? 0} 
                  cash={metrics.cash?.value ?? 0} 
                />
                <OverviewCards metrics={metrics} />
                
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-8 space-y-8">
                    <RevenueChart metrics={metrics} />
                  </div>
                  <div className="col-span-4 space-y-8">
                    <HealthScore metrics={metrics} />
                    <InvestmentVerdict score={investmentScore} />
                  </div>
                </div>

                <GrowthAnalysis 
                  revenueGrowth={responseData?.historicalData?.revenue?.growth} 
                  netIncomeGrowth={responseData?.historicalData?.netIncome?.growth} 
                />
                <DuPontAnalysis metrics={metrics} />
                <BenchmarkPanel metrics={metrics} />
                <LiquidityPanel metrics={metrics} />
                <RiskPanel metrics={metrics} />
                <StrengthsWeaknesses metrics={metrics} />
              </div>
            )}

            <div className="mt-16 pt-8 border-t border-zinc-800 text-center text-zinc-600 text-sm">
              Generated by LedgerIQ Enterprise Financial Intelligence • {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}