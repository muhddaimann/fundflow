import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SubsCard() {
  const { carouselState, carouselDummy, formatCurrency } = useGlobal("User");
  const { colors } = useTheme();
  const tokens = useDesign();
  const state = carouselState.subs;
  const dummy = carouselDummy.subs;

  const details = state.details as { count: number; total: number; active: number };

  return (
    <BaseCard
      icon={dummy.icon}
      color={state.color}
      route="home/subscription"
    >
      <View>
        <Text variant="labelLarge" style={{ color: colors.onSurfaceVariant }}>
          {state.hasData ? "Monthly Subscriptions" : dummy.title}
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
          <Text variant="labelSmall" style={{ fontWeight: '400', opacity: 0.6 }}>/mo</Text>
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
            {state.hasData ? `${details.active} active services` : dummy.subtitle}
          </Text>
          
          {state.hasData && (
             <View style={{ flexDirection: 'row', gap: -8 }}>
                {[...Array(3)].map((_, i) => (
                  <View key={i} style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.surfaceVariant, borderWidth: 2, borderColor: colors.surface, alignItems: 'center', justifyContent: 'center' }}>
                     <MaterialCommunityIcons name="play-circle-outline" size={12} color={state.color} />
                  </View>
                ))}
                {details.count > 3 && (
                   <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: state.color + '20', borderWidth: 2, borderColor: colors.surface, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 8, fontWeight: '700', color: state.color }}>+{details.count - 3}</Text>
                   </View>
                )}
             </View>
          )}
        </View>
      </View>
    </BaseCard>
  );
}
