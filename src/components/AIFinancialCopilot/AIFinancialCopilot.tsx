"use client";

import { useState } from "react";

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
    <div className="border rounded-lg p-6 mt-6">

      <h2 className="text-2xl font-bold mb-4">
        AI Financial Copilot
      </h2>

      <input
        type="text"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask about this company..."
        className="w-full p-3 rounded bg-slate-800"
      />

      <button
        onClick={handleAsk}
        className="mt-4 px-4 py-2 rounded bg-blue-600"
      >
        Ask
      </button>

      {answer && (
        <div className="mt-4 p-4 rounded bg-slate-900">
          {answer}
        </div>
      )}
    </div>
  );
}