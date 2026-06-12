"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, FileText, CheckCircle2, AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function MetricDrillDownModal() {
  const { drillDownMetric, closeDrillDown } = useFinancialData();

  if (!drillDownMetric) return null;

  const { name, metric, formula, underlyingMetrics } = drillDownMetric;

  const formatValue = (val?: number) => {
    if (val === undefined) return "N/A";
    // Check if it's a percentage ratio or a raw value
    if (name.includes("Margin") || name.includes("ROE") || name.includes("ROA")) {
      return `${val.toFixed(2)}%`;
    }
    if (name.includes("Ratio")) {
      return `${val.toFixed(2)}x`;
    }
    return formatCurrency(val);
  };

  const getConfidenceColor = (conf?: number) => {
    if (conf === undefined) return "text-zinc-500 bg-zinc-900/50 border-zinc-800";
    if (conf >= 80) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (conf >= 50) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-rose-400 bg-rose-500/10 border-rose-500/20";
  };

  const getConfidenceIcon = (conf?: number) => {
    if (conf === undefined) return <Info className="w-4 h-4" />;
    if (conf >= 80) return <CheckCircle2 className="w-4 h-4" />;
    if (conf >= 50) return <AlertTriangle className="w-4 h-4" />;
    return <ShieldAlert className="w-4 h-4" />;
  };

  const renderMetricSource = (label: string, m?: typeof metric) => {
    if (!m) return (
      <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center text-zinc-500">
        No extraction data available for {label}
      </div>
    );

    return (
      <div className="space-y-4 p-5 rounded-xl bg-zinc-900/30 border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50 group-hover:bg-indigo-500 transition-colors" />
        
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-semibold text-zinc-400 mb-1">{label}</h4>
            <div className="text-2xl font-bold text-white tracking-tight">
              {formatValue(m.value)}
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border ${getConfidenceColor(m.confidence)}`}>
            {getConfidenceIcon(m.confidence)}
            {m.confidence}% Confidence
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Source Document</div>
            <div className="text-sm text-zinc-300 flex items-center gap-1.5 truncate">
              <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">{m.sourceDocument || "Unknown Document"}</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Filing Section</div>
            <div className="text-sm text-zinc-300 flex items-center gap-1.5 truncate">
              <Search className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">{m.sourceSection || "Unknown Section"}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pt-[10vh]">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={closeDrillDown}
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex flex-col border-b border-white/10 p-6 bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Search className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{name}</h2>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Metric Drill-Down</p>
                </div>
              </div>
              <button 
                onClick={closeDrillDown}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
            
            {/* Direct Metric Provenance */}
            {metric && (
              <div>
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Extracted Value</h3>
                {renderMetricSource("Raw Extraction", metric)}
              </div>
            )}

            {/* Derived Ratio / Calculation */}
            {formula && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Derived Calculation</h3>
                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-center">
                    <div className="text-sm font-mono text-indigo-300 font-medium">
                      {name} = {formula}
                    </div>
                  </div>
                </div>

                {underlyingMetrics && underlyingMetrics.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Underlying Variables</h3>
                    <div className="space-y-3">
                      {underlyingMetrics.map((um, i) => (
                        <div key={i}>
                          {renderMetricSource(um.name, um.metric)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
