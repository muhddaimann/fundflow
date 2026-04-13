import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Pressable,
} from "react-native";
import { useTheme, Text, Card, Switch, IconButton, Chip, Button } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import usePay from "../../../hooks/usePay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";

export default function Pay() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { 
    payables, 
    totalToPay, 
    formatCurrency, 
    formatDate,
    getDaysLeft,
    isEmpty,
    setIsEmpty,
    markAsPaid,
    deletePayable,
    openAddPayableModal,
    openEditPayableModal
  } = usePay();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bill": return "file-document-outline";
      case "friend": return "account-outline";
      case "debt": return "bank-outline";
      default: return "dots-horizontal";
    }
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
          title="Pay"
          subtitle="Manage what you owe"
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
              backgroundColor: colors.errorContainer, 
              borderRadius: tokens.radii["2xl"],
            }} 
            mode="elevated"
          >
            <Card.Content style={{ paddingVertical: tokens.spacing.xl, gap: tokens.spacing.md }}>
              <View style={{ alignItems: "center", gap: tokens.spacing.xxs }}>
                <Text variant="labelMedium" style={{ color: colors.onErrorContainer, opacity: 0.8, textTransform: "uppercase", letterSpacing: 1.5 }}>
                  Total Outstanding
                </Text>
                <Text variant="displayMedium" style={{ color: colors.onErrorContainer, fontWeight: "bold" }}>
                  {formatCurrency(totalToPay)}
                </Text>
                <Text variant="bodySmall" style={{ color: colors.onErrorContainer, opacity: 0.7 }}>
                  Across {payables.filter(p => p.status === 'pending').length} pending items
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Actions Row */}
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Pressable 
            onPress={openAddPayableModal}
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
            <Text 
              variant="titleMedium" 
              style={{ color: colors.primary, fontWeight: "bold" }}
            >
              Add New Payment
            </Text>
          </Pressable>
        </View>

        {isEmpty ? (
          <View style={{ paddingHorizontal: tokens.spacing.lg, marginTop: tokens.spacing.sm }}>
            <NoData 
              title="All clear!" 
              message="You have no pending payments. Great job staying on top of your debts!" 
              icon="check-circle-outline"
            />
          </View>
        ) : (
          <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
            <Text variant="titleMedium" style={{ fontWeight: "800", letterSpacing: 0.5 }}>
              PENDING PAYMENTS
            </Text>
            
            <View style={{ gap: tokens.spacing.sm }}>
              {payables.map((item) => {
                const isPaid = item.status === "paid";
                return (
                  <Pressable 
                    key={item.id} 
                    onPress={() => openEditPayableModal(item)}
                    style={({ pressed }) => ({ 
                      opacity: pressed ? 0.9 : 1,
                      transform: [{ scale: pressed ? 0.99 : 1 }]
                    })}
                  >
                    <Card 
                      style={{ 
                        backgroundColor: colors.surface, 
                        borderRadius: tokens.radii.lg,
                        opacity: isPaid ? 0.6 : 1
                      }} 
                      mode="outlined"
                    >
                      <Card.Content style={{ gap: tokens.spacing.sm }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <View style={{ flex: 1, gap: 4 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                              <MaterialCommunityIcons name={getTypeIcon(item.type)} size={18} color={colors.primary} />
                              <Text variant="titleMedium" style={{ fontWeight: "700", textDecorationLine: isPaid ? 'line-through' : 'none' }}>
                                {item.title}
                              </Text>
                            </View>
                            {item.toWhom && (
                              <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                                To: {item.toWhom}
                              </Text>
                            )}
                            <Text variant="labelSmall" style={{ color: isPaid ? colors.primary : colors.onSurfaceVariant }}>
                              Due: {formatDate(item.dueDate)} • {getDaysLeft(item.dueDate)}
                            </Text>
                          </View>
                          <View style={{ alignItems: "flex-end", gap: 4 }}>
                            <Text variant="titleLarge" style={{ fontWeight: "bold", color: isPaid ? colors.outline : colors.onSurface }}>
                              {formatCurrency(item.amount)}
                            </Text>
                            {isPaid && <Chip compact style={{ height: 24 }}>Paid</Chip>}
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
