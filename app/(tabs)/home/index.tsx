import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme, Text } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import { useTabs } from "../../../contexts/tabContext";
import Header from "../../../components/a/header";
import MainRow from "../../../components/a/mainRow";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CardHeader from "../../../components/cardHeader";
import ActivityCard from "../../../components/a/activityCard";
import RecentCard from "../../../components/a/recentCard";
import PayCard from "../../../components/a/payCard";
import ClaimCard from "../../../components/a/claimCard";
import BillsCard from "../../../components/a/billsCard";
import SubsCard from "../../../components/a/subsCard";
import BudgetCard from "../../../components/a/budgetCard";
import GoalCard from "../../../components/a/goalCard";
import WishlistCard from "../../../components/a/wishlistCard";
import QuickAction from "../../../components/a/quickAction";
import EndScreen from "../../../components/endScreen";
import useGlobal from "../../../hooks/useGlobal";
import { useOverlay } from "../../../contexts/overlayContext";
import { PickerModal } from "../../../components/pickerModal";
import CardCarousel from "../../../components/a/cardCarousel";

export default function Home() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { onScroll } = useTabs();
  const { totals, recentActivities, recentTransactions, formatCurrency } =
    useGlobal("User");
  const { showModal, hideModal } = useOverlay();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"activity" | "transaction">(
    "activity",
  );

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

  const openViewPicker = () => {
    showModal({
      content: (
        <PickerModal
          title=""
          subtitle=""
          onClose={hideModal}
          items={[
            {
              label: "Recent Activity",
              icon: "history",
              color: colors.primary,
              onPress: () => setViewMode("activity"),
            },
            {
              label: "Recent Transactions",
              icon: "cash-multiple",
              color: colors.secondary,
              onPress: () => setViewMode("transaction"),
            },
          ]}
        />
      ),
    });
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
            amount: formatCurrency(totals.spend),
            icon: (
              <MaterialCommunityIcons
                name="credit-card-outline"
                size={20}
                color={colors.secondary}
              />
            ),
            bgColor: colors.secondary + "12",
            textColor: colors.secondary,
            labelColor: colors.secondary + "B3",
            route: "home/spend",
            params: { type: "totalSpend" },
          }}
          toPay={{
            amount: formatCurrency(totals.pay),
            icon: (
              <MaterialCommunityIcons
                name="arrow-up-bold"
                size={20}
                color={colors.secondary}
              />
            ),
            bgColor: colors.secondary + "18",
            textColor: colors.secondary,
            labelColor: colors.secondary + "99",
            route: "home/pay",
            params: { type: "toPay" },
          }}
          toClaim={{
            amount: formatCurrency(totals.claim),
            icon: (
              <MaterialCommunityIcons
                name="arrow-down-bold"
                size={20}
                color={colors.secondary}
              />
            ),
            bgColor: colors.secondary + "1F",
            textColor: colors.secondary,
            labelColor: colors.secondary + "80",
            route: "home/claim",
            params: { type: "toClaim" },
          }}
        />
        <QuickAction />

        <CardCarousel
          items={[
            <BudgetCard key="budget" />,
            <GoalCard key="goal" />,
            <PayCard key="pay" />,
            <ClaimCard key="claim" />,
            <BillsCard key="bills" />,
            <SubsCard key="subs" />,
            <WishlistCard key="wish" />,
          ]}
        />

        <CardHeader
          onPress={openViewPicker}
          icon={
            <MaterialCommunityIcons
              name={viewMode === "activity" ? "history" : "cash-multiple"}
              size={tokens.sizes.icon.md}
              color={colors.onSurfaceVariant}
            />
          }
          head={
            viewMode === "activity" ? "Recent Activity" : "Recent Transactions"
          }
          subHeader={
            viewMode === "activity"
              ? "Your latest FundFlow activity"
              : "Your latest money movement"
          }
          rightSlot={
            <Pressable
              onPress={() =>
                router.push(
                  viewMode === "activity"
                    ? "home/activity"
                    : "home/transaction",
                )
              }
            >
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: tokens.typography.weights.semibold,
                }}
              >
                See all
              </Text>
            </Pressable>
          }
        />

        <View style={{ marginTop: -tokens.spacing.sm }}>
          {viewMode === "activity" ? (
            <ActivityCard data={recentActivities} />
          ) : (
            <RecentCard data={recentTransactions} />
          )}
        </View>

        <EndScreen />
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
