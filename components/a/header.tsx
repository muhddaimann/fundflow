import React from "react";
import { View, Pressable } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useGlobal from "../../hooks/useGlobal";

type HeaderProps = {
  name?: string;
};

export default function Header({ name = "User" }: HeaderProps) {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { greeting, today, initials } = useGlobal(name);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        paddingHorizontal: tokens.spacing.lg,
      }}
    >
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text
          style={{
            fontSize: tokens.typography.sizes.md,
            color: colors.onSurfaceVariant,
            opacity: tokens.typography.opacities.muted,
          }}
        >
          {greeting}, {name}
        </Text>

        <Text
          style={{
            fontSize: tokens.typography.sizes["2xl"],
            fontWeight: tokens.typography.weights.bold,
            lineHeight: tokens.typography.sizes["2xl"] + 4,
            letterSpacing: -0.5,
          }}
        >
          Your spending{"\n"}in a glance
        </Text>
      </View>

      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: tokens.spacing.sm,
          }}
        >
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              borderRadius: tokens.radii.full,
              backgroundColor: colors.surfaceVariant,
              alignItems: "center",
              justifyContent: "center",
              transform: [{ scale: pressed ? 0.96 : 1 }],
            })}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={tokens.sizes.icon.xl}
              color={colors.onSurfaceVariant}
            />
          </Pressable>

          <Pressable
            onPress={() => {}}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              borderRadius: tokens.radii.full,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              transform: [{ scale: pressed ? 0.96 : 1 }],
            })}
          >
            <Text
              style={{
                color: colors.onPrimary,
                fontSize: tokens.typography.sizes.lg,
                fontWeight: tokens.typography.weights.bold,
              }}
            >
              {initials}
            </Text>
          </Pressable>
        </View>

        <Text
          style={{
            fontSize: tokens.typography.sizes.sm,
            color: colors.onSurfaceVariant,
            opacity: tokens.typography.opacities.muted,
          }}
        >
          {today}
        </Text>
      </View>
    </View>
  );
}
