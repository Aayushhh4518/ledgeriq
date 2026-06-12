export interface HistoricalData {
  revenue: {
    current: number;
    previous: number;
    growth?: number | null; // null means invalid/impossible
  };
  netIncome: {
    current: number;
    previous: number;
    growth?: number | null;
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

  // Calculate and Validate Growth
  const calculateSecureGrowth = (current: number, previous: number) => {
    if (!previous || previous === 0) return null; // Prevent divide by zero leading to infinity
    const growth = ((current - previous) / previous) * 100;
    if (Math.abs(growth) > 1000) return null; // > 1000% anomaly
    return growth;
  };

  result.revenue.growth = calculateSecureGrowth(result.revenue.current, result.revenue.previous);
  result.netIncome.growth = calculateSecureGrowth(result.netIncome.current, result.netIncome.previous);
  
  // Exclude 0, 0 matches which are invalid default states
  const hasData = result.revenue.current > 0 || result.netIncome.current > 0;
  
  result.isValid = hasData;

  return result;
}
