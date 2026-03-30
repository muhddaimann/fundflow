import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ActionItem = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
};

const actions: ActionItem[] = [
  { label: "Claim", icon: "ticket-percent-outline" },
  { label: "Budget", icon: "chart-donut" },
  { label: "Subs", icon: "repeat" },
  { label: "Wishlist", icon: "heart-outline" },
  { label: "Bills", icon: "file-document-outline" },
  { label: "Goals", icon: "flag-outline" },
  { label: "Split", icon: "account-multiple-outline" },
  { label: "More", icon: "dots-horizontal" },
];

export default function QuickAction() {
  const { colors } = useTheme();
  const tokens = useDesign();

  return (
    <View
      style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.sm }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: tokens.spacing.sm,
        }}
      >
        {actions.slice(0, 4).map((item, idx) => (
          <Pressable
            key={idx}
            onPress={item.onPress}
            style={({ pressed }) => ({
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: tokens.spacing.xs,
              borderRadius: tokens.radii.lg,
              backgroundColor: colors.surfaceVariant,
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

      <View
        style={{
          flexDirection: "row",
          gap: tokens.spacing.sm,
        }}
      >
        {actions.slice(4, 8).map((item, idx) => (
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
              backgroundColor: colors.surfaceVariant,
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
    </View>
  );
}
