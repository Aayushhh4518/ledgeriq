"use client";

import UploadZone from "@/components/UploadZone/UploadZone";
import { useFinancialData } from "@/contexts/FinancialContext";
import HeroSummary from "@/components/HeroSummary/HeroSummary";
import OverviewCards from "@/components/OverviewCards";
import InvestmentVerdict from "@/components/InvestmentVerdict/InvestmentVerdict";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const RevenueChart = dynamic(() => import("@/components/RevenueChart"), { 
  ssr: false, 
  loading: () => <SkeletonLoader className="w-full h-80" /> 
});
const TrendsCharts = dynamic(() => import("@/components/TrendsCharts"), { 
  ssr: false, 
  loading: () => <SkeletonLoader className="w-full h-80" /> 
});
const HealthScore = dynamic(() => import("@/components/HealthScore"), { 
  ssr: false, 
  loading: () => <SkeletonLoader className="w-full h-64" /> 
});
const StrengthsWeaknesses = dynamic(() => import("@/components/StrengthsWeaknesses/StrengthsWeaknesses"), { 
  ssr: false, 
  loading: () => <SkeletonLoader className="w-full h-80" /> 
});

export default function Home() {
  const { responseData, metrics, historicalData } = useFinancialData();

  if (!responseData || !metrics) {
    return (
      <main className="p-10 min-h-screen">
        <UploadZone />
      </main>
    );
  }

  const investmentScore = Math.min(
    100,
    Math.round(
      ((metrics.netIncome?.value ?? 0) / (metrics.revenue?.value || 1)) * 100 +
      ((metrics.cash?.value ?? 0) / (metrics.revenue?.value || 1)) * 100
    )
  );

  return (
    <main className="p-4 lg:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4 max-w-[1600px] mx-auto"
      >
        <section id="Hero">
          <ErrorBoundary fallbackTitle="Overview Summary">
            <HeroSummary metrics={metrics} investmentScore={investmentScore} />
          </ErrorBoundary>
        </section>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <ErrorBoundary fallbackTitle="Key Metrics">
              <OverviewCards metrics={metrics} />
            </ErrorBoundary>
            <ErrorBoundary fallbackTitle="Revenue Chart">
              <RevenueChart metrics={metrics} />
            </ErrorBoundary>
            {historicalData && historicalData.isValid && (
              <ErrorBoundary fallbackTitle="Historical Trends">
                <TrendsCharts historicalData={historicalData} />
              </ErrorBoundary>
            )}
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <ErrorBoundary fallbackTitle="Health Score">
              <HealthScore metrics={metrics} />
            </ErrorBoundary>
            <ErrorBoundary fallbackTitle="Investment Verdict">
              <InvestmentVerdict score={investmentScore} />
            </ErrorBoundary>
          </div>
        </div>

        {/* Strategic Insights Section */}
        <section id="StrategicInsights" className="w-full pt-4">
          <ErrorBoundary fallbackTitle="Strategic Insights">
            <StrengthsWeaknesses metrics={metrics} />
          </ErrorBoundary>
        </section>
      </motion.div>
    </main>
  );
}