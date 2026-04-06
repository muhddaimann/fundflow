import React, { useRef, useState, useEffect } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useTheme } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useSpend from "../../../hooks/useSpend";

export default function Spend() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const { spendData, formatCurrency } = useSpend();
  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setHideTabBar(true);
    return () => setHideTabBar(false);
  }, []);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingBottom: tokens.spacing["3xl"],
          gap: tokens.spacing.lg,
        }}
      >
        <Header title="Spend" subtitle={`Total: ${formatCurrency(spendData.totalSpent)}`} />
        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
