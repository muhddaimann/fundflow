import { useMemo } from "react";

export default function useGoals() {
  const currency = "RM";

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const goalsData = useMemo(
    () => [
      { id: "1", title: "Emergency Fund", target: 10000, current: 4500 },
      { id: "2", title: "New Laptop", target: 5000, current: 1200 },
      { id: "3", title: "Vacation", target: 3000, current: 2500 },
    ],
    []
  );

  return { goalsData, formatCurrency };
}
