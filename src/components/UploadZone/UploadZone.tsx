"use client";

import { useState } from "react";
import OverviewCards from "../OverviewCards";
import { FinancialMetrics, SegmentData } from "@/types/financial";
import RevenueChart from "../RevenueChart";
import HealthScore from "../HealthScore";
import RiskPanel from "../RiskPanel";
import ExecutiveSummary from "@/components/ExecutiveSummary/ExecutiveSummary";
import RatioAnalysis from "@/components/RatioAnalysis/RatioAnalysis";
import GrowthAnalysis from "@/components/GrowthAnalysis/GrowthAnalysis";
import SegmentAnalysis from "../SegmentAnalysis/SegmentAnalysis";
import SegmentPieChart from "@/components/SegmentPieChart/SegmentPieChart";
import RevenueConcentration from "@/components/RevenueConcentration/RevenueConcentration";
import DuPontAnalysis from "@/components/DuPontAnalysis/DuPontAnalysis";
import LiquidityPanel from "@/components/LiquidityPanel/LiquidityPanel";
import EarningsQuality from "@/components/EarningsQuality/EarningsQuality";
import StrengthsWeaknesses from "@/components/StrengthsWeaknesses/StrengthsWeaknesses";
import InvestmentVerdict from "@/components/InvestmentVerdict/InvestmentVerdict";
import BenchmarkPanel from "@/components/BenchmarkPanel/BenchmarkPanel";
import TrendAnalysis from "@/components/TrendAnalysis/TrendAnalysis";
import ScenarioSimulator from "@/components/ScenarioSimulator/ScenarioSimulator";
import AIFinancialCopilot from "@/components/AIFinancialCopilot/AIFinancialCopilot";
import ExportReport from "@/components/ExportReport/ExportReport";
interface FinancialData {
  company?: string;
  revenue?: number;
  grossProfit?: number;
  netIncome?: number;
  cash?: number;
}

interface UploadResponse {
  fileName: string;
  fileSize: number;
  fileType: string;
  textLength?: number;
  textPreview?: string;

  financialData?: FinancialData;

  historicalData?: {
    revenue: {
      current: number;
      previous: number;
    };

    netIncome: {
      current: number;
      previous: number;
    };
  };
  segmentData?: SegmentData;
}

export default function UploadZone() {
  const [file, setFile] = useState<File | null>(null);
  const [responseData, setResponseData] =
    useState<UploadResponse | null>(null);

  const [metrics, setMetrics] =
    useState<FinancialMetrics | null>(null);

  const [historicalData, setHistoricalData] =
    useState<UploadResponse["historicalData"] | null>(null);

  const [segmentData, setSegmentData] = 
    useState<SegmentData | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const investmentScore =
  metrics
    ? Math.min(
        100,
        Math.round(
          ((metrics.netIncome ?? 0) / (metrics.revenue || 1)) * 100 +
          ((metrics.cash ?? 0) / (metrics.revenue || 1)) * 100
        )
      )
    : 0;
   const [sentimentScore, setSentimentScore] = useState<number | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data: UploadResponse = await response.json();

      console.log(
        JSON.stringify(data, null, 2)
      );
      console.log(data.financialData);

      setResponseData(data);

      if (data.financialData) {
        setMetrics({
          ...data.financialData,
          company: data.financialData.company ?? "Unknown",
          revenue: data.financialData.revenue ?? 0,
          grossProfit: data.financialData.grossProfit ?? 0,
          netIncome: data.financialData.netIncome ?? 0,
          cash: data.financialData.cash ?? 0,
        });

        if (data.historicalData) {
          setHistoricalData(data.historicalData);
        } 
        if (data.segmentData) {
          setSegmentData(data.segmentData);
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border rounded-lg p-8">
      <h2 className="text-xl font-semibold mb-4">
        Upload Financial Statement
      </h2>

      <input
        type="file"
        accept=".pdf"
        suppressHydrationWarning
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];

          if (selectedFile) {
            setFile(selectedFile);
          }
        }}
      />

      {file && (
        <p className="mt-4">
          Selected: {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="mt-4 border px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {isUploading ? "Uploading..." : "Upload PDF"}
      </button>

      {responseData && (
        <div className="mt-6 border rounded-lg p-6 space-y-12">
          {metrics && (
            <div id="Dashboard" className="space-y-6 scroll-mt-24">
              <h3 className="text-2xl font-bold border-b border-zinc-800 pb-2">Dashboard</h3>
              <OverviewCards metrics={metrics} />
              <RevenueChart metrics={metrics} />
              <HealthScore metrics={metrics}/>
            </div>
          )}

          {metrics && (
            <div id="Financial Analysis" className="space-y-6 pt-6 scroll-mt-24">
              <h3 className="text-2xl font-bold border-b border-zinc-800 pb-2">Financial Analysis</h3>
              <RatioAnalysis metrics={metrics} />
              <DuPontAnalysis metrics={metrics} />
              <LiquidityPanel metrics={metrics} />
              <EarningsQuality metrics={metrics} />
              <BenchmarkPanel
                companyMargin={
                  ((metrics.netIncome ?? 0) / (metrics.revenue || 1)) * 100
                }
              />
              <InvestmentVerdict score={investmentScore} />
              {historicalData && (
                  <TrendAnalysis
                    revenueCurrent={historicalData.revenue.current}
                    revenuePrevious={historicalData.revenue.previous}
                    netIncomeCurrent={historicalData.netIncome.current}
                    netIncomePrevious={historicalData.netIncome.previous}
                  />
              )}
              <ScenarioSimulator
                revenue={metrics.revenue ?? 0}
                netIncome={metrics.netIncome ?? 0}
              />
            </div>
          )}

          {(metrics || (segmentData && metrics)) && (
            <div id="Risk Analysis" className="space-y-6 pt-6 scroll-mt-24">
              <h3 className="text-2xl font-bold border-b border-zinc-800 pb-2">Risk Analysis</h3>
              {metrics && <RiskPanel metrics={metrics}/>}
              {segmentData && metrics && (
                <RevenueConcentration
                    totalRevenue={metrics.revenue ?? 0}
                    segmentData={segmentData}
                  />
              )}
            </div>
          )}

          {historicalData && (
            <div id="Growth Analysis" className="space-y-6 pt-6 scroll-mt-24">
              <h3 className="text-2xl font-bold border-b border-zinc-800 pb-2">Growth Analysis</h3>
              <GrowthAnalysis
                revenueCurrent={historicalData.revenue.current}
                revenuePrevious={historicalData.revenue.previous}
                netIncomeCurrent={historicalData.netIncome.current}
                netIncomePrevious={historicalData.netIncome.previous}
              />
              {segmentData && (
                <>
                  <SegmentAnalysis data={segmentData}/>
                  <SegmentPieChart segmentData={segmentData} />
                </>
              )}
            </div>
          )}

          {metrics && (
            <div id="AI Insights" className="space-y-6 pt-6 scroll-mt-24">
              <h3 className="text-2xl font-bold border-b border-zinc-800 pb-2">AI Insights</h3>
              <StrengthsWeaknesses metrics={metrics} />
              <AIFinancialCopilot
                company={metrics.company ?? "Unknown"}
                revenue={metrics.revenue ?? 0}
                netIncome={metrics.netIncome ?? 0}
              />
            </div>
          )}

          {responseData && (
            <div id="Reports" className="space-y-6 pt-6 scroll-mt-24">
              <h3 className="text-2xl font-bold border-b border-zinc-800 pb-2">Reports</h3>
              <ExecutiveSummary
                company={responseData.financialData?.company ?? "Unknown"}
                revenue={responseData.financialData?.revenue ?? 0}
                netIncome={responseData.financialData?.netIncome ?? 0}
                cash={responseData.financialData?.cash ?? 0}
              />
              <ExportReport company={responseData.financialData?.company ?? "Unknown"}/>
            </div>
          )}

          <div className="mt-12 pt-12 border-t border-zinc-800">
            <h3 className="font-semibold text-lg mb-4">
              Extraction Result
            </h3>

            <p>
              <strong>File:</strong> {responseData.fileName}
            </p>

            <p>
              <strong>Characters Extracted:</strong>{" "}
              {responseData.textLength}
            </p>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">
                Preview
              </h4>

              <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
                {responseData.textPreview}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}