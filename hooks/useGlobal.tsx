import { useMemo } from "react";
import { useGlobalContext } from "../contexts/globalContext";
import { useTheme } from "react-native-paper";

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
  color: string;
  details: Record<string, any>;
};

export type CarouselDummy = {
  title: string;
  subtitle: string;
  icon: string;
};

export default function useGlobal(name?: string) {
  const { isEmpty, setIsEmpty } = useGlobalContext();
  const { colors } = useTheme();
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
    if (isEmpty) {
      return {
        budget: {
          isEmpty,
          hasData: false,
          color: colors.primary,
          details: { total: 0, spent: 0, percent: 0 },
        },
        goal: {
          isEmpty,
          hasData: false,
          color: colors.primary,
          details: { total: 0, saved: 0, percent: 0 },
        },
        pay: {
          isEmpty,
          hasData: false,
          color: colors.secondary,
          details: { count: 0 },
        },
        claim: {
          isEmpty,
          hasData: false,
          color: colors.secondary,
          details: { count: 0 },
        },
        bills: {
          isEmpty,
          hasData: false,
          color: colors.secondary,
          details: { count: 0 },
        },
        subs: {
          isEmpty,
          hasData: false,
          color: colors.secondary,
          details: { count: 0 },
        },
        wishlist: {
          isEmpty,
          hasData: false,
          color: colors.primary,
          details: { count: 0 },
        },
      };
    }

    return {
      budget: {
        isEmpty,
        hasData: true,
        color: colors.primary,
        details: {
          total: 3500,
          spent: totals.spend,
          percent: totals.spend / 3500,
        },
      },
      goal: {
        isEmpty,
        hasData: true,
        color: colors.primary,
        details: {
          title: "Rumah Idaman",
          total: 50000,
          saved: 12000,
          percent: 0.24,
        },
      },
      pay: {
        isEmpty,
        hasData: totals.pay > 0,
        color: colors.secondary,
        details: { count: 3, total: totals.pay },
      },
      claim: {
        isEmpty,
        hasData: totals.claim > 0,
        color: colors.secondary,
        details: { count: 2, total: totals.claim },
      },
      bills: {
        isEmpty,
        hasData: true,
        color: colors.secondary,
        details: { count: 5, total: 850, pending: 3 },
      },
      subs: {
        isEmpty,
        hasData: true,
        color: colors.secondary,
        details: { count: 4, total: 120, active: 4 },
      },
      wishlist: {
        isEmpty,
        hasData: true,
        color: colors.primary,
        details: { count: 8, total: 2500 },
      },
    };
  }, [isEmpty, totals, colors]);

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
