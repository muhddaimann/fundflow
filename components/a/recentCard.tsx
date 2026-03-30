import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../components/noData";

type Transaction = {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  time: string;
};

type Props = {
  data?: Transaction[];
};

export default function RecentCard({ data = [] }: Props) {
  const { colors } = useTheme();
  const tokens = useDesign();

  if (!data.length) {
    return (
      <View style={{ marginHorizontal: tokens.spacing.lg }}>
        <NoData message="No transactions yet." icon="cash-remove" />
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
                gap: tokens.spacing.sm,
                flex: 1,
              }}
            >
              <View
                style={{
                  width: tokens.sizes.icon.lg,
                  height: tokens.sizes.icon.lg,
                  borderRadius: tokens.radii.full,
                  backgroundColor: colors.surfaceVariant,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={isIncome ? "arrow-down-left" : "arrow-up-right"}
                  size={tokens.sizes.icon.sm}
                  color={colors.onSurfaceVariant}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: tokens.typography.sizes.md,
                    fontWeight: tokens.typography.weights.semibold,
                  }}
                >
                  {item.title}
                </Text>

                <Text
                  style={{
                    fontSize: tokens.typography.sizes.sm,
                    color: colors.onSurfaceVariant,
                  }}
                >
                  {item.category} • {item.time}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: tokens.typography.sizes.md,
                fontWeight: tokens.typography.weights.semibold,
                color: isIncome ? colors.primary : colors.error,
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
