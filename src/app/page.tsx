"use client";

import UploadZone from "@/components/UploadZone/UploadZone";
import { useFinancialData } from "@/contexts/FinancialContext";
import HeroSummary from "@/components/HeroSummary/HeroSummary";
import OverviewCards from "@/components/OverviewCards";
import RevenueChart from "@/components/RevenueChart";
import HealthScore from "@/components/HealthScore";
import InvestmentVerdict from "@/components/InvestmentVerdict/InvestmentVerdict";
import { motion } from "framer-motion";

export default function Home() {
  const { responseData, metrics } = useFinancialData();

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
      ((metrics.netIncome ?? 0) / (metrics.revenue || 1)) * 100 +
      ((metrics.cash ?? 0) / (metrics.revenue || 1)) * 100
    )
  );

  return (
    <main className="p-8 lg:p-10">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8 max-w-[1600px] mx-auto"
      >
        <section id="Hero">
          <HeroSummary metrics={metrics} investmentScore={investmentScore} />
        </section>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <OverviewCards metrics={metrics} />
            <RevenueChart metrics={metrics} />
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <HealthScore metrics={metrics} />
            <InvestmentVerdict score={investmentScore} />
          </div>
        </div>
      </motion.div>
    </main>
  );
}