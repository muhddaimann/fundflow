import React, { useMemo, useState, useCallback } from "react";
import { useOverlay } from "../contexts/overlayContext";
import { GroupAddModal } from "../components/a/groupAdd";
import { SplitAddModal } from "../components/a/splitAdd";

export type GroupExpense = {
  id: string;
  title: string;
  amount: number;
  payer: string;
  date: string;
};

export type Group = {
  id: string;
  name: string;
  members: string[];
  expenses: GroupExpense[];
};

export default function useSplit() {
  const currency = "RM";
  const [isEmpty, setIsEmpty] = useState(false);
  const [groups, setGroups] = useState<Group[]>([
    { 
      id: "1", 
      name: "Trip to KL", 
      members: ["You", "Ahmad", "Sarah"],
      expenses: [
        { id: "e1", title: "Lunch at Pavilion", amount: 150, payer: "Ahmad", date: new Date().toISOString() },
        { id: "e2", title: "Taxi Ride", amount: 45, payer: "You", date: new Date().toISOString() },
      ]
    },
    { 
      id: "2", 
      name: "Housemates", 
      members: ["You", "Jason", "Ming"],
      expenses: [
        { id: "e3", title: "Internet Bill", amount: 120, payer: "Jason", date: new Date().toISOString() },
      ]
    }
  ]);

  const { showModal, hideModal, toast } = useOverlay();

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getGroupById = useCallback((id: string) => {
    return groups.find(g => g.id === id);
  }, [groups]);

  const groupList = useMemo(() => {
    if (isEmpty) return [];
    return groups;
  }, [isEmpty, groups]);

  const calculateBalances = (group: Group) => {
    const balances: Record<string, number> = {};
    group.members.forEach(m => balances[m] = 0);

    group.expenses.forEach(exp => {
      const share = exp.amount / group.members.length;
      group.members.forEach(m => {
        if (m === exp.payer) {
          balances[m] += (exp.amount - share);
        } else {
          balances[m] -= share;
        }
      });
    });

    return balances;
  };

  const openCreateGroupModal = useCallback(() => {
    showModal({
      content: (
        <GroupAddModal
          onClose={hideModal}
          onSubmit={(data) => {
            const newGroup: Group = {
              id: Date.now().toString(),
              name: data.name,
              members: data.members,
              expenses: [],
            };
            setGroups(prev => [newGroup, ...prev]);
            toast(`Team "${data.name}" created`);
            hideModal();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast]);

  const openAddExpenseModal = useCallback((groupId: string, onSuccess?: () => void) => {
    const targetGroup = groups.find(g => g.id === groupId);
    if (!targetGroup) return;

    showModal({
      content: (
        <SplitAddModal
          members={targetGroup.members}
          onClose={hideModal}
          onSubmit={(data) => {
            const newExpense: GroupExpense = {
              id: Date.now().toString(),
              ...data,
              date: new Date().toISOString()
            };
            setGroups(prev => prev.map(g => 
              g.id === groupId ? { ...g, expenses: [newExpense, ...g.expenses] } : g
            ));
            toast(`Expense added to ${targetGroup.name}`);
            hideModal();
            onSuccess?.();
          }}
        />
      ),
    });
  }, [showModal, hideModal, toast, groups]);

  return {
    groups: groupList,
    getGroupById,
    formatCurrency,
    calculateBalances,
    isEmpty,
    setIsEmpty,
    openCreateGroupModal,
    openAddExpenseModal,
  };
}
