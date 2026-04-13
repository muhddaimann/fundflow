import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Pressable,
} from "react-native";
import { useTheme, Text, Card, Switch, Chip, Button } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useClaim from "../../../hooks/useClaim";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";

export default function Claim() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { 
    claims, 
    totalToClaim, 
    formatCurrency, 
    formatDate,
    getTimeAgo,
    isEmpty,
    setIsEmpty,
    openAddClaimModal,
    openEditClaimModal
  } = useClaim();

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
      case "reimbursement": return "file-document-outline";
      case "friend": return "account-outline";
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
          title="Claim"
          subtitle="Manage your claims"
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
            <Card.Content style={{ paddingVertical: tokens.spacing.xl, gap: tokens.spacing.md }}>
              <View style={{ alignItems: "center", gap: tokens.spacing.xxs }}>
                <Text variant="labelMedium" style={{ color: colors.onPrimary, opacity: 0.8, textTransform: "uppercase", letterSpacing: 1.5 }}>
                  Pending Claims
                </Text>
                <Text variant="displayMedium" style={{ color: colors.onPrimary, fontWeight: "bold" }}>
                  {formatCurrency(totalToClaim)}
                </Text>
                <Text variant="bodySmall" style={{ color: colors.onPrimary, opacity: 0.7 }}>
                  From {claims.filter(c => c.status === 'pending').length} pending items
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Actions Row */}
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Pressable 
            onPress={openAddClaimModal}
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
              Add New Claim
            </Text>
          </Pressable>
        </View>

        {isEmpty ? (
          <View style={{ paddingHorizontal: tokens.spacing.lg, marginTop: tokens.spacing.sm }}>
            <NoData 
              title="Nothing to claim" 
              message="You have no pending claims. All your expected money has been received!" 
              icon="cash-check"
            />
          </View>
        ) : (
          <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
            <Text variant="titleMedium" style={{ fontWeight: "800", letterSpacing: 0.5 }}>
              CLAIM LIST
            </Text>
            
            <View style={{ gap: tokens.spacing.sm }}>
              {claims.map((item) => {
                const isReceived = item.status === "received";
                return (
                  <Pressable 
                    key={item.id} 
                    onPress={() => openEditClaimModal(item)}
                    style={({ pressed }) => ({ 
                      opacity: pressed ? 0.9 : 1,
                      transform: [{ scale: pressed ? 0.99 : 1 }]
                    })}
                  >
                    <Card 
                      style={{ 
                        backgroundColor: colors.surface, 
                        borderRadius: tokens.radii.lg,
                        opacity: isReceived ? 0.6 : 1
                      }} 
                      mode="outlined"
                    >
                      <Card.Content style={{ gap: tokens.spacing.sm }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <View style={{ flex: 1, gap: 4 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                              <MaterialCommunityIcons name={getTypeIcon(item.type)} size={18} color={colors.primary} />
                              <Text variant="titleMedium" style={{ fontWeight: "700" }}>
                                {item.title}
                              </Text>
                            </View>
                            {item.fromWhom && (
                              <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                                From: {item.fromWhom}
                              </Text>
                            )}
                            <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
                              {formatDate(item.date)} • {getTimeAgo(item.date)}
                            </Text>
                          </View>
                          <View style={{ alignItems: "flex-end", gap: 4 }}>
                            <Text variant="titleLarge" style={{ fontWeight: "bold", color: isReceived ? colors.outline : colors.onSurface }}>
                              {formatCurrency(item.amount)}
                            </Text>
                            {isReceived && <Chip compact style={{ height: 24 }}>Received</Chip>}
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
