import { FinancialMetrics } from "@/types/financial";
import { validateMetric, validateMetadata } from "@/lib/validation/metricValidator";
import { detectIndustry } from "./industryClassification";

export function parseFinancialData(
  text: string,
  filename: string = "Unknown Document"
): FinancialMetrics {
  const result: FinancialMetrics = {};

  // Robust Metadata Extraction
  
  // Ticker symbol (e.g. NASDAQ: AAPL)
  const tickerMatch = text.match(/\(\s*(?:NASDAQ|NYSE|AMEX)\s*:\s*([A-Z]+)\s*\)/i);
  if (tickerMatch) {
    result.ticker = validateMetadata(tickerMatch[1].toUpperCase(), filename);
  }

  // Look for "Exact name of registrant" or standard headers. Handle line breaks.
  const companyMatch = text.match(/\(Exact name of registrant as specified in its charter\)\s*([^\n]+)/i) 
                    || text.match(/(?:Company Name|Registrant):\s*([^\n]+)/i);
  
  let companyStr: string | undefined = undefined;
  if (companyMatch) {
    const rawName = companyMatch[1].trim();
    // Filter out states, tax IDs or garbage text like California94-2404110
    if (/^[a-zA-Z0-9\s,&.-]+$/.test(rawName) && !rawName.includes("California94") && rawName !== "UNITED STATES" && rawName.length <= 50) {
        companyStr = rawName;
    }
  }

  // Explicit fallback for Top Tech Companies if not found or if previous failed
  if (!companyStr) {
    const topText = text.slice(0, 2000);
    if (topText.match(/Apple Inc\./i)) companyStr = "Apple Inc.";
    else if (topText.match(/Amazon\.com, Inc\./i) || topText.match(/Amazon\.com/i)) companyStr = "Amazon.com, Inc.";
    else if (topText.match(/Alphabet Inc\./i)) companyStr = "Alphabet Inc.";
    else if (topText.match(/Microsoft Corporation/i)) companyStr = "Microsoft Corporation";
    else if (topText.match(/Meta Platforms, Inc\./i) || topText.match(/Facebook, Inc\./i)) companyStr = "Meta Platforms, Inc.";
    else {
      // General fallback: look for lines ending in Inc., Corp., LLC, etc. near the top
      const fallbackMatch = topText.match(/^([A-Z][a-zA-Z\s,&]+(?:Inc\.|Corporation|Corp\.|LLC|Ltd\.|Company))\s*$/m);
      if (fallbackMatch) {
        companyStr = fallbackMatch[1].trim();
      } else {
        // Last resort: Unidentified Filing Entity
        companyStr = "Unidentified Filing Entity";
      }
    }
  }
  if (companyStr) {
    result.company = validateMetadata(companyStr, filename, 90);
  }

  const reportTypeMatch = text.match(/\b(FORM\s+10-[KQ])\b/i) || text.match(/\b(10-[KQ])\b/i) || text.match(/\b(Annual Report)\b/i);
  if (reportTypeMatch) {
    result.reportType = validateMetadata(reportTypeMatch[1].toUpperCase(), filename);
  }

  const fiscalYearMatch = text.match(/For the fiscal year ended[\s\S]{1,50}?(20\d{2})/i) || text.match(/FY\s*(20\d{2})/i);
  if (fiscalYearMatch) {
    result.fiscalYear = validateMetadata(fiscalYearMatch[1], filename);
  }

  const quarterMatch = text.match(/For the quarterly period ended[\s\S]{1,50}?([A-Z][a-z]+\s+\d{1,2},\s*20\d{2})/i);
  if (quarterMatch) {
    result.quarter = validateMetadata(quarterMatch[1], filename);
  }

  const filingDateMatch = text.match(/Filed[\s:]+([A-Z][a-z]+\s+\d{1,2},\s*20\d{2})/i) || text.match(/Date of Report[\s:]+([A-Z][a-z]+\s+\d{1,2},\s*20\d{2})/i);
  if (filingDateMatch) {
    result.filingDate = validateMetadata(filingDateMatch[1], filename);
  }

  // Currency extraction
  const isEuros = text.match(/€|EUR|Euros/i);
  const isGBP = text.match(/£|GBP|Pounds/i);
  const isYen = text.match(/¥|JPY|Yen/i);
  if (isEuros) result.currency = validateMetadata("EUR", filename);
  else if (isGBP) result.currency = validateMetadata("GBP", filename);
  else if (isYen) result.currency = validateMetadata("JPY", filename);
  else result.currency = validateMetadata("USD", filename); // Default for US Filings

  // Industry extraction (Robust Classification Engine)
  const classification = detectIndustry(companyStr, text);
  
  if (classification.confidence < 60) {
    result.industry = {
      value: "General Corporate",
      confidence: 50,
      source: "Fallback"
    };
  } else {
    result.industry = {
      value: classification.value,
      confidence: classification.confidence,
      source: classification.source
    };
  }
  
  console.log(`[INDUSTRY EXTRACTION DEBUG]`);
  console.log(`Company Name: ${companyStr || 'Unknown'}`);
  console.log(`Detected Industry: ${result.industry.value}`);
  console.log(`Benchmark Source: ${result.industry.source} (Confidence: ${result.industry.confidence}%)`);

  const matchValue = (regex: RegExp) => {
    const match = text.match(regex);
    return match ? Number(match[1].replace(/,/g, "")) : undefined;
  };

  const getMetric = (regex: RegExp, section: string, keyword: string, allowNegative = true) => {
    const rawValue = matchValue(regex);
    return validateMetric(rawValue, section, text, keyword, { allowNegative, sourceDocument: filename });
  };

  result.revenue = getMetric(/Total net sales\s+\$?\s*([\d,]+)/i, "Statements of Operations", "net sales", false);
  result.grossProfit = getMetric(/Gross margin\s+\$?\s*([\d,]+)/i, "Statements of Operations", "gross margin", true);
  result.operatingIncome = getMetric(/Operating income\s+\$?\s*([\d,]+)/i, "Statements of Operations", "operating income", true);
  result.netIncome = getMetric(/Net income\s+\$?\s*([\d,]+)/i, "Statements of Operations", "net income", true);
  
  result.cash = getMetric(/Cash and cash equivalents\s+\$?\s*([\d,]+)/i, "Balance Sheets", "cash and cash equivalents", false);
  result.totalAssets = getMetric(/Total assets\s+\$?\s*([\d,]+)/i, "Balance Sheets", "total assets", false);
  result.currentAssets = getMetric(/Total current assets\s+\$?\s*([\d,]+)/i, "Balance Sheets", "current assets", false);
  result.totalLiabilities = getMetric(/Total liabilities\s+\$?\s*([\d,]+)/i, "Balance Sheets", "total liabilities", false);
  result.currentLiabilities = getMetric(/Total current liabilities\s+\$?\s*([\d,]+)/i, "Balance Sheets", "current liabilities", false);
  result.shareholderEquity = getMetric(/Total shareholders[’'] equity\s+\$?\s*([\d,]+)/i, "Balance Sheets", "shareholders' equity", true);
  result.operatingCashFlow = getMetric(/Cash generated by operating activities\s+\$?\s*([\d,]+)/i, "Cash Flows", "operating activities", true);
  
  // Clean up undefined properties
  for (const key of Object.keys(result) as Array<keyof FinancialMetrics>) {
    if (result[key] === undefined) {
      delete result[key];
    }
  }

  return result;
}