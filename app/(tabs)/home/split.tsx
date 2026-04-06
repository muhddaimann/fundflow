import React, { useRef, useState, useEffect } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import { useTheme, List, Text } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useHome from "../../../hooks/useHome";

export default function Split() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const { splits, formatCurrency } = useHome();
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
        <Header title="Split" subtitle="Shared expenses" />
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          {splits.map((split, i) => (
            <List.Item
              key={i}
              title={split.person}
              description={split.type === "owe" ? "You owe" : "Owes you"}
              right={() => (
                <Text style={{ alignSelf: "center", color: split.type === "owe" ? colors.error : colors.primary }}>
                  {formatCurrency(split.amount)}
                </Text>
              )}
              left={props => <List.Icon {...props} icon="account-outline" />}
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
