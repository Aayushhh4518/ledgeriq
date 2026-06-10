"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GrowthAnalysis from "@/components/GrowthAnalysis/GrowthAnalysis";
import TrendAnalysis from "@/components/TrendAnalysis/TrendAnalysis";
import SegmentAnalysis from "@/components/SegmentAnalysis/SegmentAnalysis";
import SegmentPieChart from "@/components/SegmentPieChart/SegmentPieChart";
import ScenarioSimulator from "@/components/ScenarioSimulator/ScenarioSimulator";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

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
                  revenueCurrent={historicalData.revenue.current}
                  revenuePrevious={historicalData.revenue.previous}
                  netIncomeCurrent={historicalData.netIncome.current}
                  netIncomePrevious={historicalData.netIncome.previous}
                />
                <TrendAnalysis
                  revenueCurrent={historicalData.revenue.current}
                  revenuePrevious={historicalData.revenue.previous}
                  netIncomeCurrent={historicalData.netIncome.current}
                  netIncomePrevious={historicalData.netIncome.previous}
                />
              </>
            )}
            <ScenarioSimulator revenue={metrics.revenue ?? 0} netIncome={metrics.netIncome ?? 0} />
          </div>

          <div className="col-span-12 xl:col-span-8 space-y-6">
            {segmentData && (
              <>
                <SegmentAnalysis data={segmentData} />
                <SegmentPieChart segmentData={segmentData} />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
