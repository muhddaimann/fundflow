import React, { useRef, useState } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import { useTheme, List, Text } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useClaim from "../../../hooks/useClaim";

export default function Claim() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { claimData, formatCurrency } = useClaim();
  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
        <Header title="Claim" subtitle="Manage your claims" />
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <List.Item
            title="Total to Claim"
            right={() => <Text variant="titleMedium">{formatCurrency(claimData.totalToClaim)}</Text>}
            left={props => <List.Icon {...props} icon="ticket-percent-outline" color={colors.primary} />}
            style={{ backgroundColor: colors.surface, borderRadius: tokens.radii.md }}
          />
        </View>
        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
