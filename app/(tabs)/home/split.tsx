import React, { useRef } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View, Pressable } from "react-native";
import { useTheme, List, Text, Card, Switch, IconButton } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useSplit from "../../../hooks/useSplit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";
import { useRouter } from "expo-router";

export default function Split() {
  const router = useRouter();
  const { colors } = useTheme();
  const tokens = useDesign();
  const { 
    groups, 
    formatCurrency, 
    calculateBalances,
    isEmpty,
    setIsEmpty,
    openCreateGroupModal
  } = useSplit();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

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
          gap: tokens.spacing.md,
        }}
      >
        <Header 
          title="Split" 
          subtitle="Shared expenses" 
          rightSlot={
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>Empty</Text>
              <Switch value={isEmpty} onValueChange={setIsEmpty} />
            </View>
          }
        />

        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
          <View>
            <Text variant="titleMedium" style={{ fontWeight: "800", letterSpacing: 0.5 }}>
              YOUR TEAMS
            </Text>
            <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
              Groups for splitting bills and expenses
            </Text>
          </View>

          <Pressable 
            onPress={openCreateGroupModal}
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
            <MaterialCommunityIcons name="account-group-outline" size={24} color={colors.primary} />
            <Text variant="titleMedium" style={{ color: colors.primary, fontWeight: "bold" }}>
              Create New Team
            </Text>
          </Pressable>

          {isEmpty ? (
            <View style={{ marginTop: tokens.spacing.sm }}>
              <NoData 
                title="No teams yet" 
                message="Create a group to start splitting dinner bills, trips, or house rent with friends." 
                icon="account-multiple-plus-outline"
              />
            </View>
          ) : (
            <View style={{ gap: tokens.spacing.sm }}>
              {groups.map((group) => {
                const balances = calculateBalances(group);
                const yourBalance = balances["You"] || 0;
                
                return (
                  <Pressable key={group.id} onPress={() => router.push(`/home/team/${group.id}`)}>
                    <Card style={{ backgroundColor: colors.surface, borderRadius: tokens.radii.lg }} mode="outlined">
                      <List.Item
                        title={group.name}
                        titleStyle={{ fontWeight: "700" }}
                        description={`${group.members.length} members • ${group.expenses.length} expenses`}
                        right={() => (
                          <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                            <Text style={{ 
                              fontWeight: "bold", 
                              color: Math.abs(yourBalance) < 0.01 ? colors.onSurfaceVariant : yourBalance >= 0 ? colors.primary : colors.error 
                            }}>
                              {Math.abs(yourBalance) < 0.01 ? "" : yourBalance >= 0 ? "+" : "-"}{formatCurrency(Math.abs(yourBalance))}
                            </Text>
                            <Text variant="labelSmall" style={{ opacity: 0.6 }}>
                              {Math.abs(yourBalance) < 0.01 ? "Settled" : yourBalance >= 0 ? "Owed to you" : "You owe"}
                            </Text>
                          </View>
                        )}
                        left={() => (
                          <View style={{ justifyContent: "center", paddingLeft: tokens.spacing.xs }}>
                            <View style={{ 
                              width: 48, 
                              height: 48, 
                              borderRadius: tokens.radii.md, 
                              backgroundColor: colors.surfaceVariant,
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              <MaterialCommunityIcons name="account-group" size={24} color={colors.onSurfaceVariant} />
                            </View>
                          </View>
                        )}
                      />
                    </Card>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>

        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
