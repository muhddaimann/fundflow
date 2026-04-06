import { useMemo, useState } from "react";

export type SpendTransaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
  merchant?: string;
};

export default function useSpend() {
  const currency = "RM";
  const [isEmpty, setIsEmpty] = useState(false);

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const spendData = useMemo(
    () => {
      if (isEmpty) {
        return {
          totalSpent: 0,
          categories: [],
          recentTransactions: [],
        };
      }

      return {
        totalSpent: 1250.5,
        categories: [
          { name: "Food", amount: 450.0, icon: "silverware-fork-knife", color: "#FF9F43" },
          { name: "Transport", amount: 120.0, icon: "car", color: "#00CFE8" },
          { name: "Shopping", amount: 680.5, icon: "cart", color: "#7367F0" },
        ],
        recentTransactions: [
          {
            id: "1",
            title: "Starbucks Coffee",
            amount: 18.5,
            date: new Date().toISOString(),
            category: "Food",
            icon: "coffee",
            merchant: "Starbucks",
          },
          {
            id: "2",
            title: "Grab Ride",
            amount: 25.0,
            date: new Date(Date.now() - 86400000).toISOString(),
            category: "Transport",
            icon: "car",
            merchant: "Grab",
          },
          {
            id: "3",
            title: "Uniqlo T-Shirt",
            amount: 79.9,
            date: new Date(Date.now() - 172800000).toISOString(),
            category: "Shopping",
            icon: "shopping",
            merchant: "Uniqlo",
          },
          {
            id: "4",
            title: "Village Grocer",
            amount: 145.2,
            date: new Date(Date.now() - 259200000).toISOString(),
            category: "Food",
            icon: "basket",
            merchant: "Village Grocer",
          },
        ] as SpendTransaction[],
      };
    },
    [isEmpty]
  );

  return { spendData, formatCurrency, isEmpty, setIsEmpty };
}
