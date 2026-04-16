import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useDesign } from "../../contexts/designContext";

export default function BillsCard() {
  const { carouselState, carouselDummy, formatCurrency } = useGlobal("User");
  const { colors } = useTheme();
  const tokens = useDesign();
  const state = carouselState.bills;
  const dummy = carouselDummy.bills;

  const details = state.details as { count: number; total: number; pending: number };

  return (
    <BaseCard
      icon={dummy.icon}
      color={state.color}
      route="home/bills"
    >
      <View>
        <Text variant="labelLarge" style={{ color: colors.onSurfaceVariant }}>
          {state.hasData ? "Total Pending Bills" : dummy.title}
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
          {state.hasData ? formatCurrency(details.total) : "RM 0.00"}
        </Text>
        
        <Text variant="bodySmall" style={{ color: state.color, fontWeight: '700' }}>
          {state.hasData ? `${details.pending} bills due soon` : dummy.subtitle}
        </Text>
        
        {state.hasData && (
          <View style={{ flexDirection: 'row', gap: 4, marginTop: 12 }}>
             {[...Array(details.count)].map((_, i) => (
               <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i < details.pending ? state.color : colors.surfaceVariant }} />
             ))}
          </View>
        )}
      </View>
    </BaseCard>
  );
}
