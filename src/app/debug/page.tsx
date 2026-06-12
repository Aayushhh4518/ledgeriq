"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { Terminal, Database, FileText, Percent, AlertCircle, CheckCircle2 } from "lucide-react";

export default function DebugPage() {
  const { responseData } = useFinancialData();

  if (!responseData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-mono">
        <h1 className="text-2xl mb-4 text-zinc-400">Extraction Debugger</h1>
        <p className="text-zinc-600">No data loaded. Please upload a filing from the main dashboard first.</p>
      </div>
    );
  }

  const { financialData, extractionConfidence, historicalData, segmentData, missingFields } = responseData;

  const renderMetricRaw = (label: string, metric: any) => {
    return (
      <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50 mb-2 font-mono text-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-zinc-300 font-bold">{label}</span>
          {metric?.value !== undefined ? (
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20 text-xs">Extracted</span>
          ) : (
            <span className="px-2 py-1 bg-rose-500/10 text-rose-400 rounded-md border border-rose-500/20 text-xs">Missing</span>
          )}
        </div>
        {metric?.value !== undefined && (
          <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
            <div>Value: <span className="text-white">{metric.value.toLocaleString()}</span></div>
            <div>Confidence: <span className="text-white">{metric.confidence}%</span></div>
            <div>Document: <span className="text-white truncate block">{metric.sourceDocument || 'N/A'}</span></div>
            <div>Section: <span className="text-white truncate block">{metric.sourceSection || 'N/A'}</span></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-mono">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-3">
            <Terminal className="w-8 h-8 text-indigo-500" />
            <div>
              <h1 className="text-2xl font-bold">Extraction Debugger</h1>
              <p className="text-zinc-500 text-sm mt-1">Raw provenance and extraction state</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-zinc-500">Overall Confidence</div>
            <div className="text-3xl font-bold text-emerald-400">{extractionConfidence}%</div>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-300 border-b border-zinc-800 pb-2">Context</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 text-xs mb-1">Company</div>
              <div className="text-white">{financialData?.company || 'N/A'}</div>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 text-xs mb-1">Fiscal Year</div>
              <div className="text-white">{financialData?.fiscalYear || 'N/A'}</div>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 text-xs mb-1">Report Type</div>
              <div className="text-white">{financialData?.reportType || 'N/A'}</div>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 text-xs mb-1">Ticker</div>
              <div className="text-white">{financialData?.ticker || 'N/A'}</div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-300 border-b border-zinc-800 pb-2">Core Metrics</h2>
            {renderMetricRaw("Revenue", financialData?.revenue)}
            {renderMetricRaw("Net Income", financialData?.netIncome)}
            {renderMetricRaw("Gross Profit", financialData?.grossProfit)}
            {renderMetricRaw("Total Assets", financialData?.totalAssets)}
            {renderMetricRaw("Total Liabilities", financialData?.totalLiabilities)}
            {renderMetricRaw("Shareholder Equity", financialData?.shareholderEquity)}
            {renderMetricRaw("Cash", financialData?.cash)}
            {renderMetricRaw("Operating Cash Flow", financialData?.operatingCashFlow)}
            {renderMetricRaw("Total Debt", financialData?.totalDebt)}
          </section>
          
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-300 border-b border-zinc-800 pb-2">Historical Growth</h2>
              <pre className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-300 overflow-x-auto">
                {JSON.stringify(historicalData, null, 2)}
              </pre>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-300 border-b border-zinc-800 pb-2">Segments</h2>
              <pre className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-300 overflow-x-auto">
                {JSON.stringify(segmentData, null, 2)}
              </pre>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}
