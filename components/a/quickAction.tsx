import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

type ActionItem = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
};

export default function QuickAction() {
  const { colors } = useTheme();
  const tokens = useDesign();

  const actions: ActionItem[] = [
    { label: "Claim", icon: "ticket-percent-outline", onPress: () => router.push("/home/claim") },
    { label: "Budget", icon: "chart-donut", onPress: () => router.push("/home/budget") },
    { label: "Subs", icon: "repeat", onPress: () => router.push("/home/subscription") },
    { label: "Wishlist", icon: "heart-outline", onPress: () => router.push("/home/wishlist") },
    { label: "Bills", icon: "file-document-outline", onPress: () => router.push("/home/bills") },
    { label: "Goals", icon: "flag-outline", onPress: () => router.push("/home/goals") },
    { label: "Split", icon: "account-multiple-outline", onPress: () => router.push("/home/split") },
    { label: "Tools", icon: "calculator-variant-outline", onPress: () => router.push("/home/tools") },
  ];

  const renderRow = (items: ActionItem[]) => (
    <View style={{ flexDirection: "row", gap: tokens.spacing.sm }}>
      {items.map((item, idx) => (
        <Pressable
          key={idx}
          onPress={item.onPress}
          style={({ pressed }) => ({
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.radii.lg,
            borderWidth: 1,
            borderColor: colors.outlineVariant,
            backgroundColor: pressed ? colors.surfaceVariant : "transparent",
            transform: [{ scale: pressed ? 0.96 : 1 }],
          })}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={tokens.sizes.icon.md}
            color={colors.onSurfaceVariant}
          />
          <Text
            style={{
              fontSize: tokens.typography.sizes.xs,
              color: colors.onSurfaceVariant,
            }}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View
      style={{ paddingHorizontal: tokens.spacing.md, gap: tokens.spacing.sm }}
    >
      {renderRow(actions.slice(0, 4))}
      {renderRow(actions.slice(4, 8))}
    </View>
  );
}
