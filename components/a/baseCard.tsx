import React from "react";
import { View, Pressable, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  icon: string;
  color?: string;
  route: string;
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function BaseCard({
  icon,
  color,
  route,
  children,
  style,
}: Props) {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();

  const primaryColor = color || colors.primary;

  return (
    <Pressable
      onPress={() => router.push(route as any)}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderRadius: tokens.radii.xl,
          padding: tokens.spacing.lg,
          borderWidth: 1,
          borderColor: colors.outlineVariant,
          opacity: pressed ? 0.9 : 1,
          minHeight: 150,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: tokens.spacing.md,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: tokens.radii.lg,
            backgroundColor: primaryColor + "15",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name={icon as any} size={20} color={primaryColor} />
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={colors.onSurfaceVariant}
          style={{ opacity: 0.5 }}
        />
      </View>

      {children}
    </Pressable>
  );
}
