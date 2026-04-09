import React, { useRef } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View, Pressable } from "react-native";
import { useTheme, Text, Card, List, Switch } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useBills from "../../../hooks/useBills";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";

export default function Bills() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { 
    bills, 
    totalPending,
    overdueCount,
    formatCurrency, 
    formatDate, 
    getDaysLeft,
    isEmpty,
    setIsEmpty,
    openAddBillModal,
    openEditBillModal
  } = useBills();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return "check-circle";
      case "overdue": return "alert-circle";
      default: return "clock-outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return colors.primary;
      case "overdue": return colors.error;
      default: return colors.onSurfaceVariant;
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
          gap: tokens.spacing.lg,
          paddingTop: tokens.spacing.md
        }}
      >
        <Header 
          title="Upcoming Bills" 
          subtitle="Don't miss these payments" 
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
              backgroundColor: overdueCount > 0 ? colors.error : colors.primary, 
              borderRadius: tokens.radii["2xl"],
            }} 
            mode="elevated"
          >
            <View style={{ borderRadius: tokens.radii["2xl"], overflow: "hidden" }}>
              <Card.Content style={{ paddingVertical: tokens.spacing.xl, gap: tokens.spacing.md }}>
                <View style={{ alignItems: "center", gap: tokens.spacing.xxs }}>
                  <Text variant="labelMedium" style={{ color: colors.onPrimary, opacity: 0.8, textTransform: "uppercase", letterSpacing: 1.5 }}>
                    Total Pending Bills
                  </Text>
                  <Text variant="displayMedium" style={{ color: colors.onPrimary, fontWeight: "bold" }}>
                    {formatCurrency(totalPending)}
                  </Text>
                </View>

                {overdueCount > 0 && (
                  <View style={{ 
                    flexDirection: "row", 
                    alignItems: "center", 
                    justifyContent: "center",
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                    borderRadius: tokens.radii.pill,
                    alignSelf: "center",
                    gap: 6
                  }}>
                    <MaterialCommunityIcons name="alert-circle" size={14} color={colors.onPrimary} />
                    <Text variant="labelSmall" style={{ color: colors.onPrimary, fontWeight: "700" }}>
                      {overdueCount} OVERDUE
                    </Text>
                  </View>
                )}
              </Card.Content>
            </View>
          </Card>
        </View>

        {/* Actions Row */}
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Pressable 
            onPress={openAddBillModal}
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
            <MaterialCommunityIcons name="file-document-edit-outline" size={24} color={colors.primary} />
            <Text 
              variant="titleMedium" 
              style={{ color: colors.primary, fontWeight: "bold" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Add New Bill
            </Text>
          </Pressable>
        </View>

        {isEmpty ? (
          <View style={{ paddingHorizontal: tokens.spacing.lg, marginTop: tokens.spacing.sm }}>
            <NoData 
              title="No bills track" 
              message="Add your utility, rent, and other bills here to track their due dates." 
              icon="file-document-outline"
            />
          </View>
        ) : (
          <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
            <Text variant="titleMedium" style={{ fontWeight: "800", letterSpacing: 0.5 }}>
              BILLING SCHEDULE
            </Text>
            
            <View style={{ gap: tokens.spacing.sm }}>
              {bills.map((bill) => (
                <Pressable key={bill.id} onPress={() => openEditBillModal(bill)}>
                  <Card style={{ backgroundColor: colors.surface, borderRadius: tokens.radii.lg }} mode="outlined">
                    <List.Item
                      title={bill.name}
                      titleStyle={{ fontWeight: "600" }}
                      description={`Due: ${formatDate(bill.dueDate)} • ${getDaysLeft(bill.dueDate)}`}
                      right={() => (
                        <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                          <Text style={{ 
                            fontWeight: "bold", 
                            fontSize: 16,
                            color: bill.status === "overdue" ? colors.error : colors.onSurface
                          }}>
                            {formatCurrency(bill.amount)}
                          </Text>
                          <Text variant="labelSmall" style={{ 
                            color: getStatusColor(bill.status),
                            fontWeight: "700",
                            textTransform: "uppercase"
                          }}>
                            {bill.status}
                          </Text>
                        </View>
                      )}
                      left={props => (
                        <View style={{ justifyContent: "center", paddingLeft: tokens.spacing.xs }}>
                          <View style={{ 
                            width: 44, 
                            height: 44, 
                            borderRadius: 22, 
                            backgroundColor: getStatusColor(bill.status) + '15',
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <MaterialCommunityIcons 
                              name={getStatusIcon(bill.status)} 
                              size={24} 
                              color={getStatusColor(bill.status)} 
                            />
                          </View>
                        </View>
                      )}
                    />
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
