import React from "react";
import { View, Pressable } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import useGlobal from "../../hooks/useGlobal";

type HeaderProps = {
  name?: string;
};

export default function Header({ name = "User" }: HeaderProps) {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { today, initials } = useGlobal(name);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: tokens.spacing.xxs }}>
        <Text
          style={{
            fontSize: tokens.typography.sizes["2xl"],
            fontWeight: tokens.typography.weights.bold,
            letterSpacing: -0.5,
          }}
        >
          Settings
        </Text>

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
  );
}
