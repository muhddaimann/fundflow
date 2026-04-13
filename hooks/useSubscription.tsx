import React, { useMemo, useState, useCallback } from "react";
import { useOverlay } from "../contexts/overlayContext";
import { SubscriptionAddModal } from "../components/a/subsAdd";

export type Subscription = {
  id: string;
  name: string;
  amount: number;
  frequency: "monthly" | "yearly";
  nextBilling: string;
};

export default function useSubscription() {
  const currency = "RM";
  const [isEmpty, setIsEmpty] = useState(false);
  const [subs, setSubs] = useState<Subscription[]>([
    { id: "1", name: "Netflix", amount: 55.0, frequency: "monthly", nextBilling: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0] },
    { id: "2", name: "Spotify", amount: 15.9, frequency: "monthly", nextBilling: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0] },
    { id: "3", name: "iCloud", amount: 3.9, frequency: "monthly", nextBilling: new Date().toISOString().split('T')[0] },
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

  const subscriptions = useMemo<Subscription[]>(() => {
    if (isEmpty) return [];
    return subs.sort((a, b) => new Date(a.nextBilling).getTime() - new Date(b.nextBilling).getTime());
  }, [isEmpty, subs]);

  const totalMonthly = useMemo(() => {
    if (isEmpty) return 0;
    return subs.reduce((sum, sub) => {
      const monthlyAmount = sub.frequency === "monthly" ? sub.amount : sub.amount / 12;
      return sum + monthlyAmount;
    }, 0);
  }, [isEmpty, subs]);

  const openAddSubscriptionModal = useCallback(() => {
    showModal({
      content: (
        <SubscriptionAddModal
          onClose={hideModal}
          onSubmit={(data) => {
            const newSub: Subscription = {
              id: Date.now().toString(),
              ...data,
            };
            setSubs(prev => [newSub, ...prev]);
            toast(`Subscription "${data.name}" added`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  const openEditSubscriptionModal = useCallback((sub: Subscription) => {
    showModal({
      content: (
        <SubscriptionAddModal
          initialData={sub}
          onClose={hideModal}
          onSubmit={(data) => {
            setSubs(prev => prev.map(s => s.id === sub.id ? { ...s, ...data } : s));
            toast(`Subscription "${data.name}" updated`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  return { 
    subscriptions, 
    totalMonthly,
    formatCurrency, 
    formatDate, 
    getDaysLeft,
    isEmpty,
    setIsEmpty,
    openAddSubscriptionModal,
    openEditSubscriptionModal
  };
}
