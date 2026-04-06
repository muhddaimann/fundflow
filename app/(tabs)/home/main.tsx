import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from "react-native";
import { useTheme, Text, Card, ProgressBar, List } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import MainRow from "../../../components/a/mainRow";
import SectionHeader from "../../../components/secHeader";
import useHome from "../../../hooks/useHome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScrollTop from "../../../components/scrollTop";
import EndScreen from "../../../components/endScreen";
import Header from "../../../components/header";

export default function Main() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { onScroll } = useTabs();
  const {
    totals,
    budgets,
    bills,
    subscriptions,
    wishlist,
    formatCurrency,
    formatDate,
    getDaysLeft,
  } = useHome();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 300);
    onScroll(offset);
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
        showsVerticalScrollIndicator={false}
      >
        <Header title="Main" subtitle="Main Page" />
        <MainRow
          left={{
            amount: totals.spent.formatted,
            label: "Total Spent",
            icon: (
              <MaterialCommunityIcons
                name="wallet-outline"
                size={tokens.sizes.icon.md}
                color={colors.onPrimary}
              />
            ),
            bgColor: colors.primary,
            textColor: colors.onPrimary,
            labelColor: colors.onPrimary,
          }}
          topRight={{
            amount: totals.toPay.formatted,
            label: "To Pay",
            icon: (
              <MaterialCommunityIcons
                name="arrow-up-right"
                size={tokens.sizes.icon.md}
                color={colors.error}
              />
            ),
          }}
          bottomRight={{
            amount: totals.toClaim.formatted,
            label: "To Claim",
            icon: (
              <MaterialCommunityIcons
                name="arrow-down-left"
                size={tokens.sizes.icon.md}
                color={colors.primary}
              />
            ),
          }}
        />
        <View style={{ gap: tokens.spacing.md }}>
          <SectionHeader
            icon={
              <MaterialCommunityIcons
                name="chart-donut"
                size={24}
                color={colors.primary}
              />
            }
            head="Budgets"
            subHeader="Monthly spending limits"
          />
          <View
            style={{
              paddingHorizontal: tokens.spacing.lg,
              gap: tokens.spacing.sm,
            }}
          >
            {budgets.map((budget, i) => (
              <Card
                key={i}
                style={{ backgroundColor: colors.surface }}
                mode="contained"
              >
                <Card.Content style={{ gap: tokens.spacing.xs }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text variant="titleSmall">{budget.category}</Text>
                    <Text variant="bodySmall">
                      {formatCurrency(budget.spent)} /{" "}
                      {formatCurrency(budget.limit)}
                    </Text>
                  </View>
                  <ProgressBar
                    progress={budget.percentage / 100}
                    color={
                      budget.percentage > 90 ? colors.error : colors.primary
                    }
                    style={{ height: 8, borderRadius: 4 }}
                  />
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>
        <View style={{ gap: tokens.spacing.md }}>
          <SectionHeader
            icon={
              <MaterialCommunityIcons
                name="receipt"
                size={24}
                color={colors.primary}
              />
            }
            head="Upcoming Bills"
            subHeader="Don't miss these payments"
          />
          <View style={{ paddingHorizontal: tokens.spacing.lg }}>
            {bills.map((bill, i) => (
              <List.Item
                key={i}
                title={bill.name}
                description={`Due ${formatDate(bill.dueDate)} • ${getDaysLeft(bill.dueDate)}`}
                right={() => (
                  <Text
                    style={{
                      alignSelf: "center",
                      fontWeight: "700",
                      color:
                        bill.status === "overdue"
                          ? colors.error
                          : colors.onSurface,
                    }}
                  >
                    {formatCurrency(bill.amount)}
                  </Text>
                )}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={
                      bill.status === "paid" ? "check-circle" : "clock-outline"
                    }
                    color={
                      bill.status === "paid"
                        ? colors.primary
                        : bill.status === "overdue"
                          ? colors.error
                          : colors.onSurfaceVariant
                    }
                  />
                )}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: tokens.radii.md,
                  marginBottom: tokens.spacing.xs,
                }}
              />
            ))}
          </View>
        </View>
        <View style={{ gap: tokens.spacing.md }}>
          <SectionHeader
            icon={
              <MaterialCommunityIcons
                name="repeat"
                size={24}
                color={colors.primary}
              />
            }
            head="Subscriptions"
            subHeader="Recurring monthly costs"
          />
          <View style={{ paddingHorizontal: tokens.spacing.lg }}>
            <Card style={{ backgroundColor: colors.surface }} mode="contained">
              {subscriptions.map((sub, i) => (
                <List.Item
                  key={i}
                  title={sub.name}
                  description={`Next ${formatDate(sub.nextBilling)} • ${getDaysLeft(sub.nextBilling)}`}
                  right={() => (
                    <Text style={{ alignSelf: "center" }}>
                      {formatCurrency(sub.amount)}
                    </Text>
                  )}
                  left={(props) => <List.Icon {...props} icon="refresh" />}
                />
              ))}
            </Card>
          </View>
        </View>
        <View style={{ gap: tokens.spacing.md }}>
          <SectionHeader
            icon={
              <MaterialCommunityIcons
                name="heart-outline"
                size={24}
                color={colors.primary}
              />
            }
            head="Wishlist"
            subHeader="Saving goals"
          />
          <View
            style={{
              paddingHorizontal: tokens.spacing.lg,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: tokens.spacing.sm,
            }}
          >
            {wishlist.map((item, i) => (
              <Card
                key={i}
                style={{ width: "48%", backgroundColor: colors.surface }}
                mode="contained"
              >
                <Card.Content style={{ gap: tokens.spacing.xs }}>
                  <Text variant="titleSmall" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text variant="bodySmall">
                    {formatCurrency(item.saved)} / {formatCurrency(item.price)}
                  </Text>
                  <ProgressBar
                    progress={item.saved / item.price}
                    color={colors.secondary}
                    style={{ height: 4, borderRadius: 2 }}
                  />
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>
        <EndScreen />
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
