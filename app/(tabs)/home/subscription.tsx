import React, { useRef, useState, useEffect } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import { useTheme, Card, List, Text } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useHome from "../../../hooks/useHome";

export default function Subscription() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const { subscriptions, formatCurrency, formatDate, getDaysLeft } = useHome();
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
        <Header title="Subscriptions" subtitle="Manage recurring costs" />
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Card style={{ backgroundColor: colors.surface }} mode="contained">
            {subscriptions.map((sub, i) => (
              <List.Item
                key={i}
                title={sub.name}
                description={`Next ${formatDate(sub.nextBilling)} • ${getDaysLeft(sub.nextBilling)}`}
                right={() => <Text style={{ alignSelf: "center" }}>{formatCurrency(sub.amount)}</Text>}
                left={props => <List.Icon {...props} icon="repeat" />}
              />
            ))}
          </Card>
        </View>
        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
