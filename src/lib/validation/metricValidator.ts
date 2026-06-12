import { ExtractedMetric } from "@/types/financial";

/**
 * Validates and converts a raw extracted number into an ExtractedMetric.
 * 
 * @param rawValue The raw numeric value extracted from text.
 * @param expectedSection The section name where this metric is typically found.
 * @param sourceText The original document text (to compute confidence).
 * @param keyword A keyword to search for near the number.
 * @param context Additional validation rules.
 * @returns An ExtractedMetric or undefined if the value is invalid.
 */
export function validateMetric(
  rawValue: number | undefined,
  expectedSection: string,
  sourceText: string,
  keyword: string,
  context?: {
    allowNegative?: boolean;
    allowZero?: boolean;
    maxReasonableValue?: number;
    sourceDocument?: string;
    sourcePage?: number;
  }
): ExtractedMetric | undefined {
  if (rawValue === undefined || isNaN(rawValue)) return undefined;

  const { allowNegative = true, allowZero = true, maxReasonableValue, sourceDocument, sourcePage } = context || {};

  // Basic Sanity Checks
  if (!allowNegative && rawValue < 0) return undefined;
  if (!allowZero && rawValue === 0) return undefined;
  if (maxReasonableValue && rawValue > maxReasonableValue) return undefined;

  // Compute Confidence
  let confidence = 50; // Base confidence just for having a parsed number

  // Keyword Proximity Check
  const keywordRegex = new RegExp(keyword, "i");
  const hasKeyword = keywordRegex.test(sourceText);
  if (hasKeyword) {
    confidence += 30;
  }

  // Section Check (Simple heuristic: if text contains section title)
  const sectionRegex = new RegExp(expectedSection, "i");
  let foundSection = "Unknown Section";
  if (sectionRegex.test(sourceText)) {
    confidence += 15;
    foundSection = expectedSection;
  }

  // Format Check (Assume values over 100k have high likelihood of being real financial numbers)
  if (Math.abs(rawValue) > 100000) {
    confidence += 5;
  }

  return {
    value: rawValue,
    confidence: Math.min(confidence, 100),
    sourcePage: sourcePage ?? 1,
    sourceSection: foundSection,
    sourceDocument: sourceDocument ?? "Unknown Document"
  };
}
