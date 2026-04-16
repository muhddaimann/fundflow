import React from "react";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useTheme } from "react-native-paper";

export default function PayCard() {
  const { carouselState, carouselDummy, formatCurrency, totals } = useGlobal("User");
  const { colors } = useTheme();
  const state = carouselState.pay;
  const dummy = carouselDummy.pay;

  return (
    <BaseCard
      title={state.hasData ? "Total to Pay" : dummy.title}
      subtitle={state.hasData ? "Pending payments" : dummy.subtitle}
      amount={state.hasData ? formatCurrency(totals.pay) : undefined}
      icon={dummy.icon}
      color={colors.secondary}
      route="home/pay"
      hasData={state.hasData}
    />
  );
}
