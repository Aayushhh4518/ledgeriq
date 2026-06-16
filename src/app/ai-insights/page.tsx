"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import AIFinancialCopilot from "@/components/AIFinancialCopilot/AIFinancialCopilot";
import { Brain } from "lucide-react";
import { generateExecutiveIntelligence } from "@/lib/analysis/insights";
import ExecutiveSummary from "@/components/AIInsights/ExecutiveSummary";
import AISignals from "@/components/AIInsights/AISignals";
import InvestmentView from "@/components/AIInsights/InvestmentView";
import HealthBreakdown from "@/components/AIInsights/HealthBreakdown";
import OpportunitiesAndFlags from "@/components/AIInsights/OpportunitiesAndFlags";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export default function AIInsightsPage() {
  const { responseData, metrics } = useFinancialData();
  const router = useRouter();

  useEffect(() => {
    if (!responseData || !metrics) {
      router.push("/");
    }
  }, [responseData, metrics, router]);

  const intelligence = useMemo(() => {
    if (!metrics || !responseData?.historicalData || !responseData?.documentQuality) return null;
    return generateExecutiveIntelligence(metrics, responseData.historicalData, responseData.documentQuality);
  }, [metrics, responseData]);

  if (!responseData || !metrics || !intelligence) return null;

  return (
    <main className="p-6 lg:p-8 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <Brain className="w-6 h-6 text-indigo-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-100 uppercase">Explainable Intelligence System</h1>
            <p className="text-zinc-500 text-xs font-mono mt-1">METRIC-BACKED ANALYSIS AND RECOMMENDATIONS</p>
          </div>
        </header>

        {/* Top Level Summary */}
        <ErrorBoundary fallbackTitle="Executive Summary">
          <ExecutiveSummary 
            summary={intelligence.summary} 
            companyName={metrics.company?.value || "The company"} 
          />
        </ErrorBoundary>

        {/* 5-Factor Signals */}
        <ErrorBoundary fallbackTitle="AI Signals">
          <AISignals signals={intelligence.signals} />
        </ErrorBoundary>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Left Column (Core Views) */}
          <div className="xl:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ErrorBoundary fallbackTitle="Investment View">
                  <InvestmentView 
                    recommendation={intelligence.recommendation} 
                    drivers={intelligence.drivers} 
                  />
                </ErrorBoundary>
              </div>
              <div className="md:col-span-1">
                <ErrorBoundary fallbackTitle="Health Breakdown">
                  <HealthBreakdown 
                    breakdown={intelligence.healthBreakdown} 
                    finalScore={intelligence.summary.confidenceScore} 
                  />
                </ErrorBoundary>
              </div>
            </div>

            <ErrorBoundary fallbackTitle="Opportunities & Risks">
              <OpportunitiesAndFlags 
                opportunities={intelligence.opportunities} 
                redFlags={intelligence.redFlags} 
                insights={intelligence.insights} 
              />
            </ErrorBoundary>
          </div>

          {/* Right Column (Copilot Sidebar) */}
          <div className="xl:col-span-4 flex flex-col h-[800px] xl:h-auto">
            <ErrorBoundary fallbackTitle="Financial Copilot">
              <AIFinancialCopilot 
                company={metrics.company?.value ?? "Unknown"} 
                revenue={metrics.revenue?.value !== undefined ? `$${metrics.revenue.value.toLocaleString()}` : "N/A"} 
                netIncome={metrics.netIncome?.value !== undefined ? `$${metrics.netIncome.value.toLocaleString()}` : "N/A"} 
                intelligence={intelligence}
              />
            </ErrorBoundary>
          </div>

        </div>

      </div>
    </main>
  );
}
