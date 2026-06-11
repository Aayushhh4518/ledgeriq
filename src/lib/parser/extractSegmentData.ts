import { SegmentData } from "@/types/financial";

export function extractSegmentData(text: string): SegmentData {
  const result: SegmentData = {
    iphone: 0,
    mac: 0,
    ipad: 0,
    wearables: 0,
    services: 0,
  };

  // Apple product lines regex
  // Negative lookahead (?!\s+\d{1,2}\b) ensures we don't capture "iPhone 16"
  // We look for larger numbers or numbers preceded by $ or located further in the line
  
  const extractValue = (pattern: RegExp) => {
    const match = text.match(pattern);
    if (match) {
      const val = Number(match[1].replace(/,/g, ""));
      // Basic validation: segments should be large numbers, not '16'
      return val > 1000 ? val : 0;
    }
    return 0;
  };

  result.iphone = extractValue(/iPhone(?!\s+\d{1,2}\b)[^\d]*([\d,]+)/i);
  result.mac = extractValue(/Mac(?!\s+\d{1,2}\b)[^\d]*([\d,]+)/i);
  result.ipad = extractValue(/iPad(?!\s+\d{1,2}\b)[^\d]*([\d,]+)/i);
  result.wearables = extractValue(/Wearables(?:, Home and Accessories)?(?!\s+\d{1,2}\b)[^\d]*([\d,]+)/i);
  result.services = extractValue(/Services(?!\s+\d{1,2}\b)[^\d]*([\d,]+)/i);

  return result;
}
