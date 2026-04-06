import { useMemo } from "react";

export type Transaction = {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
  color?: string;
};

export type Budget = {
  category: string;
  limit: number;
  spent: number;
  remaining: number;
  percentage: number;
};

export type Bill = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
};

export type Subscription = {
  id: string;
  name: string;
  amount: number;
  frequency: "monthly" | "yearly";
  nextBilling: string;
};

export type Split = {
  id: string;
  person: string;
  amount: number;
  type: "owe" | "owed";
};

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  saved: number;
};

export default function useHome() {
  const currency = "RM";

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const checkDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (checkDate.getTime() === today.getTime()) return "Today";
    if (checkDate.getTime() === yesterday.getTime()) return "Yesterday";
    if (checkDate.getTime() === tomorrow.getTime()) return "Tomorrow";

    return date.toLocaleDateString("en-MY", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const getDaysLeft = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)}d ago`;
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  const totals = useMemo(
    () => ({
      spent: 1250.5,
      toPay: 450.0,
      toClaim: 120.0,
      budget: 3000.0,
    }),
    []
  );

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

  const bills = useMemo<Bill[]>(() => {
    const now = new Date();
    const formatDateString = (d: Date) => d.toISOString().split("T")[0];

    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(now.getDate() - 3);

    return [
      {
        id: "1",
        name: "Rent",
        amount: 1200,
        dueDate: formatDateString(nextWeek),
        status: "pending",
      },
      {
        id: "2",
        name: "Electricity",
        amount: 85.5,
        dueDate: formatDateString(yesterday),
        status: "paid",
      },
      {
        id: "3",
        name: "Water",
        amount: 20.0,
        dueDate: formatDateString(threeDaysAgo),
        status: "overdue",
      },
    ];
  }, []);

  const subscriptions = useMemo<Subscription[]>(() => {
    const now = new Date();
    const formatDateString = (d: Date) => d.toISOString().split("T")[0];

    const nextTwoDays = new Date(now);
    nextTwoDays.setDate(now.getDate() + 2);

    const nextFiveDays = new Date(now);
    nextFiveDays.setDate(now.getDate() + 5);

    const today = new Date(now);

    return [
      {
        id: "1",
        name: "Netflix",
        amount: 55.0,
        frequency: "monthly",
        nextBilling: formatDateString(nextTwoDays),
      },
      {
        id: "2",
        name: "Spotify",
        amount: 15.9,
        frequency: "monthly",
        nextBilling: formatDateString(nextFiveDays),
      },
      {
        id: "3",
        name: "iCloud",
        amount: 3.9,
        frequency: "monthly",
        nextBilling: formatDateString(today),
      },
    ];
  }, []);

  const wishlist = useMemo<WishlistItem[]>(
    () => [
      { id: "1", name: "iPhone 15 Pro", price: 4899, saved: 1200 },
      { id: "2", name: "Mechanical Keyboard", price: 450, saved: 450 },
      { id: "3", name: "Gaming Chair", price: 899, saved: 200 },
    ],
    []
  );

  const splits = useMemo<Split[]>(
    () => [
      { id: "1", person: "Ahmad", amount: 45.0, type: "owe" },
      { id: "2", person: "Sarah", amount: 12.5, type: "owed" },
      { id: "3", person: "Jason", amount: 30.0, type: "owed" },
    ],
    []
  );

  return {
    currency,
    formatCurrency,
    formatDate,
    getDaysLeft,
    totals: {
      spent: { raw: totals.spent, formatted: formatCurrency(totals.spent) },
      toPay: { raw: totals.toPay, formatted: formatCurrency(totals.toPay) },
      toClaim: { raw: totals.toClaim, formatted: formatCurrency(totals.toClaim) },
      budget: { raw: totals.budget, formatted: formatCurrency(totals.budget) },
    },
    budgets,
    bills,
    subscriptions,
    wishlist,
    splits,
  };
}
