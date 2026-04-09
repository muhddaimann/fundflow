import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import { useTabs } from "../../../contexts/tabContext";
import Header from "../../../components/a/header";
import MainRow from "../../../components/a/mainRow";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SectionHeader from "../../../components/secHeader";
import RecentCard from "../../../components/a/recentCard";
import QuickAction from "../../../components/a/quickAction";
import EndScreen from "../../../components/endScreen";

export default function Home() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { onScroll } = useTabs();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 300);
    onScroll(offset);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingTop: tokens.spacing.sm,
          paddingBottom: tokens.spacing["3xl"],
          gap: tokens.spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header name="User" />

        <MainRow
          totalSpend={{
            amount: "RM 2,450",
            icon: (
              <MaterialCommunityIcons
                name="credit-card-outline"
                size={20}
                color={colors.onPrimary}
              />
            ),
            bgColor: colors.primary,
            textColor: colors.onPrimary,
            labelColor: colors.onPrimary,
            route: "home/spend",
            params: { type: "totalSpend" },
          }}
          toPay={{
            amount: "RM 320",
            icon: (
              <MaterialCommunityIcons
                name="arrow-up-bold"
                size={20}
                color={colors.onError}
              />
            ),
            bgColor: colors.errorContainer,
            textColor: colors.onErrorContainer,
            labelColor: colors.onErrorContainer,
            route: "home/pay",
            params: { type: "toPay" },
          }}
          toClaim={{
            amount: "RM 180",
            icon: (
              <MaterialCommunityIcons
                name="arrow-down-bold"
                size={20}
                color={colors.onTertiary}
              />
            ),
            bgColor: colors.tertiaryContainer,
            textColor: colors.onTertiaryContainer,
            labelColor: colors.onTertiaryContainer,
                      route: "home/claim",
            params: { type: "toClaim" },
          }}
        />
        <QuickAction />

        <SectionHeader
          icon={
            <MaterialCommunityIcons
              name="history"
              size={tokens.sizes.icon.md}
              color={colors.onSurfaceVariant}
            />
          }
          head="Recent Transactions"
          subHeader="Your latest spending activity"
          rightSlot={
            <Text
              style={{
                color: colors.primary,
                fontWeight: tokens.typography.weights.semibold,
              }}
            >
              See all
            </Text>
          }
        />
        <RecentCard />
        <EndScreen />
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
