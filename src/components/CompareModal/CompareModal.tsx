"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, CheckCircle2, Loader2, ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { UploadResponse } from "@/contexts/FinancialContext";
import { useRouter } from "next/navigation";

export default function CompareModal() {
  const { 
    isCompareModalOpen, 
    setIsCompareModalOpen,
    compareFile,
    setCompareFile,
    setCompareResponseData,
    setCompareMetrics,
    isCompareUploading,
    setIsCompareUploading,
    metrics,
    setCompareHistoricalData,
    setCompareSegmentData
  } = useFinancialData();
  
  const { addNotification } = useNotifications();
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  if (!isCompareModalOpen) return null;

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
      setCompareFile(droppedFile);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!compareFile) return;

    try {
      setIsCompareUploading(true);
      const formData = new FormData();
      formData.append("file", compareFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Upload failed:", text);
        alert(`Upload failed. The file might be too large or invalid. Error: ${text.slice(0, 100)}`);
        setIsCompareUploading(false);
        return;
      }

      const data: UploadResponse = await response.json();

      setCompareResponseData(data);

      if (data.financialData) {
        setCompareMetrics({
          ...data.financialData,
          company: data.financialData.company ?? { value: "Unknown", confidence: 0 },
          revenue: data.financialData.revenue ?? { value: 0, confidence: 0 },
          grossProfit: data.financialData.grossProfit ?? { value: 0, confidence: 0 },
          netIncome: data.financialData.netIncome ?? { value: 0, confidence: 0 },
          cash: data.financialData.cash ?? { value: 0, confidence: 0 },
        });

        if (data.historicalData) {
          setCompareHistoricalData(data.historicalData);
        }
        if (data.segmentData) {
          setCompareSegmentData(data.segmentData);
        }

        addNotification(
          "Comparison Ready",
          `Successfully analyzed ${data.financialData.company?.value} for comparison against ${metrics?.company?.value}.`,
          "compare"
        );

        setIsCompareModalOpen(false);
        router.push("/compare");
      }
    } catch (error) {
      console.error("Compare upload failed:", error);
    } finally {
      setIsCompareUploading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center pt-[5vh]">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={() => !isCompareUploading && setIsCompareModalOpen(false)}
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-violet-500" />
              Compare Competitor
            </h2>
            <button 
              onClick={() => setIsCompareModalOpen(false)}
              disabled={isCompareUploading}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-8">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative group overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
                isDragging 
                  ? 'border-violet-500 bg-violet-500/10 scale-[1.02]' 
                  : compareFile 
                    ? 'border-emerald-500/50 bg-emerald-500/5' 
                    : 'border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-zinc-500'
              } backdrop-blur-sm p-12 text-center cursor-pointer`}
            >
              <input
                type="file"
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) setCompareFile(selectedFile);
                }}
                disabled={isCompareUploading}
              />
              
              <div className="relative z-0 pointer-events-none flex flex-col items-center justify-center space-y-4">
                {isCompareUploading ? (
                  <>
                    <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">Analyzing Report...</h3>
                      <p className="text-zinc-400 mt-1">Extracting competitor data</p>
                    </div>
                  </>
                ) : compareFile ? (
                  <>
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    <div>
                      <h3 className="text-xl font-semibold text-emerald-400">Ready to Compare</h3>
                      <p className="text-zinc-300 mt-1 font-medium">{compareFile.name}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Upload Competitor PDF</h3>
                      <p className="text-zinc-400 mt-2">Upload another financial statement to generate a side-by-side comparison.</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {compareFile && !isCompareUploading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex justify-end">
                <button
                  onClick={handleUpload}
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg transition-all shadow-[0_0_20px_rgba(139,92,246,0.2)] flex items-center gap-2"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  Generate Comparison
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
