import React, { useRef, useState, useEffect } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import { useTheme, Card, Text, ProgressBar } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useWishlist from "../../../hooks/useWishlist";

export default function Wishlist() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const { wishlist, formatCurrency } = useWishlist();
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
        <Header title="Wishlist" subtitle="Saving goals" />
        <View style={{ paddingHorizontal: tokens.spacing.lg, flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing.sm }}>
          {wishlist.map((item, i) => (
            <Card key={i} style={{ width: "48%", backgroundColor: colors.surface }} mode="contained">
              <Card.Content style={{ gap: tokens.spacing.xs }}>
                <Text variant="titleSmall" numberOfLines={1}>{item.name}</Text>
                <Text variant="bodySmall">{formatCurrency(item.saved)} / {formatCurrency(item.price)}</Text>
                <ProgressBar
                  progress={item.saved / item.price}
                  color={colors.secondary}
                  style={{ height: 4, borderRadius: 2 }}
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
