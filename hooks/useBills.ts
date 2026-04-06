import { useMemo } from "react";

export type Bill = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
};

export default function useBills() {
  const currency = "RM";

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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
      { id: "1", name: "Rent", amount: 1200, dueDate: formatDateString(nextWeek), status: "pending" },
      { id: "2", name: "Electricity", amount: 85.5, dueDate: formatDateString(yesterday), status: "paid" },
      { id: "3", name: "Water", amount: 20.0, dueDate: formatDateString(threeDaysAgo), status: "overdue" },
    ];
  }, []);

  return { bills, formatCurrency, formatDate, getDaysLeft };
}
