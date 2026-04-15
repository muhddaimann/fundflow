import { useMemo, useState } from "react";
import { useGlobalContext } from "../contexts/globalContext";
import { RecentActivity, ActivityType } from "./useGlobal";

export default function useActivity() {
  const { isEmpty } = useGlobalContext();
  const [filter, setFilter] = useState<ActivityType | "all">("all");

  const activities = useMemo<RecentActivity[]>(() => {
    if (isEmpty) return [];
    
    // Mocking a larger set of data for the dedicated activity page
    const data: RecentActivity[] = [
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
      {
        id: "6",
        title: "Uniqlo T-Shirt",
        subtitle: "Shopping",
        amount: 79.9,
        type: "spend",
        time: "3 days ago",
        icon: "shopping",
      },
      {
        id: "7",
        title: "Rent Payment",
        subtitle: "Housing",
        amount: 1200.0,
        type: "spend",
        time: "Last Week",
        icon: "home-outline",
      },
      {
        id: "8",
        title: "Emergency Fund",
        subtitle: "New Goal Created",
        type: "goal",
        time: "Last Week",
        icon: "piggy-bank-outline",
        color: "#28C76F",
      }
    ];

    if (filter === "all") return data;
    return data.filter(item => item.type === filter);
  }, [isEmpty, filter]);

  return {
    activities,
    filter,
    setFilter,
    isEmpty
  };
}
