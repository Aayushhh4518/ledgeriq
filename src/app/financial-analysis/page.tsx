"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RatioAnalysis from "@/components/RatioAnalysis/RatioAnalysis";
import DuPontAnalysis from "@/components/DuPontAnalysis/DuPontAnalysis";
import EarningsQuality from "@/components/EarningsQuality/EarningsQuality";
import BenchmarkPanel from "@/components/BenchmarkPanel/BenchmarkPanel";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export default function FinancialAnalysisPage() {
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
            <FileText className="w-6 h-6 text-blue-500" /> 
            Financial Deep Dive
          </h2>
          <p className="text-zinc-400 mt-2 text-sm">
            Comprehensive analysis of ratios, earnings quality, and industry benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-4">
            <ErrorBoundary fallbackTitle="Ratio Analysis">
              <RatioAnalysis metrics={metrics} />
            </ErrorBoundary>
          </div>
          <div className="col-span-12 xl:col-span-4">
            <ErrorBoundary fallbackTitle="DuPont Analysis">
              <DuPontAnalysis metrics={metrics} />
            </ErrorBoundary>
          </div>
          <div className="col-span-12 xl:col-span-4">
            <ErrorBoundary fallbackTitle="Earnings Quality">
              <EarningsQuality metrics={metrics} />
            </ErrorBoundary>
          </div>
          <div className="col-span-12">
            <ErrorBoundary fallbackTitle="Industry Benchmarks">
              <BenchmarkPanel metrics={metrics} />
            </ErrorBoundary>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
