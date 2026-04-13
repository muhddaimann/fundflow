import React, { useRef } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Pressable,
} from "react-native";
import { useTheme, Text, Card, List, Switch } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useSubscription from "../../../hooks/useSubscription";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";

export default function Subscription() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const {
    subscriptions,
    totalMonthly,
    formatCurrency,
    formatDate,
    getDaysLeft,
    isEmpty,
    setIsEmpty,
    openAddSubscriptionModal,
    openEditSubscriptionModal,
  } = useSubscription();

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
          title="Subscriptions"
          subtitle="Manage recurring costs"
          rightSlot={
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
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

        {/* Summary Card */}
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
              <Card.Content style={{ paddingVertical: tokens.spacing.xl }}>
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
                    Monthly Recurring Cost
                  </Text>
                  <Text
                    variant="displayMedium"
                    style={{ color: colors.onPrimary, fontWeight: "bold" }}
                  >
                    {formatCurrency(totalMonthly)}
                  </Text>
                </View>
              </Card.Content>
            </View>
          </Card>
        </View>

        {/* Actions Row */}
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Pressable
            onPress={openAddSubscriptionModal}
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
              borderStyle: "dashed",
              borderColor: colors.primary,
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <MaterialCommunityIcons
              name="repeat"
              size={24}
              color={colors.primary}
            />
            <Text
              variant="titleMedium"
              style={{ color: colors.primary, fontWeight: "bold" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Add New Subscription
            </Text>
          </Pressable>
        </View>

        {isEmpty ? (
          <View
            style={{
              paddingHorizontal: tokens.spacing.lg,
              marginTop: tokens.spacing.sm,
            }}
          >
            <NoData
              title="No subscriptions"
              message="Track your streaming, gym, and other recurring payments here."
              icon="repeat"
            />
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: tokens.spacing.lg,
              gap: tokens.spacing.md,
            }}
          >
            <Text
              variant="titleMedium"
              style={{ fontWeight: "800", letterSpacing: 0.5 }}
            >
              ACTIVE SERVICES
            </Text>

            <View style={{ gap: tokens.spacing.sm }}>
              {subscriptions.map((sub) => (
                <Pressable
                  key={sub.id}
                  onPress={() => openEditSubscriptionModal(sub)}
                >
                  <Card
                    style={{
                      backgroundColor: colors.surface,
                      borderRadius: tokens.radii.lg,
                    }}
                    mode="outlined"
                  >
                    <List.Item
                      title={sub.name}
                      titleStyle={{ fontWeight: "600" }}
                      description={`Next: ${formatDate(sub.nextBilling)} • ${getDaysLeft(sub.nextBilling)}`}
                      right={() => (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "flex-end",
                          }}
                        >
                          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                            {formatCurrency(sub.amount)}
                          </Text>
                          <Text
                            variant="labelSmall"
                            style={{ color: colors.onSurfaceVariant }}
                          >
                            per {sub.frequency === "monthly" ? "month" : "year"}
                          </Text>
                        </View>
                      )}
                      left={(props) => (
                        <View
                          style={{
                            justifyContent: "center",
                            paddingLeft: tokens.spacing.xs,
                          }}
                        >
                          <View
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: 22,
                              backgroundColor: colors.surfaceVariant,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <MaterialCommunityIcons
                              name="repeat"
                              size={24}
                              color={colors.onSurfaceVariant}
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
