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
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
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

      if (!response.ok) {
        const text = await response.text();
        console.error("Upload failed:", text);
        alert(`Upload failed. The file might be too large or invalid. Error: ${text.slice(0, 100)}`);
        setIsUploading(false);
        return;
      }

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
          className="max-w-2xl mx-auto mt-16"
        >
          <div className="relative group">
            {/* Animated Glow Behind Dropzone */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 ${isDragging ? 'opacity-40 blur-md' : ''}`} />
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                isDragging 
                  ? 'border-indigo-500 bg-indigo-500/[0.03] scale-[1.02] shadow-[0_0_40px_rgba(99,102,241,0.2)]' 
                  : file 
                    ? 'border-emerald-500/50 bg-emerald-500/[0.02] shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
                    : 'border-white/5 bg-[#0a0a0a]/50 hover:bg-[#0a0a0a]/60 hover:border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
              } backdrop-blur-2xl p-14 text-center cursor-pointer flex flex-col items-center justify-center min-h-[320px]`}
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
              
              <div className="relative z-0 pointer-events-none flex flex-col items-center justify-center space-y-5">
                {isUploading ? (
                  <>
                    <div className="relative flex items-center justify-center w-16 h-16 mb-2">
                      <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
                      <Loader2 className="w-6 h-6 text-indigo-400 absolute opacity-0" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white">Analyzing Intelligence...</h3>
                      <p className="text-sm text-zinc-400 mt-2 font-medium">Extracting multi-dimensional financial signals</p>
                    </div>
                  </>
                ) : file ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-white">Ready for Extraction</h3>
                    <p className="text-sm text-zinc-300 mt-2 font-mono tracking-tight bg-white/5 px-3 py-1 rounded-md border border-white/10">{file.name}</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl flex items-center justify-center mb-2 group-hover:-translate-y-2 transition-transform duration-500 shadow-inner">
                      <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-indigo-400 transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white">Upload Financial Statement</h3>
                      <p className="text-[13px] text-zinc-400 mt-2 font-medium">Drag & drop your SEC filing, 10-K, or PDF report here</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {file && !isUploading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpload}
                className="px-8 py-3.5 bg-white text-black font-bold tracking-wide rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Initialize Financial Extraction
              </motion.button>
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
             <SkeletonLoader className="col-span-12 h-40" />
             <SkeletonLoader className="col-span-12 lg:col-span-8 h-96" />
             <SkeletonLoader className="col-span-12 lg:col-span-4 h-96" />
             <SkeletonLoader className="col-span-12 h-64" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}