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

export default function useCategory() {
  const [isEmpty, setIsEmpty] = useState(false);
  const { showModal, hideModal, confirm, toast } = useOverlay();

  const allCategories: Category[] = [
    {
      id: "1",
      name: "Food",
      icon: "silverware-fork-knife",
      color: "#FF9F43",
      isDefault: true,
    },
    {
      id: "2",
      name: "Transport",
      icon: "car",
      color: "#00CFE8",
      isDefault: true,
    },
    {
      id: "3",
      name: "Shopping",
      icon: "cart",
      color: "#7367F0",
      isDefault: true,
    },
    {
      id: "4",
      name: "Entertainment",
      icon: "gamepad-variant",
      color: "#28C76F",
      isDefault: false,
    },
    {
      id: "5",
      name: "Utilities",
      icon: "lightning-bolt",
      color: "#EA5455",
      isDefault: true,
    },
  ];

  const categories = useMemo<Category[]>(() => {
    if (isEmpty) return allCategories.filter((cat) => cat.isDefault);
    return allCategories;
  }, [isEmpty]);

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
