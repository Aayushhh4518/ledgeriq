import { SegmentData } from "@/types/financial";

export function extractSegmentData(text: string): SegmentData {
  const result: SegmentData = {};

  const extractValue = (pattern: RegExp) => {
    const match = text.match(pattern);
    if (match) {
      const val = Number(match[1].replace(/,/g, ""));
      // Validate: Segments should be large figures (not versions like $16)
      return val > 1000 ? val : 0;
    }
    return 0;
  };

  const addIfValid = (key: string, val: number) => {
    if (val > 0) result[key] = val;
  };

  // 1. APPLE PARSER
  if (text.match(/Apple Inc\./i) || text.match(/iPhone(?!\s+\d{1,2}\b)[^\d]*[\d,]+/i)) {
    addIfValid("iPhone", extractValue(/iPhone(?!\s+\d{1,2}\b)[^\d]*([\d,]+)/i));
    addIfValid("Mac", extractValue(/Mac(?!\s+\d{1,2}\b)[^\d]*([\d,]+)/i));
    addIfValid("iPad", extractValue(/iPad(?!\s+\d{1,2}\b)[^\d]*([\d,]+)/i));
    addIfValid("Wearables", extractValue(/Wearables(?:, Home and Accessories)?(?!\s+\d{1,2}\b)[^\d]*([\d,]+)/i));
    addIfValid("Services", extractValue(/Services(?!\s+\d{1,2}\b)[^\d]*([\d,]+)/i));
    if (Object.keys(result).length > 0) return result;
  }

  // 2. MICROSOFT PARSER
  if (text.match(/Microsoft Corporation/i) || text.match(/Intelligent Cloud/i)) {
    addIfValid("Productivity", extractValue(/Productivity and Business Processes[^\d]*([\d,]+)/i));
    addIfValid("Intelligent Cloud", extractValue(/Intelligent Cloud[^\d]*([\d,]+)/i));
    addIfValid("Personal Computing", extractValue(/More Personal Computing[^\d]*([\d,]+)/i));
    if (Object.keys(result).length > 0) return result;
  }

  // 3. AMAZON PARSER
  if (text.match(/Amazon\.com/i) || text.match(/AWS[^\d]*[\d,]+/i)) {
    addIfValid("North America", extractValue(/North America[^\d]*([\d,]+)/i));
    addIfValid("International", extractValue(/International[^\d]*([\d,]+)/i));
    addIfValid("AWS", extractValue(/AWS[^\d]*([\d,]+)/i));
    if (Object.keys(result).length > 0) return result;
  }

  // 4. ALPHABET / GOOGLE PARSER
  if (text.match(/Alphabet Inc\./i) || text.match(/Google Search/i)) {
    addIfValid("Google Search", extractValue(/Google Search[^\d]*([\d,]+)/i));
    addIfValid("YouTube Ads", extractValue(/YouTube ads[^\d]*([\d,]+)/i));
    addIfValid("Google Network", extractValue(/Google Network[^\d]*([\d,]+)/i));
    addIfValid("Google Cloud", extractValue(/Google Cloud[^\d]*([\d,]+)/i));
    if (Object.keys(result).length > 0) return result;
  }

  // 5. META PARSER
  if (text.match(/Meta Platforms/i) || text.match(/Family of Apps/i)) {
    addIfValid("Family of Apps", extractValue(/Family of Apps[^\d]*([\d,]+)/i));
    addIfValid("Reality Labs", extractValue(/Reality Labs[^\d]*([\d,]+)/i));
    if (Object.keys(result).length > 0) return result;
  }

  // 6. GENERIC FALLBACK (If no specific parser matched or they returned 0)
  // Safely return empty object so charts don't render garbage
  return result;
}
