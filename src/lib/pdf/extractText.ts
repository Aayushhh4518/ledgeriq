// @ts-ignore - The types package doesn't cover internal paths
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export async function extractTextFromPDF(
  buffer: Buffer
): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text;
}