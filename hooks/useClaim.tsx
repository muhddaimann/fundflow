import React, { useMemo, useState, useCallback } from "react";
import { useOverlay } from "../contexts/overlayContext";
import { ClaimAddModal } from "../components/a/claimAdd";

export type Claimable = {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: "reimbursement" | "friend" | "other";
  status: "pending" | "received";
  fromWhom?: string;
};

export default function useClaim() {
  const currency = "RM";
  const [isEmpty, setIsEmpty] = useState(false);
  
  const [items, setItems] = useState<Claimable[]>([
    { id: "1", title: "Travel Claim", amount: 45.0, date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], type: "reimbursement", status: "pending" },
    { id: "2", title: "Lunch with Ming", amount: 25.0, date: new Date(Date.now() - 86400000).toISOString().split('T')[0], type: "friend", status: "pending", fromWhom: "Ming" },
    { id: "3", title: "Medical Claim", amount: 75.0, date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0], type: "reimbursement", status: "received" },
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

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    const diffTime = today.getTime() - target.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)}d from now`;
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const claims = useMemo<Claimable[]>(() => {
    if (isEmpty) return [];
    return [...items].sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (b.status === 'pending' && a.status !== 'pending') return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [isEmpty, items]);

  const totalToClaim = useMemo(() => {
    if (isEmpty) return 0;
    return items.reduce((sum, item) => {
      return item.status === 'pending' ? sum + item.amount : sum;
    }, 0);
  }, [isEmpty, items]);

  const markAsReceived = useCallback((id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: "received" } : item));
    toast("Marked as received");
  }, [toast]);

  const deleteClaim = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast("Claim removed");
  }, [toast]);

  const openAddClaimModal = useCallback(() => {
    showModal({
      content: (
        <ClaimAddModal
          onClose={hideModal}
          onSubmit={(data) => {
            const newItem: Claimable = {
              id: Date.now().toString(),
              ...data,
            };
            setItems(prev => [newItem, ...prev]);
            toast(`Claim "${data.title}" added`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  const openEditClaimModal = useCallback((item: Claimable) => {
    showModal({
      content: (
        <ClaimAddModal
          initialData={item}
          onClose={hideModal}
          onMarkReceived={(id) => {
            markAsReceived(id);
            hideModal();
          }}
          onDelete={(id) => {
            deleteClaim(id);
            hideModal();
          }}
          onSubmit={(data) => {
            setItems(prev => prev.map(i => i.id === item.id ? { ...i, ...data } : i));
            toast(`Claim "${data.title}" updated`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast, markAsReceived, deleteClaim]);

  return {
    claims,
    totalToClaim,
    formatCurrency,
    formatDate,
    getTimeAgo,
    isEmpty,
    setIsEmpty,
    markAsReceived,
    deleteClaim,
    openAddClaimModal,
    openEditClaimModal
  };
}
