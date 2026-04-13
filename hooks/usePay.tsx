import React, { useMemo, useState, useCallback } from "react";
import { useOverlay } from "../contexts/overlayContext";
import { PayAddModal } from "../components/a/payAdd";

export type Payable = {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  type: "bill" | "debt" | "friend" | "other";
  status: "pending" | "paid";
  toWhom?: string;
};

export default function usePay() {
  const currency = "RM";
  const [isEmpty, setIsEmpty] = useState(false);
  
  const [items, setItems] = useState<Payable[]>([
    { id: "1", title: "Credit Card", amount: 300.0, dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], type: "bill", status: "pending" },
    { id: "2", title: "Lunch debt", amount: 25.0, dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], type: "friend", status: "pending", toWhom: "Ahmad" },
    { id: "3", title: "Internet Bill", amount: 150.0, dueDate: new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0], type: "bill", status: "pending" },
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

  const payables = useMemo<Payable[]>(() => {
    if (isEmpty) return [];
    return [...items].sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (b.status === 'pending' && a.status !== 'pending') return 1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [isEmpty, items]);

  const totalToPay = useMemo(() => {
    if (isEmpty) return 0;
    return items.reduce((sum, item) => {
      return item.status === 'pending' ? sum + item.amount : sum;
    }, 0);
  }, [isEmpty, items]);

  const markAsPaid = useCallback((id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: "paid" } : item));
    toast("Marked as paid");
  }, [toast]);

  const deletePayable = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast("Item removed");
  }, [toast]);

  const openAddPayableModal = useCallback(() => {
    showModal({
      content: (
        <PayAddModal
          onClose={hideModal}
          onSubmit={(data) => {
            const newItem: Payable = {
              id: Date.now().toString(),
              ...data,
            };
            setItems(prev => [newItem, ...prev]);
            toast(`Payment "${data.title}" added`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  const openEditPayableModal = useCallback((item: Payable) => {
    showModal({
      content: (
        <PayAddModal
          initialData={item}
          onClose={hideModal}
          onMarkPaid={(id) => {
            markAsPaid(id);
            hideModal();
          }}
          onDelete={(id) => {
            deletePayable(id);
            hideModal();
          }}
          onSubmit={(data) => {
            setItems(prev => prev.map(i => i.id === item.id ? { ...i, ...data } : i));
            toast(`Payment "${data.title}" updated`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast, markAsPaid, deletePayable]);

  return {
    payables,
    totalToPay,
    formatCurrency,
    formatDate,
    getDaysLeft,
    isEmpty,
    setIsEmpty,
    markAsPaid,
    deletePayable,
    openAddPayableModal,
    openEditPayableModal
  };
}
