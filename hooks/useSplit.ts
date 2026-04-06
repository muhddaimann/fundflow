import { useMemo } from "react";

export type Split = {
  id: string;
  person: string;
  amount: number;
  type: "owe" | "owed";
};

export default function useSplit() {
  const currency = "RM";

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const splits = useMemo<Split[]>(
    () => [
      { id: "1", person: "Ahmad", amount: 45.0, type: "owe" },
      { id: "2", person: "Sarah", amount: 12.5, type: "owed" },
      { id: "3", person: "Jason", amount: 30.0, type: "owed" },
    ],
    []
  );

  return { splits, formatCurrency };
}
