import React, { useRef } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View, Pressable } from "react-native";
import { useTheme, Text, Card, ProgressBar, Switch } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useGoals from "../../../hooks/useGoals";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";

export default function Goals() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { 
    goals, 
    totalTarget, 
    totalCurrent, 
    formatCurrency,
    formatDate,
    getDaysLeft,
    isEmpty,
    setIsEmpty,
    openAddGoalModal,
    openEditGoalModal
  } = useGoals();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const overallProgress = totalTarget > 0 ? totalCurrent / totalTarget : 0;

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
          paddingTop: tokens.spacing.md
        }}
      >
        <Header 
          title="Goals" 
          subtitle="Financial milestones" 
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
                    Overall Goals Progress
                  </Text>
                  <Text variant="displayMedium" style={{ color: colors.onPrimary, fontWeight: "bold" }}>
                    {formatCurrency(totalCurrent)}
                  </Text>
                  <Text variant="bodySmall" style={{ color: colors.onPrimary, opacity: 0.7 }}>
                    Total Target: {formatCurrency(totalTarget)}
                  </Text>
                </View>

                <View style={{ gap: tokens.spacing.xs }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text variant="labelSmall" style={{ color: colors.onPrimary }}>
                      {Math.round(overallProgress * 100)}% Reached
                    </Text>
                    <Text variant="labelSmall" style={{ color: colors.onPrimary }}>
                      {formatCurrency(totalTarget - totalCurrent)} remaining
                    </Text>
                  </View>
                  <ProgressBar 
                    progress={overallProgress} 
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
            onPress={openAddGoalModal}
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
            <MaterialCommunityIcons name="flag-plus-outline" size={24} color={colors.primary} />
            <Text 
              variant="titleMedium" 
              style={{ color: colors.primary, fontWeight: "bold" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Add New Financial Goal
            </Text>
          </Pressable>
        </View>

        {isEmpty ? (
          <View style={{ paddingHorizontal: tokens.spacing.lg, marginTop: tokens.spacing.sm }}>
            <NoData 
              title="No milestones yet" 
              message="Set long-term goals like an emergency fund or a house deposit to track your big wins." 
              icon="flag-outline"
            />
          </View>
        ) : (
          <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
            <Text variant="titleMedium" style={{ fontWeight: "800", letterSpacing: 0.5 }}>
              MILESTONE TRACKER
            </Text>
            
            <View style={{ gap: tokens.spacing.sm }}>
              {goals.map((goal) => {
                const progress = goal.target > 0 ? goal.current / goal.target : 0;
                const isReached = progress >= 1;

                return (
                  <Pressable 
                    key={goal.id} 
                    onPress={() => openEditGoalModal(goal)}
                    style={({ pressed }) => ({ 
                      opacity: pressed ? 0.9 : 1,
                      transform: [{ scale: pressed ? 0.99 : 1 }]
                    })}
                  >
                    <Card style={{ backgroundColor: colors.surface, borderRadius: tokens.radii.lg }} mode="outlined">
                      <Card.Content style={{ gap: tokens.spacing.md }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <View style={{ flex: 1, gap: 2 }}>
                            <Text variant="titleMedium" style={{ fontWeight: "700" }} numberOfLines={1}>
                              {goal.title}
                            </Text>
                            <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                              Target: {formatDate(goal.deadline)} • {getDaysLeft(goal.deadline)}
                            </Text>
                          </View>
                          <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, color: isReached ? colors.primary : colors.onSurface }}>
                              {formatCurrency(goal.current)}
                            </Text>
                            <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
                              / {formatCurrency(goal.target)}
                            </Text>
                          </View>
                        </View>

                        <View style={{ gap: 4 }}>
                          <ProgressBar 
                            progress={progress} 
                            color={isReached ? colors.primary : colors.secondary} 
                            style={{ height: 6, borderRadius: 3 }} 
                          />
                          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
                              {Math.round(progress * 100)}% Reached
                            </Text>
                            {isReached && (
                              <MaterialCommunityIcons name="trophy-outline" size={14} color={colors.primary} />
                            )}
                          </View>
                        </View>
                      </Card.Content>
                    </Card>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
