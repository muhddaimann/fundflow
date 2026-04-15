import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type OtherRoute = {
  id: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  path: string;
  description: string;
};

export default function useOthers() {
  const router = useRouter();

  const routes: OtherRoute[] = [
    {
      id: "activity",
      label: "Activity",
      icon: "history",
      path: "/home/activity",
      description: "Full history of app updates",
    },
    {
      id: "spend",
      label: "Spend",
      icon: "credit-card-outline",
      path: "/home/spend",
      description: "Detailed spending analysis",
    },
    {
      id: "pay",
      label: "Pay",
      icon: "arrow-up-circle-outline",
      path: "/home/pay",
      description: "Manage money you owe",
    },
    {
      id: "claim",
      label: "Claim",
      icon: "arrow-down-circle-outline",
      path: "/home/claim",
      description: "Track money owed to you",
    },
    {
      id: "budget",
      label: "Budget",
      icon: "chart-donut",
      path: "/home/budget",
      description: "Manage your spending limits",
    },
    {
      id: "subscription",
      label: "Subscriptions",
      icon: "repeat",
      path: "/home/subscription",
      description: "Track your recurring payments",
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: "heart-outline",
      path: "/home/wishlist",
      description: "Items you want to buy later",
    },
    {
      id: "bills",
      label: "Bills",
      icon: "file-document-outline",
      path: "/home/bills",
      description: "Upcoming utilities and payments",
    },
    {
      id: "goals",
      label: "Goals",
      icon: "flag-outline",
      path: "/home/goals",
      description: "Save for your future milestones",
    },
    {
      id: "split",
      label: "Split Bill",
      icon: "account-multiple-outline",
      path: "/home/split",
      description: "Share expenses with friends",
    },
    {
      id: "tools",
      label: "Financial Tools",
      icon: "calculator-variant-outline",
      path: "/home/tools",
      description: "Calculators and helper tools",
    },
    {
      id: "category",
      label: "Categories",
      icon: "tag-outline",
      path: "/home/category",
      description: "Manage your expense categories",
    },
    {
        id: "transaction",
        label: "Transactions",
        icon: "history",
        path: "/home/transaction",
        description: "View all your past activities",
    }
  ];

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return {
    routes,
    navigateTo,
  };
}
