import React, { useRef, useState, useEffect } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import { useTheme, List, Text } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useHome from "../../../hooks/useHome";

export default function Bills() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const { bills, formatCurrency, formatDate, getDaysLeft } = useHome();
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
        <Header title="Upcoming Bills" subtitle="Don't miss these payments" />
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          {bills.map((bill, i) => (
            <List.Item
              key={i}
              title={bill.name}
              description={`Due ${formatDate(bill.dueDate)} • ${getDaysLeft(bill.dueDate)}`}
              right={() => (
                <Text style={{ alignSelf: "center", fontWeight: "700", color: bill.status === "overdue" ? colors.error : colors.onSurface }}>
                  {formatCurrency(bill.amount)}
                </Text>
              )}
              left={props => (
                <List.Icon
                  {...props}
                  icon={bill.status === "paid" ? "check-circle" : "clock-outline"}
                  color={bill.status === "paid" ? colors.primary : bill.status === "overdue" ? colors.error : colors.onSurfaceVariant}
                />
              )}
              style={{ backgroundColor: colors.surface, borderRadius: tokens.radii.md, marginBottom: tokens.spacing.xs }}
            />
          ))}
        </View>
        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
