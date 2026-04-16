import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useDesign } from "../../contexts/designContext";

export default function ClaimCard() {
  const { carouselState, carouselDummy, formatCurrency } = useGlobal("User");
  const { colors } = useTheme();
  const tokens = useDesign();
  const state = carouselState.claim;
  const dummy = carouselDummy.claim;

  const details = state.details as { count: number; total: number };

  return (
    <BaseCard
      icon={dummy.icon}
      color={state.color}
      route="home/claim"
    >
      <View>
        <Text variant="labelLarge" style={{ color: colors.onSurfaceVariant }}>
          {state.hasData ? "Total to Claim" : dummy.title}
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
        
        <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
          {state.hasData ? `${details.count} incoming payments` : dummy.subtitle}
        </Text>

        {state.hasData && (
           <View style={{ marginTop: 12, height: 4, backgroundColor: colors.surfaceVariant, borderRadius: 2 }}>
              <View style={{ width: '40%', height: '100%', backgroundColor: state.color, borderRadius: 2 }} />
           </View>
        )}
      </View>
    </BaseCard>
  );
}
