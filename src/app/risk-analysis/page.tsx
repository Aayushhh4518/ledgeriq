"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RiskPanel from "@/components/RiskPanel";
import LiquidityPanel from "@/components/LiquidityPanel/LiquidityPanel";
import RevenueConcentration from "@/components/RevenueConcentration/RevenueConcentration";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export default function RiskAnalysisPage() {
  const { responseData, metrics, segmentData } = useFinancialData();
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
            <ShieldAlert className="w-6 h-6 text-rose-500" /> 
            Risk Assessment & Simulation
          </h2>
          <p className="text-zinc-400 mt-2 text-sm">
            Evaluate enterprise liquidity, solvency, and revenue concentration risks.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <ErrorBoundary fallbackTitle="Risk Assessment">
              <RiskPanel metrics={metrics} />
            </ErrorBoundary>
            <ErrorBoundary fallbackTitle="Liquidity Profile">
              <LiquidityPanel metrics={metrics} />
            </ErrorBoundary>
          </div>
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {segmentData && Object.keys(segmentData).length > 0 ? (
              <ErrorBoundary fallbackTitle="Revenue Concentration">
                <RevenueConcentration segmentData={segmentData} />
              </ErrorBoundary>
            ) : (
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <div className="text-zinc-500 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-zinc-300 font-semibold mb-1">Concentration Risk Unavailable</h3>
                <p className="text-zinc-500 text-sm max-w-sm">
                  Without parsed operating segments, revenue concentration risk cannot be accurately calculated.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
