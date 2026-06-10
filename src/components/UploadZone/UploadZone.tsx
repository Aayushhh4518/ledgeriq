"use client";

import { useState } from "react";
import { FinancialMetrics, SegmentData } from "@/types/financial";
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

import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, Loader2 } from "lucide-react";
import HeroSummary from "../HeroSummary/HeroSummary";
import { useFinancialData } from "@/contexts/FinancialContext";
import { useSearch } from "../layout/SearchContext";

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const {
    file, setFile,
    responseData, setResponseData,
    metrics, setMetrics,
    historicalData, setHistoricalData,
    segmentData, setSegmentData,
    isUploading, setIsUploading
  } = useFinancialData();
  const { searchQuery } = useSearch();

  const lowerQuery = searchQuery.toLowerCase();
  const matches = (keywords: string[]) => {
    if (!lowerQuery) return true;
    return keywords.some(k => k.toLowerCase().includes(lowerQuery));
  };

  const showDashboard = matches(["dashboard", "overview", "revenue", "health", "verdict"]);
  const showFinancial = matches(["financial", "ratio", "dupont", "liquidity", "earnings", "benchmark", "deep dive"]);
  const showRisk = matches(["risk", "simulation", "scenario", "concentration"]);
  const showGrowth = matches(["growth", "segments", "trend", "pie"]);
  const showAI = matches(["ai", "insights", "copilot", "strengths", "weaknesses"]);
  const showReports = matches(["reports", "export", "summary", "reporting"]);

  const investmentScore = metrics
    ? Math.min(
        100,
        Math.round(
          ((metrics.netIncome ?? 0) / (metrics.revenue || 1)) * 100 +
          ((metrics.cash ?? 0) / (metrics.revenue || 1)) * 100
        )
      )
    : 0;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Please upload a PDF file.");
    }
  };

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
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
      {!responseData && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mt-12"
        >
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative group overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
              isDragging 
                ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' 
                : file 
                  ? 'border-emerald-500/50 bg-emerald-500/5' 
                  : 'border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-zinc-500'
            } backdrop-blur-sm p-12 text-center cursor-pointer`}
          >
            <input
              type="file"
              accept=".pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              suppressHydrationWarning
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) setFile(selectedFile);
              }}
              disabled={isUploading}
            />
            
            <div className="relative z-0 pointer-events-none flex flex-col items-center justify-center space-y-4">
              {isUploading ? (
                <>
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Analyzing Report...</h3>
                    <p className="text-zinc-400 mt-1">Our AI is extracting financial data</p>
                  </div>
                </>
              ) : file ? (
                <>
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-400">Ready to Analyze</h3>
                    <p className="text-zinc-300 mt-1 font-medium">{file.name}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Upload Financial Statement</h3>
                    <p className="text-zinc-400 mt-2">Drag and drop your PDF here, or click to browse</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {file && !isUploading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex justify-center">
              <button
                onClick={handleUpload}
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Generate Analysis
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Skeletons */}
      <AnimatePresence>
        {isUploading && !responseData && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto grid grid-cols-12 gap-6 mt-12"
          >
             <div className="col-span-12 h-40 bg-zinc-900/50 rounded-xl animate-pulse" />
             <div className="col-span-12 lg:col-span-8 h-96 bg-zinc-900/50 rounded-xl animate-pulse" />
             <div className="col-span-12 lg:col-span-4 h-96 bg-zinc-900/50 rounded-xl animate-pulse" />
             <div className="col-span-12 h-64 bg-zinc-900/50 rounded-xl animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}