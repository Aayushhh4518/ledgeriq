"use client";

import { useState } from "react";
import { Terminal, Send, ChevronRight } from "lucide-react";
import { ExecutiveIntelligence } from "@/lib/analysis/insights";

interface Props {
  company: string;
  revenue: string;
  netIncome: string;
  intelligence: ExecutiveIntelligence;
}

export default function AIFinancialCopilot({
  company,
  revenue,
  netIncome,
  intelligence,
}: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const suggestedPrompts = [
    "Summarize the bull vs bear case",
    "What are the most critical red flags?",
    "Explain the health score breakdown",
    "List strategic opportunities",
    "What is the final investment verdict?"
  ];

  const handleAsk = (qStr?: string) => {
    const q = (qStr || question).toLowerCase();
    
    if (qStr) setQuestion(qStr);

    if (q.includes("bull") || q.includes("bear")) {
      const bull = intelligence.recommendation.bullCase;
      const bear = intelligence.recommendation.bearCase;
      setAnswer(
        `BULL CASE: ${bull.title}. Drivers include: ${bull.drivers.join(", ")}. \n\nBEAR CASE: ${bear.title}. Drivers include: ${bear.drivers.join(", ")}.`
      );
    } else if (q.includes("red flag") || q.includes("risk")) {
      if (intelligence.redFlags.length === 0) {
        setAnswer(`${company} currently presents no high-severity algorithmic red flags.`);
      } else {
        const flags = intelligence.redFlags.map(f => `- ${f.title}: ${f.description}`).join('\n');
        setAnswer(`Critical AI Red Flags detected:\n${flags}`);
      }
    } else if (q.includes("health") || q.includes("breakdown")) {
      const issues = intelligence.healthBreakdown.filter(h => h.impact < 0).map(h => `${h.component} (${h.impact})`);
      if (issues.length === 0) {
        setAnswer(`The document health score is ${intelligence.summary.confidenceScore}/100. There were no major validation anomalies.`);
      } else {
        setAnswer(`The score of ${intelligence.summary.confidenceScore}/100 was reduced by the following validation penalties: ${issues.join(", ")}.`);
      }
    } else if (q.includes("opportunit") || q.includes("improve") || q.includes("strategic")) {
      if (intelligence.opportunities.length === 0) {
        setAnswer("No explicit strategic opportunities generated for this period.");
      } else {
        const opps = intelligence.opportunities.map(o => `- ${o.title}: ${o.description} (Target: ${o.metricTarget})`).join('\n');
        setAnswer(`Suggested Strategic Opportunities:\n${opps}`);
      }
    } else if (q.includes("verdict") || q.includes("recommendation") || q.includes("investment")) {
      setAnswer(`Recommendation: ${intelligence.recommendation.view} (${intelligence.recommendation.confidence}% Confidence). \nReasoning: ${intelligence.recommendation.reasoning}`);
    } else if (q.includes("revenue")) {
      setAnswer(`Revenue was extracted at ${revenue}.`);
    } else if (q.includes("profit") || q.includes("net income")) {
      setAnswer(`Net income was extracted at ${netIncome}.`);
    } else {
      setAnswer(
        `Analysis unavailable for that specific query. Please try one of the suggested prompts.`
      );
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-indigo-400" />
        <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
          AI Copilot Terminal
        </h2>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-4">
        {/* Suggested Prompts */}
        {!answer && (
          <div className="space-y-2">
            <p className="text-xs text-zinc-500 font-mono mb-3">SUGGESTED QUERIES:</p>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(prompt)}
                className="w-full flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-left text-xs text-zinc-300 transition-colors"
              >
                {prompt}
                <ChevronRight className="w-3 h-3 text-zinc-600" />
              </button>
            ))}
          </div>
        )}

        {/* Answer Display */}
        {answer && (
          <div className="space-y-4">
            <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
              <p className="text-xs text-zinc-500 font-mono mb-1">QUERY:</p>
              <p className="text-sm text-zinc-300">{question}</p>
            </div>
            <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
              <p className="text-xs text-indigo-400 font-mono mb-2 flex items-center gap-2">
                <Terminal className="w-3 h-3" /> ANALYSIS:
              </p>
              <p className="text-sm text-indigo-100 leading-relaxed whitespace-pre-wrap">{answer}</p>
            </div>
            <button 
              onClick={() => { setAnswer(""); setQuestion(""); }}
              className="text-xs text-zinc-500 hover:text-white transition-colors"
            >
              Clear terminal
            </button>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
        <div className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && question.trim()) handleAsk();
            }}
            placeholder="Ask a question..."
            className="w-full h-10 pl-3 pr-10 rounded bg-[#0a0a0a] border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
          />
          <button
            onClick={() => question.trim() && handleAsk()}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}