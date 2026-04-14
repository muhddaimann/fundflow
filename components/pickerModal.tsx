import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useSpend from "../hooks/useSpend";
import useBudget from "../hooks/useBudget";
import useSubscription from "../hooks/useSubscription";
import useBills from "../hooks/useBills";
import useGoals from "../hooks/useGoals";
import useSplit from "../hooks/useSplit";
import useWishlist from "../hooks/useWishlist";
import usePay from "../hooks/usePay";
import useClaim from "../hooks/useClaim";

type PickerItem = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  onPress: () => void;
};

export function PickerModal({ onClose }: { onClose: () => void }) {
  const { colors } = useTheme();
  const tokens = useDesign();

  const { openAddSpendModal } = useSpend();
  const { openAddBudgetModal } = useBudget();
  const { openAddSubscriptionModal } = useSubscription();
  const { openAddBillModal } = useBills();
  const { openAddGoalModal } = useGoals();
  const { openCreateGroupModal } = useSplit();
  const { openAddWishlistModal } = useWishlist();
  const { openAddPayableModal } = usePay();
  const { openAddClaimModal } = useClaim();

  const items: PickerItem[] = [
    {
      label: "Log Spend",
      icon: "plus-circle-outline",
      color: colors.primary,
      onPress: () => openAddSpendModal((data) => console.log("Spent:", data)),
    },
    {
      label: "To Pay",
      icon: "arrow-up-circle-outline",
      color: colors.error,
      onPress: openAddPayableModal,
    },
    {
      label: "To Claim",
      icon: "arrow-down-circle-outline",
      color: colors.tertiary,
      onPress: openAddClaimModal,
    },
    {
      label: "Set Budget",
      icon: "chart-donut",
      color: "#FF9F43",
      onPress: openAddBudgetModal,
    },
    {
      label: "New Bill",
      icon: "file-document-outline",
      color: "#00CFE8",
      onPress: openAddBillModal,
    },
    {
      label: "Subscription",
      icon: "repeat",
      color: colors.secondary,
      onPress: openAddSubscriptionModal,
    },
    {
      label: "Set Goal",
      icon: "flag-outline",
      color: "#EA5455",
      onPress: openAddGoalModal,
    },
    {
      label: "Create Team",
      icon: "account-multiple-plus-outline",
      color: "#7367F0",
      onPress: openCreateGroupModal,
    },
    {
      label: "Wishlist",
      icon: "heart-outline",
      color: "#FF6B6B",
      onPress: openAddWishlistModal,
    },
  ];

  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <View style={{ gap: 4 }}>
        <Text
          variant="headlineSmall"
          style={{
            fontFamily: tokens.typography.families.bold,
            fontWeight: "800",
          }}
        >
          Quick Action
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: colors.onSurfaceVariant, fontWeight: "500" }}
        >
          Choose what you want to add or track
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: tokens.spacing.md,
          justifyContent: "space-between",
        }}
      >
        {items.map((item, idx) => (
          <Pressable
            key={idx}
            onPress={() => {
              onClose();
              // Delay slightly to allow picker modal to close before opening next modal
              setTimeout(item.onPress, 100);
            }}
            style={({ pressed }) => ({
              width: "30%",
              alignItems: "center",
              gap: tokens.spacing.xs,
              paddingVertical: tokens.spacing.sm,
              borderRadius: tokens.radii.lg,
              backgroundColor: pressed ? colors.surfaceVariant : "transparent",
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: tokens.radii.md,
                backgroundColor: item.color + "15",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: item.color + "25",
              }}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={28}
                color={item.color}
              />
            </View>
            <Text
              variant="labelMedium"
              style={{
                textAlign: "center",
                fontFamily: tokens.typography.families.medium,
                fontWeight: "600",
                color: colors.onSurface,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
