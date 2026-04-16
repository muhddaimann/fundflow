import React from "react";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useTheme } from "react-native-paper";

export default function ClaimCard() {
  const { carouselState, carouselDummy, formatCurrency, totals } = useGlobal("User");
  const { colors } = useTheme();
  const state = carouselState.claim;
  const dummy = carouselDummy.claim;

  return (
    <BaseCard
      title={state.hasData ? "Total to Claim" : dummy.title}
      subtitle={state.hasData ? "Upcoming income" : dummy.subtitle}
      amount={state.hasData ? formatCurrency(totals.claim) : undefined}
      icon={dummy.icon}
      color={colors.tertiary}
      route="home/claim"
      hasData={state.hasData}
    />
  );
}
