"use client";

import { useState } from "react";
import OverviewCards from "../OverviewCards";
import { FinancialMetrics } from "@/types/financial";
import RevenueChart from "../RevenueChart";
import HealthScore from "../HealthScore";
import RiskPanel from "../RiskPanel";
import ExecutiveSummary from "@/components/ExecutiveSummary/ExecutiveSummary";
import RatioAnalysis from "@/components/RatioAnalysis/RatioAnalysis";

interface FinancialData {
  company?: string;
  revenue?: number;
  grossProfit?: number;
  netIncome?: number;
  cash?: number;
}

interface UploadResponse {
  fileName: string;
  fileSize: number;
  fileType: string;
  textLength?: number;
  textPreview?: string;
  financialData?: FinancialData;
}

export default function UploadZone() {
  const [file, setFile] = useState<File | null>(null);
  const [responseData, setResponseData] =
    useState<UploadResponse | null>(null);

  const [metrics, setMetrics] =
    useState<FinancialMetrics | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data: UploadResponse = await response.json();

      console.log("Upload Response:", data);

      setResponseData(data);

      if (data.financialData) {
        setMetrics({
          company: data.financialData.company ?? "Unknown",
          revenue: data.financialData.revenue ?? 0,
          grossProfit: data.financialData.grossProfit ?? 0,
          netIncome: data.financialData.netIncome ?? 0,
          cash: data.financialData.cash ?? 0,
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border rounded-lg p-8">
      <h2 className="text-xl font-semibold mb-4">
        Upload Financial Statement
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];

          if (selectedFile) {
            setFile(selectedFile);
          }
        }}
      />

      {file && (
        <p className="mt-4">
          Selected: {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="mt-4 border px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {isUploading ? "Uploading..." : "Upload PDF"}
      </button>

      {responseData && (
        <div className="mt-6 border rounded p-4">

          {metrics && (
            <>
              <OverviewCards metrics={metrics} />
              <RevenueChart metrics={metrics} />
              <HealthScore metrics={metrics}/>
              <RiskPanel metrics={metrics}/>
              <RatioAnalysis metrics={metrics} />
              <ExecutiveSummary
                company={responseData.financialData?.company ?? "Unknown"}
                revenue={responseData.financialData?.revenue ?? 0}
                netIncome={responseData.financialData?.netIncome ?? 0}
                cash={responseData.financialData?.cash ?? 0}
              />
            </>
          )}

          <h3 className="font-semibold text-lg mt-6 mb-4">
            Extraction Result
          </h3>

          <p>
            <strong>File:</strong> {responseData.fileName}
          </p>

          <p>
            <strong>Characters Extracted:</strong>{" "}
            {responseData.textLength}
          </p>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">
              Preview
            </h4>

            <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
              {responseData.textPreview}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}