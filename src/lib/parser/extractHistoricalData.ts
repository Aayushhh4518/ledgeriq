export interface HistoricalData {
  revenue: {
    current: number;
    previous: number;
  };
  netIncome: {
    current: number;
    previous: number;
  };
}

export function extractHistoricalData(text: string): HistoricalData {
  const result: HistoricalData = {
    revenue: { current: 0, previous: 0 },
    netIncome: { current: 0, previous: 0 }
  };

  // Revenue (using 'Total net sales' which is common in Apple's statements)
  const revenueMatch = text.match(
    /Total net sales\s+\$?\s*([\d,]+)(?:\s+\$?\s*([\d,]+))?/i
  );

  if (revenueMatch) {
    result.revenue.current = Number(revenueMatch[1].replace(/,/g, "")) || 0;
    if (revenueMatch[2]) {
      result.revenue.previous = Number(revenueMatch[2].replace(/,/g, "")) || 0;
    }
  }

  // Net Income
  const netIncomeMatch = text.match(
    /Net income\s+\$?\s*([\d,]+)(?:\s+\$?\s*([\d,]+))?/i
  );

  if (netIncomeMatch) {
    result.netIncome.current = Number(netIncomeMatch[1].replace(/,/g, "")) || 0;
    if (netIncomeMatch[2]) {
      result.netIncome.previous = Number(netIncomeMatch[2].replace(/,/g, "")) || 0;
    }
  }

  return result;
}
