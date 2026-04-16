import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  title: string;
  subtitle: string;
  icon: string;
  color?: string;
  amount?: string;
  progress?: number; // 0 to 1
  route: string;
  hasData?: boolean;
};

export default function BaseCard({
  title,
  subtitle,
  icon,
  color,
  amount,
  progress,
  route,
  hasData = false,
}: Props) {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();

  const primaryColor = color || colors.primary;

  return (
    <Pressable
      onPress={() => router.push(route as any)}
      style={({ pressed }) => ({
        backgroundColor: colors.surface,
        borderRadius: tokens.radii.xl,
        padding: tokens.spacing.lg,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
        opacity: pressed ? 0.9 : 1,
        minHeight: 160,
        justifyContent: "space-between",
      })}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radii.lg,
            backgroundColor: primaryColor + "15",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name={icon as any} size={24} color={primaryColor} />
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={colors.onSurfaceVariant}
        />
      </View>

      <View>
        <Text
          variant="labelLarge"
          style={{ color: colors.onSurfaceVariant, marginBottom: 4 }}
        >
          {title}
        </Text>
        <Text
          variant={amount ? "headlineSmall" : "bodyLarge"}
          style={{
            fontFamily: tokens.typography.families.bold,
            fontWeight: "700",
            color: colors.onSurface,
          }}
        >
          {amount || subtitle}
        </Text>
      </View>

      {hasData && progress !== undefined && (
        <View style={{ marginTop: tokens.spacing.sm }}>
          <View
            style={{
              height: 6,
              backgroundColor: colors.surfaceVariant,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: `${progress * 100}%`,
                height: "100%",
                backgroundColor: primaryColor,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
              {subtitle}
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: primaryColor, fontWeight: "700" }}
            >
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}
