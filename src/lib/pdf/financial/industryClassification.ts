export interface ClassificationResult {
  value: string;
  confidence: number;
  source: string;
}

const COMPANY_MAPPING: Record<string, string> = {
  "apple": "Technology",
  "microsoft": "Technology",
  "alphabet": "Technology",
  "google": "Technology",
  "meta": "Technology",
  "nvidia": "Technology",
  "amazon": "Consumer Goods",
  "tesla": "Industrial",
  "jpmorgan": "Financial Services",
  "bank of america": "Financial Services",
  "johnson & johnson": "Healthcare",
  "pfizer": "Healthcare"
};

export function detectIndustry(companyName: string | undefined, text: string): ClassificationResult {
  // 1. Company Mapping Layer
  if (companyName) {
    const lowerName = companyName.toLowerCase();
    for (const [key, industry] of Object.entries(COMPANY_MAPPING)) {
      if (lowerName.includes(key)) {
        return {
          value: industry,
          confidence: 95,
          source: "Company Mapping"
        };
      }
    }
  }

  // 2. Filing Analysis Layer
  const topSlice = text.slice(0, 10000).toLowerCase();
  
  const rules = [
    { industry: "Technology", keywords: ["iphone", "mac", "software", "cloud computing", "semiconductor", "saas"], weight: 0 },
    { industry: "Financial Services", keywords: ["banking", "loans", "deposits", "investment banking", "wealth management"], weight: 0 },
    { industry: "Healthcare", keywords: ["pharmaceutical", "medical", "clinical trials", "biotechnology", "patients"], weight: 0 },
    { industry: "Consumer Goods", keywords: ["retail", "e-commerce", "merchandise", "consumer products", "apparel"], weight: 0 },
    { industry: "Energy", keywords: ["oil", "refining", "natural gas", "petroleum", "exploration"], weight: 0 },
    { industry: "Industrial", keywords: ["manufacturing", "logistics", "automotive", "machinery", "aerospace"], weight: 0 }
  ];

  for (const rule of rules) {
    let matches = 0;
    for (const kw of rule.keywords) {
      if (topSlice.includes(kw)) {
        matches++;
      }
    }
    rule.weight = matches;
  }

  rules.sort((a, b) => b.weight - a.weight);
  const bestMatch = rules[0];

  if (bestMatch && bestMatch.weight >= 2) {
    // Arbitrary heuristic: 2 keywords = 65% confidence, 3+ = 80% confidence
    const confidence = bestMatch.weight >= 3 ? 80 : 65;
    return {
      value: bestMatch.industry,
      confidence,
      source: "Filing Analysis"
    };
  } else if (bestMatch && bestMatch.weight === 1) {
    return {
      value: bestMatch.industry,
      confidence: 55, // Below 60% threshold
      source: "Filing Analysis"
    };
  }

  // Fallback Logic
  return {
    value: "General Corporate",
    confidence: 50,
    source: "Fallback"
  };
}
