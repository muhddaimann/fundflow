import { useMemo } from "react";

export default function usePay() {
  const currency = "RM";

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const payData = useMemo(
    () => ({
      totalToPay: 450.0,
      upcomingPayments: [
        { id: "1", title: "Credit Card", amount: 300.0, dueDate: "2024-04-15" },
        { id: "2", title: "Internet", amount: 150.0, dueDate: "2024-04-20" },
      ],
    }),
    []
  );

  return { payData, formatCurrency };
}
