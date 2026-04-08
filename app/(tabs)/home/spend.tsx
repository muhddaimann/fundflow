import React, { useRef, useState, useMemo } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Pressable,
} from "react-native";
import { useTheme, Text, Card, List, Switch, Button } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useSpend from "../../../hooks/useSpend";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";
import SectionHeader from "../../../components/secHeader";
import { useRouter } from "expo-router";

export default function Spend() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const {
    spendData,
    formatCurrency,
    isEmpty,
    setIsEmpty,
    openAddSpendModal,
  } = useSpend();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const monthlyTransactions = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return spendData.recentTransactions.filter(tx => 
      new Date(tx.date) >= startOfMonth
    );
  }, [spendData.recentTransactions]);

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
        <Header
          title="Spending"
          subtitle="Track your daily expenses"
          rightSlot={
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text
                variant="labelSmall"
                style={{ color: colors.onSurfaceVariant }}
              >
                Empty
              </Text>
              <Switch value={isEmpty} onValueChange={setIsEmpty} />
            </View>
          }
        />

        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Card
            style={{
              backgroundColor: colors.primary,
              borderRadius: tokens.radii["2xl"],
            }}
            mode="elevated"
          >
            <View
              style={{ borderRadius: tokens.radii["2xl"], overflow: "hidden" }}
            >
              <Card.Content
                style={{
                  paddingVertical: tokens.spacing.xl,
                  gap: tokens.spacing.xl,
                }}
              >
                <View style={{ alignItems: "center", gap: tokens.spacing.xxs }}>
                  <Text
                    variant="labelMedium"
                    style={{
                      color: colors.onPrimary,
                      opacity: 0.8,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                    }}
                  >
                    Total Spent This Month
                  </Text>
                  <Text
                    variant="displayMedium"
                    style={{ color: colors.onPrimary, fontWeight: "bold" }}
                  >
                    {formatCurrency(spendData.totalSpent)}
                  </Text>
                </View>

                {!isEmpty && (
                  <View style={{ gap: tokens.spacing.md }}>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colors.onPrimary,
                        opacity: 0.2,
                      }}
                    />
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ gap: tokens.spacing.sm }}
                    >
                      {spendData.categories.map((cat, i) => (
                        <View
                          key={i}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: colors.onPrimary + "20",
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radii.pill,
                            gap: tokens.spacing.xs,
                            borderWidth: 1,
                            borderColor: colors.onPrimary + "30",
                          }}
                        >
                          <MaterialCommunityIcons
                            name={cat.icon as any}
                            size={16}
                            color={colors.onPrimary}
                          />
                          <Text
                            variant="labelMedium"
                            style={{
                              color: colors.onPrimary,
                              fontWeight: "600",
                            }}
                          >
                            {formatCurrency(cat.amount)}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </Card.Content>
            </View>
          </Card>
        </View>

        {/* Actions Row */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: tokens.spacing.lg,
            gap: tokens.spacing.md,
          }}
        >
          <Button
            mode="contained"
            onPress={() =>
              openAddSpendModal((data) => console.log("Add", data))
            }
            style={{ flex: 2, borderRadius: tokens.radii.lg }}
            contentStyle={{ height: 48 }}
            icon="plus"
            buttonColor={colors.secondary}
          >
            Add Spending
          </Button>
          <Button
            mode="outlined"
            onPress={() => router.push("/home/category")}
            style={{ flex: 1, borderRadius: tokens.radii.lg }}
            contentStyle={{ height: 48 }}
            icon="folder-plus"
          >
            Add Category
          </Button>
        </View>

        {isEmpty ? (
          <View
            style={{
              paddingHorizontal: tokens.spacing.lg,
              marginTop: tokens.spacing.sm,
            }}
          >
            <NoData
              title="No spending yet"
              message="Start tracking your expenses to see them here."
              icon="cash-off"
            />
          </View>
        ) : (
          <View style={{ gap: tokens.spacing.sm }}>
            <SectionHeader
              icon={
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={tokens.sizes.icon.md}
                  color={colors.onSurfaceVariant}
                />
              }
              head="Monthly Transactions"
              subHeader="Overview of this month's spending"
              rightSlot={
                <Pressable onPress={() => router.push("/home/transaction")}>
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

            <View style={{ paddingHorizontal: tokens.spacing.lg }}>
              {monthlyTransactions.map((tx) => (
                <List.Item
                  key={tx.id}
                  title={tx.title}
                  titleStyle={{ fontWeight: "600" }}
                  description={new Date(tx.date).toLocaleDateString("en-MY", {
                    day: "numeric",
                    month: "short",
                  })}
                  left={() => (
                    <View
                      style={{
                        justifyContent: "center",
                        paddingLeft: tokens.spacing.xs,
                      }}
                    >
                      <View
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: tokens.radii.md,
                          backgroundColor: colors.surfaceVariant,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MaterialCommunityIcons
                          name={tx.icon as any}
                          size={24}
                          color={colors.onSurfaceVariant}
                        />
                      </View>
                    </View>
                  )}
                  right={() => (
                    <View style={{ justifyContent: "center" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: colors.error,
                        }}
                      >
                        - {formatCurrency(tx.amount)}
                      </Text>
                    </View>
                  )}
                  style={{
                    backgroundColor: colors.surface,
                    borderRadius: tokens.radii.lg,
                    marginBottom: tokens.spacing.xs,
                    borderWidth: 1,
                    borderColor: colors.outlineVariant,
                  }}
                />
              ))}
            </View>
          </View>
        )}

        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
