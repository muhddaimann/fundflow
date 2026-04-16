import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useDesign } from "../../contexts/designContext";

export default function GoalCard() {
  const { carouselState, carouselDummy, formatCurrency } = useGlobal("User");
  const { colors } = useTheme();
  const tokens = useDesign();
  const state = carouselState.goal;
  const dummy = carouselDummy.goal;

  const details = state.details as { title: string; total: number; saved: number; percent: number };
  const left = details.total - details.saved;

  return (
    <BaseCard
      icon={dummy.icon}
      color={state.color}
      route="home/goals"
    >
      <View>
        <Text variant="labelLarge" style={{ color: colors.onSurfaceVariant }}>
          {state.hasData ? details.title : dummy.title}
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
          {state.hasData ? formatCurrency(left) : "RM 0.00"}
          {state.hasData && (
             <Text variant="labelSmall" style={{ fontWeight: '400', opacity: 0.6 }}> left</Text>
          )}
        </Text>

        {state.hasData ? (
          <View style={{ marginTop: 8 }}>
            <View style={{ height: 6, backgroundColor: colors.surfaceVariant, borderRadius: 3, overflow: 'hidden' }}>
              <View style={{ width: `${details.percent * 100}%`, height: '100%', backgroundColor: state.color }} />
            </View>
            <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant, marginTop: 6 }}>
              Saved {formatCurrency(details.saved)} of {formatCurrency(details.total)}
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
