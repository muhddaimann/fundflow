import React, { useRef, useState, useEffect } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import { useTheme, Card, Text, ProgressBar } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useBudget from "../../../hooks/useBudget";

export default function Budget() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const { budgets, formatCurrency } = useBudget();
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
        <Header title="Budget" subtitle="Manage your budgets" />
        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
          {budgets.map((budget, i) => (
            <Card key={i} style={{ backgroundColor: colors.surface }} mode="contained">
              <Card.Content style={{ gap: tokens.spacing.xs }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text variant="titleSmall">{budget.category}</Text>
                  <Text variant="bodySmall">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                  </Text>
                </View>
                <ProgressBar
                  progress={budget.percentage / 100}
                  color={budget.percentage > 90 ? colors.error : colors.primary}
                  style={{ height: 8, borderRadius: 4 }}
                />
              </Card.Content>
            </Card>
          ))}
        </View>
        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
