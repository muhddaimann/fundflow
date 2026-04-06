import { useMemo } from "react";

export default function useSpend() {
  const currency = "RM";

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const spendData = useMemo(
    () => ({
      totalSpent: 1250.5,
      categories: [
        { name: "Food", amount: 450.0 },
        { name: "Transport", amount: 120.0 },
        { name: "Shopping", amount: 680.5 },
      ],
    }),
    []
  );

  return { spendData, formatCurrency };
}
