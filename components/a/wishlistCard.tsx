import React from "react";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useTheme } from "react-native-paper";

export default function WishlistCard() {
  const { carouselState, carouselDummy, formatCurrency } = useGlobal("User");
  const { colors } = useTheme();
  const state = carouselState.wishlist;
  const dummy = carouselDummy.wishlist;

  return (
    <BaseCard
      title={state.hasData ? "Wishlist" : dummy.title}
      subtitle={state.hasData ? "5 items tracked" : dummy.subtitle}
      amount={state.hasData ? formatCurrency(2500) : undefined}
      icon={dummy.icon}
      color={colors.secondary}
      route="home/wishlist"
      hasData={state.hasData}
    />
  );
}
