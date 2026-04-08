import React, { useRef, useState, useMemo } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  TouchableOpacity,
} from "react-native";
import { useTheme, Text, List, Switch } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useSpend, { SpendTransaction } from "../../../hooks/useSpend";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";

type DateFilter = "All" | "Today" | "This Week" | "This Month";

export default function Transaction() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { spendData, formatCurrency, isEmpty, setIsEmpty } = useSpend();

  const [activeFilter, setActiveFilter] = useState<DateFilter>("All");

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const dateFilters: DateFilter[] = ["All", "Today", "This Week", "This Month"];

  const isSameDay = (d1: Date, d2: Date) => 
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return spendData.recentTransactions.filter((tx) => {
      const txDate = new Date(tx.date);
      
      if (activeFilter === "All") return true;
      if (activeFilter === "Today") return isSameDay(txDate, today);
      if (activeFilter === "This Week") return txDate >= startOfWeek;
      if (activeFilter === "This Month") return txDate >= startOfMonth;
      
      return true;
    });
  }, [activeFilter, spendData.recentTransactions]);

  const groupedTransactions = useMemo(() => {
    const groups: Record<string, SpendTransaction[]> = {};
    
    filteredTransactions.forEach(tx => {
      const date = new Date(tx.date).toLocaleDateString('en-MY', { 
        day: 'numeric', month: 'short', year: 'numeric' 
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(tx);
    });
    
    return Object.entries(groups);
  }, [filteredTransactions]);

  return (
    <>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingBottom: tokens.spacing["3xl"],
          gap: tokens.spacing.md,
        }}
      >
        <Header 
          title="All Transactions" 
          subtitle="History of your spending" 
          rightSlot={
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>Empty</Text>
              <Switch value={isEmpty} onValueChange={setIsEmpty} />
            </View>
          }
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: tokens.spacing.lg,
            gap: tokens.spacing.sm,
          }}
        >
          {dateFilters.map((f) => {
            const active = activeFilter === f;

            return (
              <TouchableOpacity
                key={f}
                onPress={() => setActiveFilter(f)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: tokens.radii.pill,
                  backgroundColor: active
                    ? colors.primary
                    : colors.surfaceVariant,
                  borderWidth: 1,
                  borderColor: active ? colors.primary : colors.outlineVariant,
                }}
              >
                <Text
                  variant="labelMedium"
                  style={{
                    color: active
                      ? colors.onPrimary
                      : colors.onSurface,
                    fontWeight: active ? "700" : "500",
                  }}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {isEmpty ? (
          <View style={{ paddingHorizontal: tokens.spacing.lg, marginTop: tokens.spacing.sm }}>
            <NoData 
              title="No transactions yet" 
              message="Your spending history will appear here once you start recording expenses." 
              icon="history"
            />
          </View>
        ) : (
          <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.lg }}>
            {groupedTransactions.map(([date, txs]) => (
              <View key={date} style={{ gap: tokens.spacing.sm }}>
                <Text variant="labelLarge" style={{ color: colors.onSurfaceVariant, fontWeight: "700", marginLeft: 4 }}>
                  {date}
                </Text>
                
                {txs.map((tx) => (
                  <List.Item
                    key={tx.id}
                    title={tx.title}
                    titleStyle={{ fontWeight: "600" }}
                    description={tx.category}
                    left={() => (
                      <View style={{ justifyContent: "center" }}>
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
                      borderWidth: 1,
                      borderColor: colors.outlineVariant,
                    }}
                  />
                ))}
              </View>
            ))}
          </View>
        )}

        <EndScreen />
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
