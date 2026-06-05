export interface FinancialMetrics {
  company?: string;
  revenue?: number;
  grossProfit?: number;
  netIncome?: number;
  cash?: number;
}

export function parseFinancialData(
  text: string
): FinancialMetrics {
  const result: FinancialMetrics = {};

  // Company
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

    if (lines.length > 0) {
        result.company = lines[0];
  }

  // Revenue
  const revenueMatch = text.match(
    /Total net sales\s+\$?\s*([\d,]+)/i
  );

  if (revenueMatch) {
    result.revenue = Number(
      revenueMatch[1].replace(/,/g, "")
    );
  }

  // Gross Profit
  const grossProfitMatch = text.match(
    /Gross margin\s+\$?\s*([\d,]+)/i
  );

  if (grossProfitMatch) {
    result.grossProfit = Number(
      grossProfitMatch[1].replace(/,/g, "")
    );
  }

  // Net Income
  const netIncomeMatch = text.match(
    /Net income\s+\$?\s*([\d,]+)/i
  );

  if (netIncomeMatch) {
    result.netIncome = Number(
      netIncomeMatch[1].replace(/,/g, "")
    );
  }

  // Cash
  const cashMatch = text.match(
    /Cash and cash equivalents\s+\$?\s*([\d,]+)/i
  );

  if (cashMatch) {
    result.cash = Number(
      cashMatch[1].replace(/,/g, "")
    );
  }

  return result;
}