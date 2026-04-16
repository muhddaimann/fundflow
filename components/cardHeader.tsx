import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CardHeaderProps = {
  icon?: React.ReactNode;
  head: string;
  subHeader?: string;
  rightSlot?: React.ReactNode;
  onPress?: () => void;
};

export default function CardHeader({
  icon,
  head,
  subHeader,
  rightSlot,
  onPress,
}: CardHeaderProps) {
  const { colors } = useTheme();
  const tokens = useDesign();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing.lg,
      }}
    >
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing.sm,
          flex: 1,
          backgroundColor: onPress
            ? pressed
              ? colors.surfaceVariant
              : colors.surfaceVariant + "40"
            : "transparent",
          padding: onPress ? tokens.spacing.xs : 0,
          paddingRight: tokens.spacing.md,
          borderRadius: tokens.radii.lg,
          marginLeft: onPress ? -tokens.spacing.xs : 0,
          transform: [{ scale: onPress && pressed ? 0.98 : 1 }],
        })}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radii.md,
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </View>

        <View style={{ flexShrink: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: tokens.spacing.lg,
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                fontFamily: tokens.typography.families.bold,
                fontWeight: "700",
                color: colors.onSurface,
              }}
            >
              {head}
            </Text>

            {onPress && (
              <View
                style={{
                  backgroundColor: colors.primary + "15",
                  borderRadius: 4,
                  padding: 1,
                  marginLeft: 4,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={16}
                  color={colors.primary}
                />
              </View>
            )}
          </View>
          {subHeader && (
            <Text
              variant="bodySmall"
              style={{ color: colors.onSurfaceVariant, opacity: 0.7 }}
            >
              {subHeader}
            </Text>
          )}
        </View>
      </Pressable>

      {rightSlot && (
        <View style={{ paddingRight: tokens.spacing.sm }}>{rightSlot}</View>
      )}
    </View>
  );
}
