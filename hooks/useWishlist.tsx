import React, { useMemo, useState, useCallback } from "react";
import { useOverlay } from "../contexts/overlayContext";
import { WishlistAddModal } from "../components/a/wishlistAdd";

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  saved: number;
};

export default function useWishlist() {
  const currency = "RM";
  const [isEmpty, setIsEmpty] = useState(false);
  const [items, setItems] = useState<WishlistItem[]>([
    { id: "1", name: "iPhone 15 Pro", price: 4899, saved: 1200 },
    { id: "2", name: "Mechanical Keyboard", price: 450, saved: 450 },
    { id: "3", name: "Gaming Chair", price: 899, saved: 200 },
  ]);

  const { showModal, hideModal, toast } = useOverlay();

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const wishlist = useMemo<WishlistItem[]>(() => {
    if (isEmpty) return [];
    return items.sort((a, b) => (b.saved / b.price) - (a.saved / a.price));
  }, [isEmpty, items]);

  const totalValue = useMemo(() => {
    if (isEmpty) return 0;
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [isEmpty, items]);

  const totalSaved = useMemo(() => {
    if (isEmpty) return 0;
    return items.reduce((sum, item) => sum + item.saved, 0);
  }, [isEmpty, items]);

  const openAddWishlistModal = useCallback(() => {
    showModal({
      content: (
        <WishlistAddModal
          onClose={hideModal}
          onSubmit={(data) => {
            const newItem: WishlistItem = {
              id: Date.now().toString(),
              ...data,
            };
            setItems(prev => [newItem, ...prev]);
            toast(`"${data.name}" added to wishlist`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  const openEditWishlistModal = useCallback((item: WishlistItem) => {
    showModal({
      content: (
        <WishlistAddModal
          initialData={item}
          onClose={hideModal}
          onSubmit={(data) => {
            setItems(prev => prev.map(i => i.id === item.id ? { ...i, ...data } : i));
            toast(`"${data.name}" updated`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  return {
    wishlist,
    totalValue,
    totalSaved,
    formatCurrency,
    isEmpty,
    setIsEmpty,
    openAddWishlistModal,
    openEditWishlistModal,
  };
}
