import React, { useMemo, useState } from "react";
import { useOverlay } from "../contexts/overlayContext";
import { CategoryModal } from "../components/a/categoryModal";
import { CategoryAddModal } from "../components/a/categoryAdd";

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  isDefault?: boolean;
};

// Fixed master list of system categories
const SYSTEM_CATEGORIES: Category[] = [
  { id: "s1", name: "Food", icon: "silverware-fork-knife", color: "#FF9F43", isDefault: true },
  { id: "s2", name: "Transport", icon: "car", color: "#00CFE8", isDefault: true },
  { id: "s3", name: "Shopping", icon: "cart", color: "#7367F0", isDefault: true },
  { id: "s4", name: "Utilities", icon: "lightning-bolt", color: "#EA5455", isDefault: true },
];

export default function useCategory() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [customCategories, setCustomCategories] = useState<Category[]>([
    { id: "c1", name: "Entertainment", icon: "gamepad-variant", color: "#28C76F", isDefault: false },
  ]);
  
  const { showModal, hideModal, confirm, toast } = useOverlay();

  const categories = useMemo<Category[]>(() => {
    // System categories are ALWAYS available
    if (isEmpty) return SYSTEM_CATEGORIES;
    return [...customCategories, ...SYSTEM_CATEGORIES];
  }, [isEmpty, customCategories]);

  const openCategoryModal = (
    category: Category,
    options?: {
      onDelete?: (id: string) => void;
      onEdit?: (category: Category) => void;
    }
  ) => {
    const handleDelete = (id: string) => {
      confirm({
        title: "Delete Category",
        message: `Are you sure you want to delete "${category.name}"? This action cannot be undone.`,
        confirmText: "Delete",
        isDestructive: true,
        onConfirm: () => {
          setCustomCategories(prev => prev.filter(c => c.id !== id));
          options?.onDelete?.(id);
          toast(`Deleted ${category.name}`);
          hideModal();
        },
      });
    };

    showModal({
      content: (
        <CategoryModal
          category={category}
          onDelete={handleDelete}
          onEdit={options?.onEdit}
          onClose={hideModal}
        />
      ),
    });
  };

  const openAddCategoryModal = (onSave?: (data: any) => void) => {
    showModal({
      content: (
        <CategoryAddModal
          onClose={hideModal}
          onSave={(data) => {
            const newCat: Category = {
              id: Date.now().toString(),
              ...data,
              isDefault: false
            };
            setCustomCategories(prev => [newCat, ...prev]);
            onSave?.(data);
            toast(`Category "${data.name}" created`);
            hideModal();
          }}
        />
      ),
    });
  };

  return {
    categories,
    isEmpty,
    setIsEmpty,
    openCategoryModal,
    openAddCategoryModal,
    closeCategoryModal: hideModal,
  };
}
