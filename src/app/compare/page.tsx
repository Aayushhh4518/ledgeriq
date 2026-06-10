"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ComparePanel from "@/components/ComparePanel/ComparePanel";
import { ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ComparePage() {
  const { metrics, compareMetrics } = useFinancialData();
  const router = useRouter();

  useEffect(() => {
    if (!metrics || !compareMetrics) {
      router.push("/");
    }
  }, [metrics, compareMetrics, router]);

  if (!metrics || !compareMetrics) return null;

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
            <ArrowLeftRight className="w-6 h-6 text-violet-500" /> 
            Competitor Comparison
          </h2>
          <p className="text-zinc-400 mt-2 text-sm">
            Side-by-side analysis of key financial metrics, health scores, and risk factors.
          </p>
        </div>

        <ComparePanel metrics1={metrics} metrics2={compareMetrics} />
      </motion.div>
    </main>
  );
}
