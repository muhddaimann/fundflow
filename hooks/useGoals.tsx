import React, { useMemo, useState, useCallback } from "react";
import { useOverlay } from "../contexts/overlayContext";
import { GoalAddModal } from "../components/a/goalAdd";

export type Goal = {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
};

export default function useGoals() {
  const currency = "RM";
  const [isEmpty, setIsEmpty] = useState(false);
  const [items, setItems] = useState<Goal[]>([
    { id: "1", title: "Emergency Fund", target: 10000, current: 4500, deadline: "2026-12-31" },
    { id: "2", title: "New Laptop", target: 5000, current: 1200, deadline: "2026-06-15" },
    { id: "3", title: "Vacation", target: 3000, current: 2500, deadline: "2026-08-20" },
  ]);

  const { showModal, hideModal, toast } = useOverlay();

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
      year: "numeric"
    });
  };

  const getDaysLeft = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `Deadline passed`;
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "1 day left";
    if (diffDays > 365) return `${(diffDays / 365).toFixed(1)} years left`;
    return `${diffDays} days left`;
  };

  const goals = useMemo<Goal[]>(() => {
    if (isEmpty) return [];
    return [...items].sort((a, b) => (b.current / b.target) - (a.current / a.target));
  }, [isEmpty, items]);

  const totalTarget = useMemo(() => {
    if (isEmpty) return 0;
    return items.reduce((sum, item) => sum + item.target, 0);
  }, [isEmpty, items]);

  const totalCurrent = useMemo(() => {
    if (isEmpty) return 0;
    return items.reduce((sum, item) => sum + item.current, 0);
  }, [isEmpty, items]);

  const openAddGoalModal = useCallback(() => {
    showModal({
      content: (
        <GoalAddModal
          onClose={hideModal}
          onSubmit={(data) => {
            const newItem: Goal = {
              id: Date.now().toString(),
              ...data,
            };
            setItems(prev => [newItem, ...prev]);
            toast(`Goal "${data.title}" set`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  const openEditGoalModal = useCallback((goal: Goal) => {
    showModal({
      content: (
        <GoalAddModal
          initialData={goal}
          onClose={hideModal}
          onSubmit={(data) => {
            setItems(prev => prev.map(i => i.id === goal.id ? { ...i, ...data } : i));
            toast(`Goal "${data.title}" updated`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  return {
    goals,
    totalTarget,
    totalCurrent,
    formatCurrency,
    formatDate,
    getDaysLeft,
    isEmpty,
    setIsEmpty,
    openAddGoalModal,
    openEditGoalModal,
  };
}
