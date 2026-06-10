"use client";

import React, { createContext, useContext, useState } from "react";
import { FinancialMetrics, SegmentData } from "@/types/financial";

export interface FinancialData {
  company?: string;
  revenue?: number;
  grossProfit?: number;
  netIncome?: number;
  cash?: number;
}

export interface UploadResponse {
  fileName: string;
  fileSize: number;
  fileType: string;
  textLength?: number;
  textPreview?: string;

  financialData?: FinancialData;

  historicalData?: {
    revenue: {
      current: number;
      previous: number;
    };
    netIncome: {
      current: number;
      previous: number;
    };
  };
  segmentData?: SegmentData;
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
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCompareUploading, setIsCompareUploading] = useState(false);

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
        isCompareModalOpen,
        setIsCompareModalOpen,
        isCompareUploading,
        setIsCompareUploading,
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
