import React, { useMemo, useState, useCallback } from "react";
import { useOverlay } from "../contexts/overlayContext";
import { BillAddModal } from "../components/a/billAdd";

export type Bill = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
};

export default function useBills() {
  const currency = "RM";
  const [isEmpty, setIsEmpty] = useState(false);
  
  const [items, setItems] = useState<Bill[]>([
    { id: "1", name: "Rent", amount: 1200, dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], status: "pending" },
    { id: "2", name: "Electricity", amount: 85.5, dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], status: "paid" },
    { id: "3", name: "Water", amount: 20.0, dueDate: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0], status: "overdue" },
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
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)}d ago`;
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  const bills = useMemo<Bill[]>(() => {
    if (isEmpty) return [];
    return [...items].sort((a, b) => {
      // Sort priority: Overdue first, then by date
      if (a.status === 'overdue' && b.status !== 'overdue') return -1;
      if (b.status === 'overdue' && a.status !== 'overdue') return 1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [isEmpty, items]);

  const totalPending = useMemo(() => {
    if (isEmpty) return 0;
    return items.reduce((sum, item) => {
      return (item.status === 'pending' || item.status === 'overdue') ? sum + item.amount : sum;
    }, 0);
  }, [isEmpty, items]);

  const overdueCount = useMemo(() => {
    if (isEmpty) return 0;
    return items.filter(i => i.status === 'overdue').length;
  }, [isEmpty, items]);

  const openAddBillModal = useCallback(() => {
    showModal({
      content: (
        <BillAddModal
          onClose={hideModal}
          onSubmit={(data) => {
            const newBill: Bill = {
              id: Date.now().toString(),
              ...data,
            };
            setItems(prev => [newBill, ...prev]);
            toast(`Bill "${data.name}" added`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  const openEditBillModal = useCallback((bill: Bill) => {
    showModal({
      content: (
        <BillAddModal
          initialData={bill}
          onClose={hideModal}
          onSubmit={(data) => {
            setItems(prev => prev.map(i => i.id === bill.id ? { ...i, ...data } : i));
            toast(`Bill "${data.name}" updated`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  return {
    bills,
    totalPending,
    overdueCount,
    formatCurrency,
    formatDate,
    getDaysLeft,
    isEmpty,
    setIsEmpty,
    openAddBillModal,
    openEditBillModal
  };
}
