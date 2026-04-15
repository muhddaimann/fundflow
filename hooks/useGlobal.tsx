import { useMemo } from "react";
import { useGlobalContext } from "../contexts/globalContext";

export type ActivityType = "spend" | "income" | "budget" | "bill" | "goal";

export type RecentActivity = {
  id: string;
  title: string;
  subtitle: string;
  amount?: number;
  type: ActivityType;
  time: string;
  icon: string;
  color?: string;
};

export type Transaction = {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  time: string;
  icon: string;
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

  const recentActivities = useMemo<RecentActivity[]>(() => {
    if (isEmpty) return [];
    return [
      {
        id: "1",
        title: "Starbucks Coffee",
        subtitle: "Drinks",
        amount: 18.5,
        type: "spend",
        time: "10:30 AM",
        icon: "coffee",
      },
      {
        id: "2",
        title: "Grocery Budget Set",
        subtitle: "Target: RM 500.00",
        type: "budget",
        time: "9:15 AM",
        icon: "chart-donut",
        color: "#FF9F43",
      },
      {
        id: "3",
        title: "Freelance Work",
        subtitle: "Income",
        amount: 500.0,
        type: "income",
        time: "Yesterday",
        icon: "briefcase-outline",
      },
      {
        id: "4",
        title: "New Laptop",
        subtitle: "Goal reached 50%",
        type: "goal",
        time: "Yesterday",
        icon: "flag-checkered",
        color: "#EA5455",
      },
      {
        id: "5",
        title: "Electricity Bill",
        subtitle: "Due in 3 days",
        type: "bill",
        time: "2 days ago",
        icon: "lightning-bolt-outline",
        color: "#00CFE8",
      },
    ];
  }, [isEmpty]);

  const recentTransactions = useMemo<Transaction[]>(() => {
    if (isEmpty) return [];
    return [
      {
        id: "t1",
        title: "Grocery Store",
        category: "Food",
        amount: 85.5,
        type: "expense",
        time: "10:30 AM",
        icon: "cart-outline",
      },
      {
        id: "t2",
        title: "Freelance Work",
        category: "Income",
        amount: 500.0,
        type: "income",
        time: "Yesterday",
        icon: "cash-plus",
      },
      {
        id: "t3",
        title: "Starbucks Coffee",
        category: "Drinks",
        amount: 18.0,
        type: "expense",
        time: "Yesterday",
        icon: "coffee",
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
    recentActivities,
    recentTransactions,
    formatCurrency,
  };
}
