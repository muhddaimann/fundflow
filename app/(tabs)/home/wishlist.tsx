import React, { useRef } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Pressable,
} from "react-native";
import { useTheme, Text, Card, ProgressBar, Switch } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useWishlist from "../../../hooks/useWishlist";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";

export default function Wishlist() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const {
    wishlist,
    totalValue,
    totalSaved,
    formatCurrency,
    isEmpty,
    setIsEmpty,
    openAddWishlistModal,
    openEditWishlistModal,
  } = useWishlist();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const overallProgress = totalValue > 0 ? totalSaved / totalValue : 0;

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
          title="Wishlist"
          subtitle="Manage your saving goals"
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
                    Total Savings Progress
                  </Text>
                  <Text
                    variant="displayMedium"
                    style={{ color: colors.onPrimary, fontWeight: "bold" }}
                  >
                    {formatCurrency(totalSaved)}
                  </Text>
                  <Text
                    variant="bodySmall"
                    style={{ color: colors.onPrimary, opacity: 0.7 }}
                  >
                    Target: {formatCurrency(totalValue)}
                  </Text>
                </View>

                <View style={{ gap: tokens.spacing.xs }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      variant="labelSmall"
                      style={{ color: colors.onPrimary }}
                    >
                      {Math.round(overallProgress * 100)}% Complete
                    </Text>
                    <Text
                      variant="labelSmall"
                      style={{ color: colors.onPrimary }}
                    >
                      {formatCurrency(totalValue - totalSaved)} left
                    </Text>
                  </View>
                  <ProgressBar
                    progress={overallProgress}
                    color={colors.onPrimary}
                    style={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: colors.onPrimary + "20",
                    }}
                  />
                </View>
              </Card.Content>
            </View>
          </Card>
        </View>

        {/* Actions Row */}
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Pressable
            onPress={openAddWishlistModal}
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
              name="heart-plus-outline"
              size={24}
              color={colors.primary}
            />
            <Text
              variant="titleMedium"
              style={{ color: colors.primary, fontWeight: "bold" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Add New Wishlist Item
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
              title="Your wishlist is empty"
              message="Add items you want to buy and track your savings progress here."
              icon="heart-outline"
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
              SAVING TARGETS
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: tokens.spacing.md,
              }}
            >
              {wishlist.map((item) => {
                const progress = item.price > 0 ? item.saved / item.price : 0;
                const isComplete = progress >= 1;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => openEditWishlistModal(item)}
                    style={({ pressed }) => ({
                      width: "100%",
                      opacity: pressed ? 0.9 : 1,
                      transform: [{ scale: pressed ? 0.99 : 1 }],
                    })}
                  >
                    <Card
                      style={{
                        backgroundColor: colors.surface,
                        borderRadius: tokens.radii.lg,
                      }}
                      mode="outlined"
                    >
                      <Card.Content style={{ gap: tokens.spacing.md }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <View style={{ flex: 1, gap: 2 }}>
                            <Text
                              variant="titleMedium"
                              style={{ fontWeight: "700" }}
                              numberOfLines={1}
                            >
                              {item.name}
                            </Text>
                            <Text
                              variant="bodySmall"
                              style={{ color: colors.onSurfaceVariant }}
                            >
                              {isComplete
                                ? "Goal Reached!"
                                : `${formatCurrency(item.price - item.saved)} more to go`}
                            </Text>
                          </View>
                          <View style={{ alignItems: "flex-end" }}>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: isComplete
                                  ? colors.primary
                                  : colors.onSurface,
                              }}
                            >
                              {formatCurrency(item.saved)}
                            </Text>
                            <Text
                              variant="labelSmall"
                              style={{ color: colors.onSurfaceVariant }}
                            >
                              of {formatCurrency(item.price)}
                            </Text>
                          </View>
                        </View>

                        <View style={{ gap: 4 }}>
                          <ProgressBar
                            progress={progress}
                            color={
                              isComplete ? colors.primary : colors.secondary
                            }
                            style={{ height: 6, borderRadius: 3 }}
                          />
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              variant="labelSmall"
                              style={{ color: colors.onSurfaceVariant }}
                            >
                              {Math.round(progress * 100)}%
                            </Text>
                            {isComplete && (
                              <MaterialCommunityIcons
                                name="check-decagram"
                                size={14}
                                color={colors.primary}
                              />
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
