import React from "react";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useTheme } from "react-native-paper";

export default function SubsCard() {
  const { carouselState, carouselDummy, formatCurrency } = useGlobal("User");
  const { colors } = useTheme();
  const state = carouselState.subs;
  const dummy = carouselDummy.subs;

  return (
    <BaseCard
      title={state.hasData ? "Subscriptions" : dummy.title}
      subtitle={state.hasData ? "Active monthly" : dummy.subtitle}
      amount={state.hasData ? formatCurrency(120) : undefined}
      icon={dummy.icon}
      color={colors.primary}
      route="home/subscription"
      hasData={state.hasData}
    />
  );
}
