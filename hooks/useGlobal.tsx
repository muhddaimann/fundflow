import { useMemo } from "react";
import { useGlobalContext } from "../contexts/globalContext";

export type Transaction = {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  time: string;
};

export default function useGlobal(name?: string) {
  const { isEmpty, setIsEmpty } = useGlobalContext();
  const now = new Date();

  const greeting = useMemo(() => {
    const hour = now.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, [now]);

  const today = useMemo(() => {
    return now.toLocaleDateString("en-MY", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }, [now]);

  const initials = useMemo(() => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [name]);

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const totals = useMemo(() => {
    if (isEmpty) return { spend: 0, pay: 0, claim: 0 };
    return {
      spend: 2450.5,
      pay: 320.0,
      claim: 180.0,
    };
  }, [isEmpty]);

  const recentTransactions = useMemo<Transaction[]>(() => {
    if (isEmpty) return [];
    return [
      {
        id: "1",
        title: "Grocery Store",
        category: "Food",
        amount: 85.5,
        type: "expense",
        time: "10:30 AM",
      },
      {
        id: "2",
        title: "Freelance Work",
        category: "Income",
        amount: 500.0,
        type: "income",
        time: "Yesterday",
      },
      {
        id: "3",
        title: "Starbucks Coffee",
        category: "Drinks",
        amount: 18.0,
        type: "expense",
        time: "Yesterday",
      },
    ];
  }, [isEmpty]);

  return {
    greeting,
    today,
    initials,
    isEmpty,
    setIsEmpty,
    totals,
    recentTransactions,
    formatCurrency,
  };
}