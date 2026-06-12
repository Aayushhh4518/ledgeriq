"use client";

import React, { createContext, useContext, useState } from "react";
import { FinancialMetrics, SegmentData } from "@/types/financial";

export interface UploadResponse {
  fileName: string;
  fileSize: number;
  fileType: string;
  textLength?: number;
  textPreview?: string;

  financialData?: FinancialMetrics;

  historicalData?: {
    revenue: {
      current: number;
      previous: number;
      growth?: number | null;
    };
    netIncome: {
      current: number;
      previous: number;
      growth?: number | null;
    };
    isValid?: boolean;
  };
  segmentData?: SegmentData;
  extractionConfidence?: number;
  missingFields?: string[];
}

export type ComparisonMode = 'YoY' | 'Competitor' | 'Custom' | 'None';

export interface ComparisonContextData {
  mode: ComparisonMode;
  primaryLabel: string;
  compareLabel: string;
}

interface FinancialContextType {
  file: File | null;
  setFile: (file: File | null) => void;
  responseData: UploadResponse | null;
  setResponseData: (data: UploadResponse | null) => void;
  metrics: FinancialMetrics | null;
  setMetrics: (metrics: FinancialMetrics | null) => void;
  historicalData: UploadResponse["historicalData"] | null;
  setHistoricalData: (data: UploadResponse["historicalData"] | null) => void;
  segmentData: SegmentData | null;
  setSegmentData: (data: SegmentData | null) => void;
  isUploading: boolean;
  setIsUploading: (status: boolean) => void;

  compareFile: File | null;
  setCompareFile: (file: File | null) => void;
  compareResponseData: UploadResponse | null;
  setCompareResponseData: (data: UploadResponse | null) => void;
  compareMetrics: FinancialMetrics | null;
  setCompareMetrics: (metrics: FinancialMetrics | null) => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (isOpen: boolean) => void;
  isCompareUploading: boolean;
  setIsCompareUploading: (status: boolean) => void;
  compareHistoricalData: UploadResponse["historicalData"] | null;
  setCompareHistoricalData: (data: UploadResponse["historicalData"] | null) => void;
  compareSegmentData: SegmentData | null;
  setCompareSegmentData: (data: SegmentData | null) => void;
  
  comparisonContext: ComparisonContextData;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export function FinancialProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  const [responseData, setResponseData] = useState<UploadResponse | null>(null);
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [historicalData, setHistoricalData] = useState<UploadResponse["historicalData"] | null>(null);
  const [segmentData, setSegmentData] = useState<SegmentData | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [compareFile, setCompareFile] = useState<File | null>(null);
  const [compareResponseData, setCompareResponseData] = useState<UploadResponse | null>(null);
  const [compareMetrics, setCompareMetrics] = useState<FinancialMetrics | null>(null);
  const [compareHistoricalData, setCompareHistoricalData] = useState<UploadResponse["historicalData"] | null>(null);
  const [compareSegmentData, setCompareSegmentData] = useState<SegmentData | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCompareUploading, setIsCompareUploading] = useState(false);

  const getHeaderLabel = (m: FinancialMetrics | null, defaultLabel: string) => {
    if (!m || !m.company) return defaultLabel;
    const ticker = m.ticker ? ` (${m.ticker})` : "";
    return `${m.company}${ticker} ${m.reportType || ''} ${m.fiscalYear || ''}`.trim();
  };

  const computeComparisonContext = (): ComparisonContextData => {
    if (!metrics || !compareMetrics) {
      return { mode: 'None', primaryLabel: getHeaderLabel(metrics, "Primary Filing"), compareLabel: getHeaderLabel(compareMetrics, "Compare Filing") };
    }

    const m1 = metrics.company?.toLowerCase().trim() || "";
    const m2 = compareMetrics.company?.toLowerCase().trim() || "";
    const y1 = metrics.fiscalYear?.toLowerCase().trim() || "";
    const y2 = compareMetrics.fiscalYear?.toLowerCase().trim() || "";

    let mode: ComparisonMode = 'Custom';

    if (m1 && m2 && m1 === m2) {
      mode = 'YoY';
    } else if (m1 && m2 && m1 !== m2 && y1 === y2) {
      mode = 'Competitor';
    } else if (m1 && m2) {
      mode = 'Custom';
    }

    return {
      mode,
      primaryLabel: getHeaderLabel(metrics, "Primary Filing"),
      compareLabel: getHeaderLabel(compareMetrics, "Competitor Filing")
    };
  };

  const comparisonContext = computeComparisonContext();

  return (
    <FinancialContext.Provider
      value={{
        file,
        setFile,
        responseData,
        setResponseData,
        metrics,
        setMetrics,
        historicalData,
        setHistoricalData,
        segmentData,
        setSegmentData,
        isUploading,
        setIsUploading,
        compareFile,
        setCompareFile,
        compareResponseData,
        setCompareResponseData,
        compareMetrics,
        setCompareMetrics,
        compareHistoricalData,
        setCompareHistoricalData,
        compareSegmentData,
        setCompareSegmentData,
        isCompareModalOpen,
        setIsCompareModalOpen,
        isCompareUploading,
        setIsCompareUploading,
        comparisonContext,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancialData() {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error("useFinancialData must be used within a FinancialProvider");
  }
  return context;
}
