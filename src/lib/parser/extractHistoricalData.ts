export interface HistoricalData {
  revenue: {
    current: number;
    previous: number;
  };
  netIncome: {
    current: number;
    previous: number;
  };
  isValid?: boolean;
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

  // Validation: If growth is > 1000% or previous is tiny/0 while current is massive, flag as invalid
  const validateGrowth = (current: number, previous: number) => {
    if (previous === 0 && current > 1000) return false; // Prevent divide by zero leading to infinity
    if (previous > 0) {
      const growth = Math.abs((current - previous) / previous);
      if (growth > 10) return false; // > 1000% anomaly
    }
    return true;
  };

  const isRevValid = validateGrowth(result.revenue.current, result.revenue.previous);
  const isNiValid = validateGrowth(result.netIncome.current, result.netIncome.previous);
  
  // Exclude 0, 0 matches which are invalid default states
  const hasData = result.revenue.current > 0 || result.netIncome.current > 0;
  
  result.isValid = hasData && isRevValid && isNiValid;

  return result;
}
