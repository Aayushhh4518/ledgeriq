import { ExecutiveIntelligence } from "@/lib/analysis/insights";
import { FinancialMetrics } from "@/types/financial";
import { FileText, Target, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

interface Props {
  metrics: FinancialMetrics;
  intelligence: ExecutiveIntelligence;
}

export default function ReportPreview({ metrics, intelligence }: Props) {
  const companyName = metrics.company?.value || "Unknown Company";
  const revenue = metrics.revenue?.value ? `$${metrics.revenue.value.toLocaleString()}` : "N/A";
  const netIncome = metrics.netIncome?.value ? `$${metrics.netIncome.value.toLocaleString()}` : "N/A";
  
  const grossProfit = metrics.grossProfit?.value ? `$${metrics.grossProfit.value.toLocaleString()}` : "N/A";

  const strengths = intelligence.insights.filter(i => i.type === 'strength').slice(0, 3);
  const risks = intelligence.insights.filter(i => i.type === 'risk').slice(0, 3);
  const opps = intelligence.opportunities.slice(0, 3);

  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
        <FileText className="w-5 h-5 text-indigo-400" />
        <div>
          <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Executive Report Preview</h2>
          <p className="text-xs text-zinc-500 font-mono mt-1">DRAFT GENERATION • CONFIDENTIAL</p>
        </div>
      </div>
      
      <div className="p-8 flex-1 bg-white/[0.02] overflow-y-auto">
        {/* Document Style Header */}
        <div className="border-b-2 border-zinc-800 pb-6 mb-8">
          <h1 className="text-3xl font-serif text-white mb-2">{companyName}</h1>
          <div className="flex items-center gap-4 text-sm text-zinc-400 font-mono">
            <span>FY {new Date().getFullYear()}</span>
            <span>•</span>
            <span>Health Score: <span className="text-white font-bold">{intelligence.summary.confidenceScore}/100</span></span>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 border-b border-zinc-800/50 pb-2">Financial Highlights</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Revenue</p>
              <p className="text-lg font-mono text-white">{revenue}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Gross Profit</p>
              <p className="text-lg font-mono text-white">{grossProfit}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Net Income</p>
              <p className="text-lg font-mono text-white">{netIncome}</p>
            </div>
          </div>
        </div>

        {/* Investment Verdict */}
        <div className="mb-8 p-4 bg-zinc-900 border border-zinc-800 rounded flex gap-4">
          <Target className="w-6 h-6 text-indigo-400 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Investment View: {intelligence.recommendation.view}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{intelligence.recommendation.reasoning}</p>
          </div>
        </div>

        {/* Core Findings Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Key Strengths
            </h3>
            <ul className="space-y-3">
              {strengths.map((s, idx) => (
                <li key={idx} className="text-sm text-zinc-300">
                  <span className="font-semibold text-white block">{s.title}</span>
                  <span className="text-xs text-zinc-500">{s.evidence}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Primary Risks
            </h3>
            <ul className="space-y-3">
              {risks.map((r, idx) => (
                <li key={idx} className="text-sm text-zinc-300">
                  <span className="font-semibold text-white block">{r.title}</span>
                  <span className="text-xs text-zinc-500">{r.evidence}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strategic Opportunities */}
        <div>
          <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> Strategic Opportunities
          </h3>
          <div className="space-y-3">
            {opps.map((opp, idx) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800/50 p-3 rounded">
                <span className="font-semibold text-white text-sm block mb-1">{opp.title}</span>
                <span className="text-xs text-zinc-400 block">{opp.description}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
