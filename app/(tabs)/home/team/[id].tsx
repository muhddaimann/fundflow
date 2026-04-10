import React, { useRef } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View, Pressable } from "react-native";
import { useTheme, List, Text, Card, IconButton, Divider, Button } from "react-native-paper";
import { useDesign } from "../../../../contexts/designContext";
import ScrollTop from "../../../../components/scrollTop";
import Header from "../../../../components/header";
import EndScreen from "../../../../components/endScreen";
import useSplit, { Group } from "../../../../hooks/useSplit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function TeamDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const tokens = useDesign();
  const { getGroupById, formatCurrency, calculateBalances, openAddExpenseModal } = useSplit();
  
  const group = getGroupById(id);
  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  if (!group) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Team not found</Text>
        <Button onPress={() => router.back()}>Go Back</Button>
      </View>
    );
  }

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const balances = calculateBalances(group);
  const totalGroupSpend = group.expenses.reduce((sum, e) => sum + e.amount, 0);

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
          title={group.name} 
          subtitle={`${group.members.length} members`}
        />

        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
          {/* Group Summary Card */}
          <Card style={{ backgroundColor: colors.primary, borderRadius: tokens.radii["2xl"] }} mode="elevated">
            <Card.Content style={{ paddingVertical: tokens.spacing.xl, alignItems: "center", gap: 4 }}>
              <Text variant="labelMedium" style={{ color: colors.onPrimary, opacity: 0.8, textTransform: "uppercase" }}>
                Total Group Spending
              </Text>
              <Text variant="displayMedium" style={{ color: colors.onPrimary, fontWeight: "bold" }}>
                {formatCurrency(totalGroupSpend)}
              </Text>
            </Card.Content>
          </Card>

          {/* Member Balances Section */}
          <View style={{ gap: tokens.spacing.md }}>
            <Text variant="titleMedium" style={{ fontWeight: "800", letterSpacing: 0.5 }}>
              MEMBER BALANCES
            </Text>
            
            <View style={{ gap: tokens.spacing.sm }}>
              {group.members.map((member) => {
                const bal = balances[member] || 0;
                const isPositive = bal > 0;
                const isZero = Math.abs(bal) < 0.01;

                return (
                  <Card key={member} style={{ backgroundColor: colors.surface, borderRadius: tokens.radii.lg }} mode="outlined">
                    <List.Item
                      title={member}
                      titleStyle={{ fontWeight: "700" }}
                      description={isZero ? "Settled" : isPositive ? "To claim" : "To pay"}
                      left={() => (
                        <View style={{ justifyContent: "center", paddingLeft: tokens.spacing.xs }}>
                          <View style={{ 
                            width: 44, 
                            height: 44, 
                            borderRadius: 22, 
                            backgroundColor: isZero ? colors.surfaceVariant : isPositive ? colors.primary + '15' : colors.error + '15',
                            alignItems: "center", 
                            justifyContent: "center" 
                          }}>
                            <MaterialCommunityIcons 
                              name="account" 
                              size={24} 
                              color={isZero ? colors.onSurfaceVariant : isPositive ? colors.primary : colors.error} 
                            />
                          </View>
                        </View>
                      )}
                      right={() => (
                        <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                          <Text style={{ 
                            fontWeight: "bold", 
                            fontSize: 16,
                            color: isZero ? colors.onSurfaceVariant : isPositive ? colors.primary : colors.error
                          }}>
                            {isZero ? "" : isPositive ? "+" : "-"}{formatCurrency(Math.abs(bal))}
                          </Text>
                        </View>
                      )}
                    />
                  </Card>
                );
              })}
            </View>
          </View>

          {/* Action Button */}
          <Pressable 
            onPress={() => openAddExpenseModal(group.id)}
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
            <MaterialCommunityIcons name="plus-circle-outline" size={24} color={colors.primary} />
            <Text variant="titleMedium" style={{ color: colors.primary, fontWeight: "bold" }}>
              Add Group Expense
            </Text>
          </Pressable>

          {/* Activity Feed */}
          <View style={{ gap: tokens.spacing.md }}>
            <Text variant="titleMedium" style={{ fontWeight: "800", letterSpacing: 0.5 }}>
              RECENT ACTIVITY
            </Text>
            <View style={{ gap: tokens.spacing.xs }}>
              {group.expenses.length === 0 ? (
                <Text style={{ textAlign: "center", color: colors.onSurfaceVariant, marginTop: 10 }}>
                  No activity yet.
                </Text>
              ) : (
                group.expenses.map((exp) => (
                  <Card key={exp.id} style={{ backgroundColor: colors.surface, borderRadius: tokens.radii.lg }} mode="outlined">
                    <List.Item
                      title={exp.title}
                      titleStyle={{ fontWeight: "600" }}
                      description={`Paid by ${exp.payer} • ${new Date(exp.date).toLocaleDateString()}`}
                      right={() => (
                        <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 16 }}>
                          {formatCurrency(exp.amount)}
                        </Text>
                      )}
                      left={() => (
                        <View style={{ justifyContent: "center", paddingLeft: tokens.spacing.xs }}>
                          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceVariant, alignItems: "center", justifyContent: "center" }}>
                            <MaterialCommunityIcons name="cash" size={20} color={colors.onSurfaceVariant} />
                          </View>
                        </View>
                      )}
                    />
                  </Card>
                ))
              )}
            </View>
          </View>
        </View>
        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
