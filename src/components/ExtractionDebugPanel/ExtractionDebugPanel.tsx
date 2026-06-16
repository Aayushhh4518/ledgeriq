import { UploadResponse } from "@/contexts/FinancialContext";
import { CheckCircle2, AlertCircle, Terminal, Database, FileText, Percent, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  responseData: UploadResponse | null;
}

export default function ExtractionDebugPanel({ responseData }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!responseData) return null;

  const { financialData, extractionConfidence, missingFields, historicalData, segmentData, documentQuality } = responseData;

  const getScoreColor = (score?: number) => {
    if (!score) return "text-zinc-500 bg-zinc-900";
    if (score >= 80) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (score >= 50) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    return "text-rose-400 bg-rose-400/10 border-rose-400/20";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-96 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl overflow-hidden pointer-events-auto"
          >
            <div className="flex items-center justify-between p-3 bg-zinc-900/50 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-300 font-mono text-sm">
                <Terminal className="w-4 h-4 text-violet-400" />
                Extraction Diagnostics
              </div>
              <div className={`px-2 py-0.5 rounded text-xs font-bold border ${getScoreColor(extractionConfidence)}`}>
                {extractionConfidence || 0}% CONFIDENCE
              </div>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 font-mono text-xs">
              
              {/* Metadata */}
              <div className="space-y-2">
                <h4 className="text-zinc-500 font-semibold flex items-center gap-2 uppercase tracking-wider text-[10px]">
                  <FileText className="w-3 h-3" /> Metadata
                </h4>
                <div className="bg-zinc-900/50 rounded-lg p-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Company:</span>
                    <span className="text-white truncate max-w-[180px]">{financialData?.company?.value || <span className="text-rose-400">Missing</span>}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Fiscal Year:</span>
                    <span className="text-white">{financialData?.fiscalYear?.value || <span className="text-rose-400">Missing</span>}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Ticker:</span>
                    <span className="text-white">{financialData?.ticker?.value || <span className="text-zinc-600">N/A</span>}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Industry:</span>
                    <span className="text-white">{financialData?.industry?.value || <span className="text-zinc-600">N/A</span>}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Class Source:</span>
                    <span className="text-white">{financialData?.industry?.source || <span className="text-zinc-600">N/A</span>}</span>
                  </div>
                </div>
              </div>

              {/* Data Extraction */}
              <div className="space-y-2">
                <h4 className="text-zinc-500 font-semibold flex items-center gap-2 uppercase tracking-wider text-[10px]">
                  <Database className="w-3 h-3" /> Primary Metrics
                </h4>
                <div className="bg-zinc-900/50 rounded-lg p-2 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1">
                    {financialData?.revenue !== undefined ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <AlertCircle className="w-3 h-3 text-rose-400" />}
                    <span className={financialData?.revenue !== undefined ? "text-zinc-300" : "text-rose-400"}>Revenue</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {financialData?.netIncome !== undefined ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <AlertCircle className="w-3 h-3 text-rose-400" />}
                    <span className={financialData?.netIncome !== undefined ? "text-zinc-300" : "text-rose-400"}>Net Income</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {financialData?.cash !== undefined ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <AlertCircle className="w-3 h-3 text-rose-400" />}
                    <span className={financialData?.cash !== undefined ? "text-zinc-300" : "text-rose-400"}>Cash</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {financialData?.totalAssets !== undefined ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <AlertCircle className="w-3 h-3 text-rose-400" />}
                    <span className={financialData?.totalAssets !== undefined ? "text-zinc-300" : "text-rose-400"}>Assets</span>
                  </div>
                </div>
              </div>

              {/* Segments & Growth */}
              <div className="space-y-2">
                <h4 className="text-zinc-500 font-semibold flex items-center gap-2 uppercase tracking-wider text-[10px]">
                  <Percent className="w-3 h-3" /> Growth & Segments
                </h4>
                <div className="bg-zinc-900/50 rounded-lg p-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Segments Found:</span>
                    <span className="text-white">{Object.keys(segmentData || {}).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Rev Growth Valid:</span>
                    <span className={historicalData?.revenue?.growth !== null ? "text-emerald-400" : "text-rose-400"}>
                      {historicalData?.revenue?.growth !== null ? "Yes" : "No / NA"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quality & Validation */}
              <div className="space-y-2">
                <h4 className="text-zinc-500 font-semibold flex items-center gap-2 uppercase tracking-wider text-[10px]">
                  <ShieldAlert className="w-3 h-3" /> Document Quality
                </h4>
                <div className="bg-zinc-900/50 rounded-lg p-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Quality Score:</span>
                    <span className="text-white font-bold text-indigo-400">{documentQuality?.score || 0}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Validations Passed:</span>
                    <span className={
                      documentQuality?.validationResults?.some(r => r.status === 'error') ? "text-rose-400" : 
                      documentQuality?.validationResults?.some(r => r.status === 'warning') ? "text-amber-400" : 
                      "text-emerald-400"
                    }>
                      {documentQuality?.validationResults?.filter(r => r.status === 'passed').length || 0} / {documentQuality?.validationResults?.length || 0}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 rounded-full shadow-lg transition-all font-mono text-xs"
      >
        <Terminal className="w-4 h-4" />
        {isOpen ? "Close Debug" : "Extraction Debug"}
      </button>
    </div>
  );
}
