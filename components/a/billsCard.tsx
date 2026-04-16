import React from "react";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";
import { useTheme } from "react-native-paper";

export default function BillsCard() {
  const { carouselState, carouselDummy, formatCurrency } = useGlobal("User");
  const { colors } = useTheme();
  const state = carouselState.bills;
  const dummy = carouselDummy.bills;

  return (
    <BaseCard
      title={state.hasData ? "Upcoming Bills" : dummy.title}
      subtitle={state.hasData ? "3 bills pending" : dummy.subtitle}
      amount={state.hasData ? formatCurrency(850) : undefined}
      icon={dummy.icon}
      color={colors.error}
      route="home/bills"
      hasData={state.hasData}
    />
  );
}
