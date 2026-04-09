import React, { useMemo, useState, useCallback } from "react";
import { useOverlay } from "../contexts/overlayContext";
import { BudgetAddModal } from "../components/a/budgetAdd";
import useCategory from "./useCategory";
import useSpend from "./useSpend";

export type Budget = {
  category: string;
  limit: number;
  spent: number;
  remaining: number;
  percentage: number;
  icon: string;
  color: string;
};

export default function useBudget() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [budgetLimits, setBudgetLimits] = useState<Record<string, number>>({
    "Food": 800,
    "Transport": 300,
    "Shopping": 500,
  });

  const { showModal, hideModal, toast } = useOverlay();
  const { categories: allCategories } = useCategory();
  const { spendData, formatCurrency } = useSpend();

  const budgets = useMemo<Budget[]>(() => {
    if (isEmpty) return [];

    return Object.entries(budgetLimits).map(([categoryName, limit]) => {
      // Find category visual details
      const catDetails = allCategories.find(c => c.name === categoryName);
      
      // Find actual spending for this category
      const spentDetails = spendData.categories.find(c => c.name === categoryName);
      const spent = spentDetails?.amount || 0;
      
      return {
        category: categoryName,
        limit,
        spent,
        remaining: limit - spent,
        percentage: (spent / limit) * 100,
        icon: catDetails?.icon || "tag",
        color: catDetails?.color || "#4B4B4B",
      };
    });
  }, [isEmpty, budgetLimits, allCategories, spendData.categories]);

  const totalBudgeted = useMemo(() => 
    budgets.reduce((sum, b) => sum + b.limit, 0), 
  [budgets]);

  const totalSpent = useMemo(() => 
    budgets.reduce((sum, b) => sum + b.spent, 0), 
  [budgets]);

  const openAddBudgetModal = useCallback(() => {
    showModal({
      content: (
        <BudgetAddModal
          onClose={hideModal}
          onSubmit={(data) => {
            setBudgetLimits(prev => ({
              ...prev,
              [data.categoryName]: data.limit
            }));
            toast(`Budget for ${data.categoryName} set to ${formatCurrency(data.limit)}`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, formatCurrency, toast]);

  const openEditBudgetModal = useCallback((budget: Budget) => {
    showModal({
      content: (
        <BudgetAddModal
          initialData={{ categoryName: budget.category, limit: budget.limit }}
          onClose={hideModal}
          onSubmit={(data) => {
            setBudgetLimits(prev => ({
              ...prev,
              [data.categoryName]: data.limit
            }));
            toast(`Budget for ${data.categoryName} updated`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  return {
    budgets,
    totalBudgeted,
    totalSpent,
    isEmpty,
    setIsEmpty,
    formatCurrency,
    openAddBudgetModal,
    openEditBudgetModal,
  };
}
