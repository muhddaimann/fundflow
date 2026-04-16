import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useDesign } from "../../contexts/designContext";

export default function WishlistCard() {
  const { carouselState, carouselDummy, formatCurrency } = useGlobal("User");
  const { colors } = useTheme();
  const tokens = useDesign();
  const state = carouselState.wishlist;
  const dummy = carouselDummy.wishlist;

  const details = state.details as { count: number; total: number };

  return (
    <BaseCard
      icon={dummy.icon}
      color={colors.secondary}
      route="home/wishlist"
    >
      <View>
        <Text variant="labelLarge" style={{ color: colors.onSurfaceVariant }}>
          {state.hasData ? "Wishlist Value" : dummy.title}
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
        
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
            {state.hasData ? `${details.count} items saved` : dummy.subtitle}
          </Text>
          
          {state.hasData && (
             <View style={{ flexDirection: 'row', gap: 4 }}>
                {[...Array(Math.min(details.count, 5))].map((_, i) => (
                   <View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.secondary + '40' }} />
                ))}
             </View>
          )}
        </View>
      </View>
    </BaseCard>
  );
}
