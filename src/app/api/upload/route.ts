import { NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf/extractText";
import { parseFinancialData } from "@/lib/pdf/financial/parser";
import { FinancialMetrics } from "@/types/financial";
import { extractHistoricalData } from "@/lib/parser/extractHistoricalData";
import { extractSegmentData } from "@/lib/parser/extractSegmentData";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extractedText =
      await extractTextFromPDF(buffer);

    const financialData = parseFinancialData(extractedText, file.name);
    const historicalData = extractHistoricalData(extractedText);
    const segmentData = extractSegmentData(extractedText, financialData.company);

    // Calculate Extraction Confidence
    const expectedFields = [
      'company', 'fiscalYear', 'revenue', 'netIncome', 'totalAssets', 'cash'
    ];
    let foundCount = 0;
    const missingFields: string[] = [];
    
    expectedFields.forEach(field => {
      if (financialData[field as keyof FinancialMetrics] !== undefined) {
        foundCount++;
      } else {
        missingFields.push(field);
      }
    });

    // Score from 0 to 100
    const extractionConfidence = Math.round((foundCount / expectedFields.length) * 100);

    return NextResponse.json({
      success: true,
      fileName: file.name,
      textPreview: extractedText.slice(0, 2000),
      textLength: extractedText.length,
      financialData,
      historicalData,
      segmentData,
      extractionConfidence,
      missingFields,
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