import { useMemo } from "react";

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  saved: number;
};

export default function useWishlist() {
  const currency = "RM";

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const wishlist = useMemo<WishlistItem[]>(
    () => [
      { id: "1", name: "iPhone 15 Pro", price: 4899, saved: 1200 },
      { id: "2", name: "Mechanical Keyboard", price: 450, saved: 450 },
      { id: "3", name: "Gaming Chair", price: 899, saved: 200 },
    ],
    []
  );

  return { wishlist, formatCurrency };
}
