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

export type CarouselItemState = {
  isEmpty: boolean;
  hasData: boolean;
};

export type CarouselDummy = {
  title: string;
  subtitle: string;
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
    ];
  }, [isEmpty]);

  const carouselState = useMemo(() => {
    return {
      budget: { isEmpty, hasData: !isEmpty },
      goal: { isEmpty, hasData: !isEmpty },
      pay: { isEmpty, hasData: totals.pay > 0 },
      claim: { isEmpty, hasData: totals.claim > 0 },
      bills: { isEmpty, hasData: !isEmpty },
      subs: { isEmpty, hasData: !isEmpty },
      wishlist: { isEmpty, hasData: !isEmpty },
    };
  }, [isEmpty, totals]);

  const carouselDummy = useMemo<Record<string, CarouselDummy>>(() => {
    return {
      budget: {
        title: "No Budget Yet",
        subtitle: "Set a monthly budget to track spending",
        icon: "chart-donut",
      },
      goal: {
        title: "No Goals Yet",
        subtitle: "Start saving for something meaningful",
        icon: "flag-outline",
      },
      pay: {
        title: "Nothing to Pay",
        subtitle: "You're all clear 🎉",
        icon: "arrow-top-right",
      },
      claim: {
        title: "No Claims",
        subtitle: "No pending incoming payments",
        icon: "arrow-bottom-left",
      },
      bills: {
        title: "No Bills",
        subtitle: "Add recurring expenses",
        icon: "file-document-outline",
      },
      subs: {
        title: "No Subscriptions",
        subtitle: "Track your recurring services",
        icon: "repeat",
      },
      wishlist: {
        title: "Wishlist Empty",
        subtitle: "Add things you want to save for",
        icon: "heart-outline",
      },
    };
  }, []);

  return {
    greeting,
    today,
    initials,
    isEmpty,
    setIsEmpty,
    totals,
    recentActivities,
    recentTransactions,
    carouselState,
    carouselDummy,
    formatCurrency,
  };
}
