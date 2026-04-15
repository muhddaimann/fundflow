import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type ActionItem = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
  color: string;
};

export default function QuickAction() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();

  const actions: ActionItem[] = [
    {
      label: "Budget",
      icon: "chart-donut",
      onPress: () => router.push("/home/budget"),
      color: colors.primary,
    },
    {
      label: "Goals",
      icon: "flag-outline",
      onPress: () => router.push("/home/goals"),
      color: colors.primary,
    },
    {
      label: "Wishlist",
      icon: "heart-outline",
      onPress: () => router.push("/home/wishlist"),
      color: colors.primary,
    },
    {
      label: "Subs",
      icon: "repeat",
      onPress: () => router.push("/home/subscription"),
      color: colors.secondary,
    },
    {
      label: "Bills",
      icon: "file-document-outline",
      onPress: () => router.push("/home/bills"),
      color: colors.secondary,
    },
    {
      label: "Split",
      icon: "account-multiple-outline",
      onPress: () => router.push("/home/split"),
      color: colors.secondary,
    },
    {
      label: "Tools",
      icon: "calculator-variant-outline",
      onPress: () => router.push("/home/tools"),
      color: colors.onSecondaryContainer,
    },
    {
      label: "Others",
      icon: "dots-horizontal",
      onPress: () => router.push("/home/others"),
      color: colors.onSurface,
    },
  ];

  return (
    <View
      style={{
        paddingHorizontal: tokens.spacing.lg,
        paddingTop: tokens.spacing.sm,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: tokens.spacing.md,
        }}
      >
        {actions.map((item, idx) => {
          const shades = ["12", "18", "1F", "26", "2E", "36"];
          const shade = shades[idx % shades.length];

          return (
            <Pressable
              key={idx}
              onPress={item.onPress}
              style={({ pressed }) => ({
                width: "22%",
                alignItems: "center",
                gap: 6,
                transform: [{ scale: pressed ? 0.94 : 1 }],
              })}
            >
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: tokens.radii.lg,
                  backgroundColor: item.color + shade,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: item.color + "30",
                }}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={26}
                  color={item.color}
                />
              </View>
              <Text
                variant="labelSmall"
                numberOfLines={1}
                style={{
                  textAlign: "center",
                  fontFamily: tokens.typography.families.medium,
                  fontWeight: "600",
                  color: colors.onSurface,
                  opacity: 0.9,
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
