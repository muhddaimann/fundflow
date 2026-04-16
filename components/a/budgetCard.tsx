import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useDesign } from "../../contexts/designContext";

export default function BudgetCard() {
  const { carouselState, carouselDummy, formatCurrency } = useGlobal("User");
  const { colors } = useTheme();
  const tokens = useDesign();
  const state = carouselState.budget;
  const dummy = carouselDummy.budget;

  const details = state.details as { total: number; spent: number; percent: number };
  const remaining = details.total - details.spent;

  return (
    <BaseCard
      icon={dummy.icon}
      color={state.color}
      route="home/budget"
    >
      <View>
        <Text variant="labelLarge" style={{ color: colors.onSurfaceVariant }}>
          {state.hasData ? "Budget Remaining" : dummy.title}
        </Text>
        <Text
          variant="headlineMedium"
          style={{
            fontFamily: tokens.typography.families.bold,
            fontWeight: "700",
            color: colors.onSurface,
            marginVertical: 4,
          }}
        >
          {state.hasData ? formatCurrency(remaining) : "RM 0.00"}
        </Text>
        
        {state.hasData ? (
          <View style={{ marginTop: 8 }}>
            <View style={{ height: 6, backgroundColor: colors.surfaceVariant, borderRadius: 3, overflow: 'hidden' }}>
              <View style={{ width: `${details.percent * 100}%`, height: '100%', backgroundColor: state.color }} />
            </View>
            <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant, marginTop: 6 }}>
              Spent {formatCurrency(details.spent)} of {formatCurrency(details.total)}
            </Text>
          </View>
        ) : (
          <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
            {dummy.subtitle}
          </Text>
        )}
      </View>
    </BaseCard>
  );
}
