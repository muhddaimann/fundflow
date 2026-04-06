import { useMemo } from "react";

export type Budget = {
  category: string;
  limit: number;
  spent: number;
  remaining: number;
  percentage: number;
};

export default function useBudget() {
  const currency = "RM";

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const budgets = useMemo<Budget[]>(
    () => [
      {
        category: "Food & Drinks",
        limit: 800,
        spent: 450,
        remaining: 350,
        percentage: 56,
      },
      {
        category: "Transport",
        limit: 300,
        spent: 120,
        remaining: 180,
        percentage: 40,
      },
      {
        category: "Entertainment",
        limit: 200,
        spent: 180,
        remaining: 20,
        percentage: 90,
      },
      {
        category: "Shopping",
        limit: 500,
        spent: 450,
        remaining: 50,
        percentage: 90,
      },
    ],
    []
  );

  return {
    budgets,
    formatCurrency,
  };
}
