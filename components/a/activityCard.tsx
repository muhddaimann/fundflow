import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../noData";
import { ActivityType, RecentActivity } from "../../hooks/useGlobal";

type Props = {
  data?: RecentActivity[];
};

export default function RecentCard({ data = [] }: Props) {
  const { colors } = useTheme();
  const tokens = useDesign();

  if (!data.length) {
    return (
      <View style={{ marginHorizontal: tokens.spacing.lg }}>
        <NoData message="No recent activity yet." icon="history" />
      </View>
    );
  }

  const getTypeStyles = (type: ActivityType, customColor?: string) => {
    switch (type) {
      case "spend":
        return { bg: colors.errorContainer, icon: colors.error };
      case "income":
        return { bg: colors.tertiaryContainer, icon: colors.tertiary };
      case "budget":
        return {
          bg: (customColor || colors.secondary) + "15",
          icon: customColor || colors.secondary,
        };
      case "bill":
        return {
          bg: (customColor || colors.primary) + "15",
          icon: customColor || colors.primary,
        };
      case "goal":
        return {
          bg: (customColor || "#FF9F43") + "15",
          icon: customColor || "#FF9F43",
        };
      default:
        return { bg: colors.surfaceVariant, icon: colors.onSurfaceVariant };
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: tokens.radii.xl,
        padding: tokens.spacing.md,
        marginHorizontal: tokens.spacing.lg,
        gap: tokens.spacing.md,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
      }}
    >
      {data.map((item) => {
        const styles = getTypeStyles(item.type, item.color);
        const hasAmount = item.amount !== undefined;

        return (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: tokens.spacing.md,
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: tokens.radii.md,
                  backgroundColor: styles.bg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={22}
                  color={styles.icon}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontFamily: tokens.typography.families.bold,
                    fontWeight: "700",
                    color: colors.onSurface,
                  }}
                >
                  {item.title}
                </Text>

                <Text
                  variant="bodySmall"
                  style={{
                    color: colors.onSurfaceVariant,
                    opacity: 0.7,
                  }}
                >
                  {item.subtitle} • {item.time}
                </Text>
              </View>
            </View>

            {hasAmount && (
              <Text
                variant="titleMedium"
                style={{
                  fontFamily: tokens.typography.families.bold,
                  fontWeight: "700",
                  color:
                    item.type === "income" ? colors.tertiary : colors.error,
                }}
              >
                {item.type === "income" ? "+" : "-"}RM{" "}
                {Math.abs(item.amount!).toFixed(2)}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}
