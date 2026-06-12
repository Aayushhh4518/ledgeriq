"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GrowthAnalysis from "@/components/GrowthAnalysis/GrowthAnalysis";
import SegmentAnalysis from "@/components/SegmentAnalysis/SegmentAnalysis";
import ScenarioSimulator from "@/components/ScenarioSimulator/ScenarioSimulator";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";

const TrendAnalysis = dynamic(() => import("@/components/TrendAnalysis/TrendAnalysis"), { 
  ssr: false, 
  loading: () => <SkeletonLoader className="w-full h-80" /> 
});
const SegmentPieChart = dynamic(() => import("@/components/SegmentPieChart/SegmentPieChart"), { 
  ssr: false, 
  loading: () => <SkeletonLoader className="w-full h-80" /> 
});

export default function GrowthAnalysisPage() {
  const { responseData, metrics, historicalData, segmentData } = useFinancialData();
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
            <TrendingUp className="w-6 h-6 text-emerald-500" /> 
            Growth & Segments
          </h2>
          <p className="text-zinc-400 mt-2 text-sm">
            Analyze historical growth trends, segment contributions, and forecast future performance.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-4 space-y-6">
            {historicalData && (
              <>
                <GrowthAnalysis
                  revenueGrowth={historicalData.revenue.growth}
                  netIncomeGrowth={historicalData.netIncome.growth}
                />
                <TrendAnalysis
                  revenueCurrent={historicalData.revenue.current}
                  revenuePrevious={historicalData.revenue.previous}
                  netIncomeCurrent={historicalData.netIncome.current}
                  netIncomePrevious={historicalData.netIncome.previous}
                />
              </>
            )}
            <ScenarioSimulator revenue={metrics.revenue?.value ?? 0} netIncome={metrics.netIncome?.value ?? 0} />
          </div>

          <div className="col-span-12 xl:col-span-8 space-y-6">
            {segmentData && Object.keys(segmentData).length > 0 ? (
              <>
                <SegmentAnalysis data={segmentData} />
                <SegmentPieChart segmentData={segmentData} />
              </>
            ) : (
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <div className="text-zinc-500 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-zinc-300 font-semibold mb-1">Segment Breakdown Unavailable</h3>
                <p className="text-zinc-500 text-sm max-w-sm">
                  This filing did not contain parseable revenue segment structures, or the company does not report specific operating segments.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
