  import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme, Card, ProgressBar } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useBudget from "../../hooks/useBudget";
import { useRouter } from "expo-router";

export default function BudgetCard() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { totalBudgeted, totalSpent, formatCurrency } = useBudget();

  const progress = totalBudgeted > 0 ? totalSpent / totalBudgeted : 0;
  const percentage = Math.round(progress * 100);

  return (
    <Pressable onPress={() => router.push("/home/budget")}>
      <Card
        style={{
          backgroundColor: colors.primaryContainer,
          borderRadius: tokens.radii.xl,
          borderWidth: 1,
          borderColor: colors.primary + "20",
        }}
        mode="contained"
      >
        <Card.Content
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: tokens.spacing.lg,
            gap: tokens.spacing.md,
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: tokens.radii.md,
              backgroundColor: colors.onPrimaryContainer + "15",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="chart-donut"
              size={28}
              color={colors.primary}
            />
          </View>

          <View style={{ flex: 1, gap: 4 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text
                variant="titleMedium"
                style={{
                  fontFamily: tokens.typography.families.bold,
                  fontWeight: "700",
                  color: colors.onPrimaryContainer,
                }}
              >
                Budget Status
              </Text>
              <Text variant="labelLarge" style={{ color: colors.onPrimaryContainer, fontWeight: "700" }}>
                {percentage}%
              </Text>
            </View>
            <ProgressBar 
              progress={progress} 
              color={colors.primary} 
              style={{ height: 6, borderRadius: 3, backgroundColor: colors.primary + '20' }} 
            />
            <Text
              variant="bodySmall"
              style={{ color: colors.onPrimaryContainer, opacity: 0.7 }}
            >
              Spent {formatCurrency(totalSpent)} of {formatCurrency(totalBudgeted)}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
}
