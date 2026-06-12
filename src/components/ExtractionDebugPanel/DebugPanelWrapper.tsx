"use client";

import { useFinancialData } from "@/contexts/FinancialContext";
import ExtractionDebugPanel from "./ExtractionDebugPanel";

export default function DebugPanelWrapper() {
  const { responseData } = useFinancialData();
  return <ExtractionDebugPanel responseData={responseData} />;
}
