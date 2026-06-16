"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { Terminal, AlertCircle, CheckCircle2, ShieldCheck, ShieldAlert, FileSearch } from "lucide-react";

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

  const { financialData, extractionConfidence, historicalData, segmentData, documentQuality } = responseData;

  const renderMetricRaw = (label: string, metric: { value?: number, confidence?: number, sourceSection?: string } | undefined | null) => {
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
            <div>Source: <span className="text-white truncate block">{metric.sourceSection || 'Filing Data'}</span></div>
          </div>
        )}
      </div>
    );
  };

  const renderHistoricalGrowth = (title: string, data?: { current?: number; previous?: number }) => {
    const current = data?.current;
    const previous = data?.previous;
    const growth = current !== undefined && previous !== undefined && previous !== 0
      ? ((current - previous) / Math.abs(previous)) * 100
      : undefined;

    return (
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <h3 className="text-sm font-bold text-zinc-300 mb-3">{title}</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-zinc-500">Current:</span>
            <span className="text-white font-mono">{current !== undefined ? `$${current.toLocaleString()}` : 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Previous:</span>
            <span className="text-white font-mono">{previous !== undefined ? `$${previous.toLocaleString()}` : 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-zinc-800/50">
            <span className="text-zinc-500">Growth:</span>
            {growth !== undefined ? (
              <span className={`px-2 py-0.5 rounded font-mono ${growth >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
              </span>
            ) : (
              <span className="text-zinc-500">N/A</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const segmentEntries = segmentData ? Object.entries(segmentData) : [];

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
          <div className="flex items-center gap-6 text-right">
            <div>
              <div className="text-sm text-zinc-500">Document Quality Score</div>
              <div className="text-3xl font-bold text-indigo-400">{documentQuality?.score || 0}/100</div>
            </div>
            <div>
              <div className="text-sm text-zinc-500">Overall Confidence</div>
              <div className="text-3xl font-bold text-emerald-400">{extractionConfidence}%</div>
            </div>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-300 border-b border-zinc-800 pb-2">Metadata Intelligence</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 text-xs mb-1">Company</div>
              <div className="text-white">{financialData?.company?.value || 'N/A'}</div>
              <div className="text-[10px] text-emerald-500 mt-1">{financialData?.company?.confidence ? `${financialData.company.confidence}% conf` : ''}</div>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 text-xs mb-1">Fiscal Year</div>
              <div className="text-white">{financialData?.fiscalYear?.value || 'N/A'}</div>
              <div className="text-[10px] text-emerald-500 mt-1">{financialData?.fiscalYear?.confidence ? `${financialData.fiscalYear.confidence}% conf` : ''}</div>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 text-xs mb-1">Report Type</div>
              <div className="text-white">{financialData?.reportType?.value || 'N/A'}</div>
              <div className="text-[10px] text-emerald-500 mt-1">{financialData?.reportType?.confidence ? `${financialData.reportType.confidence}% conf` : ''}</div>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <div className="text-zinc-500 text-xs mb-1">Ticker</div>
              <div className="text-white">{financialData?.ticker?.value || 'N/A'}</div>
              <div className="text-[10px] text-emerald-500 mt-1">{financialData?.ticker?.confidence ? `${financialData.ticker.confidence}% conf` : ''}</div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-300 border-b border-zinc-800 pb-2 flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-indigo-400" />
            Statement Coverage Detection
          </h2>
          <div className="flex flex-wrap gap-4">
            {documentQuality?.statementCoverage && Object.entries(documentQuality.statementCoverage).map(([key, isCovered]) => (
              <div key={key} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm ${isCovered && key !== 'missingNotes' || (!isCovered && key === 'missingNotes') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                {isCovered && key !== 'missingNotes' || (!isCovered && key === 'missingNotes') ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            ))}
          </div>
        </section>

        {documentQuality?.validationResults && documentQuality.validationResults.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-300 border-b border-zinc-800 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              Financial Validation Engine Results
            </h2>
            <div className="space-y-3">
              {documentQuality.validationResults.map((result, idx) => (
                <div key={idx} className={`p-4 rounded-xl border flex flex-col gap-2 ${
                  result.status === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-200' : 
                  result.status === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-200' :
                  'bg-emerald-500/10 border-emerald-500/20 text-emerald-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {result.status === 'error' ? <ShieldAlert className="w-5 h-5 text-rose-400" /> : 
                       result.status === 'warning' ? <AlertCircle className="w-5 h-5 text-amber-400" /> :
                       <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      <span className="font-bold text-sm uppercase tracking-wider">{result.rule}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded font-mono ${
                      result.impact < 0 ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      Impact: {result.impact} pts
                    </span>
                  </div>
                  <p className="text-sm opacity-90 ml-7">{result.message}</p>
                </div>
              ))}
            </div>
          </section>
        )}

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderHistoricalGrowth("Revenue", historicalData?.revenue)}
                {renderHistoricalGrowth("Net Income", historicalData?.netIncome)}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-300 border-b border-zinc-800 pb-2">Segments</h2>
              {segmentEntries.length > 0 ? (
                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-3">
                  {segmentEntries.map(([segment, value]) => (
                    <div key={segment} className="flex justify-between items-center border-b border-zinc-800/50 pb-2 last:border-0 last:pb-0">
                      <span className="text-zinc-300 text-sm">{segment}</span>
                      <span className="text-emerald-400 font-mono text-sm">${value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 text-center space-y-2">
                  <div className="text-zinc-400 font-bold">No Segment Information Detected</div>
                  <div className="text-zinc-600 text-xs">Business segment disclosures were not identified in the uploaded filing.</div>
                </div>
              )}
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}
