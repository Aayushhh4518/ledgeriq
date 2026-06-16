import { NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf/extractText";
import { parseFinancialData } from "@/lib/pdf/financial/parser";
import { FinancialMetrics } from "@/types/financial";
import { extractHistoricalData } from "@/lib/parser/extractHistoricalData";
import { extractSegmentData } from "@/lib/parser/extractSegmentData";
import { performCrossValidation } from "@/lib/validation/crossValidation";
import { evaluateQuality } from "@/lib/validation/qualityScore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileName, text: extractedText } = body;

    if (!extractedText || !fileName) {
      return NextResponse.json(
        {
          success: false,
          message: "No text or file name provided",
        },
        {
          status: 400,
        }
      );
    }

    const financialData = parseFinancialData(extractedText, fileName);
    const historicalData = extractHistoricalData(extractedText);
    const segmentData = extractSegmentData(extractedText, financialData.company?.value);

    // Calculate Extraction Confidence
    const expectedFields = [
      'company', 'fiscalYear', 'revenue', 'netIncome', 'totalAssets', 'cash'
    ];
    let foundCount = 0;
    const missingFields: string[] = [];
    
    expectedFields.forEach(field => {
      const metric = financialData[field as keyof FinancialMetrics] as unknown;
      if (metric !== undefined && (typeof metric === 'string' || (metric as { value?: number }).value !== undefined)) {
        foundCount++;
      } else {
        missingFields.push(field);
      }
    });

    // Score from 0 to 100
    let extractionConfidence = Math.round((foundCount / expectedFields.length) * 100);

    if (financialData.company?.value === "Unidentified Filing Entity") {
      extractionConfidence = Math.max(0, extractionConfidence - 20);
    }

    // Cross Validation & Quality Score
    const validationResults = performCrossValidation(financialData, historicalData, segmentData);
    const documentQuality = evaluateQuality(
      financialData, 
      historicalData, 
      segmentData, 
      extractedText, 
      validationResults
    );

    return NextResponse.json({
      success: true,
      fileName,
      textPreview: extractedText.slice(0, 2000),
      textLength: extractedText.length,
      financialData,
      historicalData,
      segmentData,
      extractionConfidence,
      missingFields,
      documentQuality,
    });
  } catch (error) {
    console.error("PDF ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process PDF",
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}