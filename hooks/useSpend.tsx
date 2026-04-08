import { useMemo, useState, useCallback } from "react";
import { useOverlay } from "../contexts/overlayContext";
import SpendModal from "../components/a/spendAdd";
import useCategory from "./useCategory";

export type SpendTransaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
  merchant?: string;
};

type AddSpendInput = {
  amount: number;
  category: string;
  date: string;
  title: string;
  merchant?: string;
};

export default function useSpend() {
  const currency = "RM";
  const [isEmpty, setIsEmpty] = useState(false);
  const [transactions, setTransactions] = useState<SpendTransaction[]>([]);
  const { showModal, hideModal, toast } = useOverlay();
  
  // Use the master category hook
  const { categories: allCategories } = useCategory();

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const openAddSpendModal = useCallback(
    (onSubmit?: (data: AddSpendInput) => void) => {
      showModal({
        content: (
          <SpendModal
            onSubmit={(data: AddSpendInput) => {
              // Lookup visual details from master category list
              const catDetails = allCategories.find(c => c.name === data.category) || allCategories[0];
              
              const newTx: SpendTransaction = {
                id: Date.now().toString(),
                title: data.title,
                amount: data.amount,
                date: data.date,
                category: data.category,
                icon: catDetails?.icon || "cash",
                merchant: data.merchant,
              };

              setTransactions((prev) => [newTx, ...prev]);
              onSubmit?.(data);
              toast(`Recorded ${formatCurrency(data.amount)} for ${data.title}`);
              hideModal();
            }}
            onClose={hideModal}
          />
        ),
      });
    },
    [showModal, hideModal, allCategories, toast]
  );

  const spendData = useMemo(() => {
    if (isEmpty) {
      return {
        totalSpent: 0,
        categories: [],
        recentTransactions: [],
      };
    }

    const baseTransactions: SpendTransaction[] = [
      {
        id: "1",
        title: "Starbucks Coffee",
        amount: 18.5,
        date: new Date().toISOString(),
        category: "Food",
        icon: "coffee",
        merchant: "Starbucks",
      },
      {
        id: "2",
        title: "Grab Ride",
        amount: 25.0,
        date: new Date(Date.now() - 86400000).toISOString(),
        category: "Transport",
        icon: "car",
        merchant: "Grab",
      },
      {
        id: "3",
        title: "Uniqlo T-Shirt",
        amount: 79.9,
        date: new Date(Date.now() - 172800000).toISOString(),
        category: "Shopping",
        icon: "shopping",
        merchant: "Uniqlo",
      },
      {
        id: "4",
        title: "Village Grocer",
        amount: 145.2,
        date: new Date(Date.now() - 259200000).toISOString(),
        category: "Food",
        icon: "basket",
        merchant: "Village Grocer",
      },
    ];

    const allTransactions = [...transactions, ...baseTransactions];
    const totalSpent = allTransactions.reduce((sum, t) => sum + t.amount, 0);

    // Group transactions by category and enrichment with master category data
    const categoriesMap: Record<string, { amount: number; icon: string; color: string }> = {};
    
    allTransactions.forEach((t) => {
      if (!categoriesMap[t.category]) {
        const catDetails = allCategories.find(c => c.name === t.category);
        categoriesMap[t.category] = {
          amount: 0,
          icon: catDetails?.icon || "tag",
          color: catDetails?.color || "#4B4B4B"
        };
      }
      categoriesMap[t.category].amount += t.amount;
    });

    const categoriesList = Object.entries(categoriesMap).map(
      ([name, details]) => ({
        name,
        amount: details.amount,
        icon: details.icon,
        color: details.color
      })
    );

    return {
      totalSpent,
      categories: categoriesList,
      recentTransactions: allTransactions.sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    };
  }, [isEmpty, transactions, allCategories]);

  return {
    spendData,
    formatCurrency,
    isEmpty,
    setIsEmpty,
    openAddSpendModal,
  };
}
