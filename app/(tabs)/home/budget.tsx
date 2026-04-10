import React, { useRef } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View, Pressable } from "react-native";
import { useTheme, Text, Card, ProgressBar, Switch } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useBudget from "../../../hooks/useBudget";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";

export default function Budget() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { 
    budgets, 
    totalBudgeted, 
    totalSpent, 
    isEmpty, 
    setIsEmpty, 
    formatCurrency,
    openAddBudgetModal,
    openEditBudgetModal
  } = useBudget();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const masterProgress = totalBudgeted > 0 ? totalSpent / totalBudgeted : 0;

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
          title="Budgets" 
          subtitle="Manage your monthly limits" 
          rightSlot={
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>Empty</Text>
              <Switch value={isEmpty} onValueChange={setIsEmpty} />
            </View>
          }
        />

        {/* Summary Card */}
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Card 
            style={{ 
              backgroundColor: colors.primary, 
              borderRadius: tokens.radii["2xl"],
            }} 
            mode="elevated"
          >
            <View style={{ borderRadius: tokens.radii["2xl"], overflow: "hidden" }}>
              <Card.Content style={{ paddingVertical: tokens.spacing.xl, gap: tokens.spacing.xl }}>
                <View style={{ alignItems: "center", gap: tokens.spacing.xxs }}>
                  <Text variant="labelMedium" style={{ color: colors.onPrimary, opacity: 0.8, textTransform: "uppercase", letterSpacing: 1.5 }}>
                    Total Monthly Budget
                  </Text>
                  <Text variant="displayMedium" style={{ color: colors.onPrimary, fontWeight: "bold" }}>
                    {formatCurrency(totalBudgeted)}
                  </Text>
                </View>

                <View style={{ gap: tokens.spacing.xs }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text variant="labelSmall" style={{ color: colors.onPrimary }}>
                      Spent so far: {formatCurrency(totalSpent)}
                    </Text>
                    <Text variant="labelSmall" style={{ color: colors.onPrimary }}>
                      {Math.round(masterProgress * 100)}%
                    </Text>
                  </View>
                  <ProgressBar 
                    progress={masterProgress} 
                    color={colors.onPrimary} 
                    style={{ height: 8, borderRadius: 4, backgroundColor: colors.onPrimary + '20' }} 
                  />
                </View>
              </Card.Content>
            </View>
          </Card>
        </View>

        {/* Actions Row */}
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Pressable 
            onPress={openAddBudgetModal}
            style={({ pressed }) => ({
              backgroundColor: colors.primaryContainer,
              borderRadius: tokens.radii.pill,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingVertical: tokens.spacing.md,
              paddingHorizontal: tokens.spacing.lg,
              gap: tokens.spacing.sm,
              borderWidth: 1.5,
              borderStyle: 'dashed',
              borderColor: colors.primary,
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }]
            })}
          >
            <MaterialCommunityIcons name="chart-donut" size={24} color={colors.primary} />
            <Text 
              variant="titleMedium" 
              style={{ color: colors.primary, fontWeight: "bold" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Set Category Budget
            </Text>
          </Pressable>
        </View>

        {isEmpty ? (
          <View style={{ paddingHorizontal: tokens.spacing.lg, marginTop: tokens.spacing.sm }}>
            <NoData 
              title="No budgets set" 
              message="Define spending limits for your categories to stay on track." 
              icon="chart-donut"
            />
          </View>
        ) : (
          <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
            <Text variant="titleMedium" style={{ fontWeight: "800", letterSpacing: 0.5 }}>
              CATEGORY BREAKDOWN
            </Text>
            
            <View style={{ gap: tokens.spacing.sm }}>
              {budgets.map((budget, i) => (
                <Pressable key={i} onPress={() => openEditBudgetModal(budget)}>
                  <Card style={{ backgroundColor: colors.surface, borderRadius: tokens.radii.lg }} mode="outlined">
                    <Card.Content style={{ gap: tokens.spacing.md }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: tokens.spacing.md }}>
                        <View style={{ 
                          width: 44,
                          height: 44,
                          borderRadius: 22, 
                          backgroundColor: budget.color + '15',
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <MaterialCommunityIcons name={budget.icon as any} size={22} color={budget.color} />
                        </View>
                        
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text variant="titleMedium" style={{ fontWeight: "600" }}>{budget.category}</Text>
                            <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
                              {formatCurrency(budget.limit)}
                            </Text>
                          </View>
                          <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                            {formatCurrency(budget.spent)} spent • {formatCurrency(budget.remaining)} left
                          </Text>
                        </View>
                      </View>

                      <ProgressBar 
                        progress={budget.percentage / 100} 
                        color={budget.percentage > 90 ? colors.error : colors.primary} 
                        style={{ height: 6, borderRadius: 3 }} 
                      />
                    </Card.Content>
                  </Card>
                </Pressable>
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
