import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../noData";
import { Transaction } from "../../hooks/useGlobal";

type Props = {
  data?: Transaction[];
};

export default function RecentCard({ data = [] }: Props) {
  const { colors } = useTheme();
  const tokens = useDesign();

  if (!data.length) {
    return (
      <View style={{ marginHorizontal: tokens.spacing.lg }}>
        <NoData message="No recent transactions yet." icon="cash-remove" />
      </View>
    );
  }

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
        const isIncome = item.type === "income";

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
                  backgroundColor: isIncome
                    ? colors.tertiaryContainer
                    : colors.surfaceVariant,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={22}
                  color={isIncome ? colors.tertiary : colors.onSurfaceVariant}
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
                  {item.category} • {item.time}
                </Text>
              </View>
            </View>

            <Text
              variant="titleMedium"
              style={{
                fontFamily: tokens.typography.families.bold,
                fontWeight: "700",
                color: isIncome ? colors.tertiary : colors.error,
              }}
            >
              {isIncome ? "+" : "-"}RM {Math.abs(item.amount).toFixed(2)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
