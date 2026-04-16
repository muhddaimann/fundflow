import React from "react";
import useGlobal from "../../hooks/useGlobal";
import BaseCard from "./baseCard";

export default function GoalCard() {
  const { carouselState, carouselDummy, formatCurrency } = useGlobal("User");
  const state = carouselState.goal;
  const dummy = carouselDummy.goal;

  return (
    <BaseCard
      title={state.hasData ? "New House Fund" : dummy.title}
      subtitle={state.hasData ? `${formatCurrency(12000)} saved` : dummy.subtitle}
      amount={state.hasData ? formatCurrency(50000) : undefined}
      icon={dummy.icon}
      color="#FF9F43"
      progress={state.hasData ? 0.24 : undefined}
      route="home/goals"
      hasData={state.hasData}
    />
  );
}
