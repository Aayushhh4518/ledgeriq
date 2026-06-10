"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import StrengthsWeaknesses from "@/components/StrengthsWeaknesses/StrengthsWeaknesses";
import AIFinancialCopilot from "@/components/AIFinancialCopilot/AIFinancialCopilot";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

export default function AIInsightsPage() {
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
            <BrainCircuit className="w-6 h-6 text-violet-500" /> 
            AI Financial Intelligence
          </h2>
          <p className="text-zinc-400 mt-2 text-sm">
            LLM-powered strategic insights, strengths, weaknesses, and interactive copilot.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <StrengthsWeaknesses metrics={metrics} />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <AIFinancialCopilot 
              company={metrics.company ?? "Unknown"} 
              revenue={metrics.revenue ?? 0} 
              netIncome={metrics.netIncome ?? 0} 
            />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
