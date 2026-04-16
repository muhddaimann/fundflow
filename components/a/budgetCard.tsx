import React from "react";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useTheme } from "react-native-paper";

export default function BudgetCard() {
  const { carouselState, carouselDummy, formatCurrency, totals } = useGlobal("User");
  const { colors } = useTheme();
  const state = carouselState.budget;
  const dummy = carouselDummy.budget;

  return (
    <BaseCard
      title={state.hasData ? "Monthly Budget" : dummy.title}
      subtitle={state.hasData ? `${formatCurrency(totals.spend)} spent` : dummy.subtitle}
      amount={state.hasData ? formatCurrency(3500) : undefined}
      icon={dummy.icon}
      color={colors.primary}
      progress={state.hasData ? 0.7 : undefined}
      route="home/budget"
      hasData={state.hasData}
    />
  );
}
