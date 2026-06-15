"use client";

import React, { createContext, useContext, useState } from "react";
import { FinancialMetrics, SegmentData, ExtractedMetric, DocumentQualityScore } from "@/types/financial";

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
  documentQuality?: DocumentQualityScore;
}

export type ComparisonMode = 'YoY' | 'Competitor' | 'Custom' | 'Identical' | 'None';

export interface ComparisonContextData {
  mode: ComparisonMode;
  primaryLabel: string;
  compareLabel: string;
}

export interface DrillDownState {
  name: string;
  metric?: ExtractedMetric;
  formula?: string;
  underlyingMetrics?: { name: string; metric?: ExtractedMetric }[];
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

  drillDownMetric: DrillDownState | null;
  openDrillDown: (state: DrillDownState) => void;
  closeDrillDown: () => void;
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

  const [drillDownMetric, setDrillDownMetric] = useState<DrillDownState | null>(null);

  const openDrillDown = (state: DrillDownState) => setDrillDownMetric(state);
  const closeDrillDown = () => setDrillDownMetric(null);

  const getHeaderLabel = (m: FinancialMetrics | null, defaultLabel: string) => {
    if (!m || !m.company?.value) return defaultLabel;
    const ticker = m.ticker?.value ? ` (${m.ticker.value})` : "";
    return `${m.company.value}${ticker} ${m.reportType?.value || ''} ${m.fiscalYear?.value || ''}`.trim();
  };

  const computeComparisonContext = (): ComparisonContextData => {
    if (!metrics || !compareMetrics) {
      return { mode: 'None', primaryLabel: getHeaderLabel(metrics, "Primary Filing"), compareLabel: getHeaderLabel(compareMetrics, "Compare Filing") };
    }

    const m1 = metrics.company?.value?.toLowerCase().trim() || "";
    const m2 = compareMetrics.company?.value?.toLowerCase().trim() || "";
    const y1 = metrics.fiscalYear?.value?.toLowerCase().trim() || "";
    const y2 = compareMetrics.fiscalYear?.value?.toLowerCase().trim() || "";

    let mode: ComparisonMode = 'Custom';

    if (m1 && m2 && m1 === m2 && y1 && y2 && y1 === y2) {
      mode = 'Identical';
    } else if (m1 && m2 && m1 === m2) {
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
        drillDownMetric,
        openDrillDown,
        closeDrillDown,
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
