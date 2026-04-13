import { useState, useMemo, useCallback } from "react";
import { useGlobalContext } from "../contexts/globalContext";

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: "info" | "warning" | "success" | "error";
};

export default function useNotification() {
  const { isEmpty } = useGlobalContext();
  
  const [items, setItems] = useState<Notification[]>([
    {
      id: "1",
      title: "Budget Alert",
      message: "You have reached 80% of your Food budget for April.",
      time: "Today, 10:30 AM",
      isRead: false,
      type: "warning",
    },
    {
      id: "2",
      title: "Payment Received",
      message: "Ahmad paid you RM25.00 for Lunch debt.",
      time: "Today, 09:15 AM",
      isRead: false,
      type: "success",
    },
    {
      id: "3",
      title: "Bill Reminder",
      message: "Your Internet Bill (RM150.00) is due in 3 days.",
      time: "Yesterday, 02:00 PM",
      isRead: true,
      type: "info",
    },
    {
      id: "4",
      title: "Goal Reached!",
      message: "Congratulations! You've reached your 'New Phone' savings goal.",
      time: "2 days ago",
      isRead: true,
      type: "success",
    },
    {
      id: "5",
      title: "Security Login",
      message: "New login detected from a Chrome browser on Windows.",
      time: "3 days ago",
      isRead: true,
      type: "info",
    },
    {
      id: "6",
      title: "Subscription Renewal",
      message: "Netflix subscription will renew tomorrow (RM55.00).",
      time: "Last week",
      isRead: true,
      type: "warning",
    },
  ]);

  const notifications = useMemo(() => {
    if (isEmpty) return [];
    return [...items].sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1));
  }, [isEmpty, items]);

  const unreadCount = useMemo(() => {
    if (isEmpty) return 0;
    return items.filter((n) => !n.isRead).length;
  }, [isEmpty, items]);

  const markAsRead = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  };
}
