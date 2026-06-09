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

    const financialData = 
        parseFinancialData(extractedText);

    const historicalData = extractHistoricalData(extractedText);
    const segmentData = extractSegmentData(extractedText);

    console.log(financialData, historicalData, segmentData);


    return NextResponse.json({
      success: true,
      fileName: file.name,
      textPreview: extractedText.slice(0, 2000),
      textLength: extractedText.length,
      financialData,
      historicalData,
      segmentData,
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