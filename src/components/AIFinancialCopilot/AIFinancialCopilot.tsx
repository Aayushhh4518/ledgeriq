"use client";

import { useState } from "react";
import { Sparkles, Send } from "lucide-react";

interface Props {
  company: string;
  revenue: number;
  netIncome: number;
}

export default function AIFinancialCopilot({
  company,
  revenue,
  netIncome,
}: Props) {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const handleAsk = () => {

    const q = question.toLowerCase();

    if (q.includes("profit")) {
      setAnswer(
        `${company} generated net income of $${netIncome.toLocaleString()} indicating strong profitability.`
      );
    }

    else if (q.includes("revenue")) {
      setAnswer(
        `${company} reported revenue of $${revenue.toLocaleString()}.`
      );
    }

    else if (q.includes("risk")) {
      setAnswer(
        `${company} shows moderate risk due to leverage and liquidity concerns.`
      );
    }

    else {
      setAnswer(
        `Financial analysis is currently unavailable for that question.`
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-zinc-900/40 border border-indigo-500/20 rounded-xl shadow-[0_4px_24px_-8px_rgba(79,70,229,0.2)] backdrop-blur-sm p-6 relative overflow-hidden group">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-semibold tracking-tight text-indigo-100">
          Research Assistant
        </h2>
      </div>

      <div className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAsk();
          }}
          placeholder="Ask about revenue, profit, or risk..."
          className="w-full h-12 pl-4 pr-12 rounded-lg bg-zinc-950/50 border border-indigo-500/30 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-inner"
        />

        <button
          onClick={handleAsk}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {answer && (
        <div className="mt-6 p-4 rounded-lg bg-indigo-950/30 border border-indigo-500/20 relative">
          <div className="absolute -left-px top-1/2 -translate-y-1/2 w-[2px] h-8 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
          <p className="text-sm leading-relaxed text-indigo-100">{answer}</p>
        </div>
      )}
    </div>
  );
}