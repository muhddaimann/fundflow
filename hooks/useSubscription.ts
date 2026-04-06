import { useMemo } from "react";

export type Subscription = {
  id: string;
  name: string;
  amount: number;
  frequency: "monthly" | "yearly";
  nextBilling: string;
};

export default function useSubscription() {
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
    return `${diffDays} days left`;
  };

  const subscriptions = useMemo<Subscription[]>(() => {
    const now = new Date();
    const formatDateString = (d: Date) => d.toISOString().split("T")[0];

    const nextTwoDays = new Date(now);
    nextTwoDays.setDate(now.getDate() + 2);

    const nextFiveDays = new Date(now);
    nextFiveDays.setDate(now.getDate() + 5);

    const today = new Date(now);

    return [
      { id: "1", name: "Netflix", amount: 55.0, frequency: "monthly", nextBilling: formatDateString(nextTwoDays) },
      { id: "2", name: "Spotify", amount: 15.9, frequency: "monthly", nextBilling: formatDateString(nextFiveDays) },
      { id: "3", name: "iCloud", amount: 3.9, frequency: "monthly", nextBilling: formatDateString(today) },
    ];
  }, []);

  return { subscriptions, formatCurrency, formatDate, getDaysLeft };
}
