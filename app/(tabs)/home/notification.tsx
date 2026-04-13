import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Pressable,
} from "react-native";
import { useTheme, Text, IconButton, Button } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useNotification from "../../../hooks/useNotification";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";

export default function NotificationPage() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotification();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return "alert-outline";
      case "success":
        return "check-circle-outline";
      case "error":
        return "close-circle-outline";
      default:
        return "information-outline";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "warning":
        return "#FFA000";
      case "success":
        return "#43A047";
      case "error":
        return colors.error;
      default:
        return colors.primary;
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
          title="Notifications"
          subtitle="Stay updated with your finances"
        />

        {notifications.length === 0 ? (
          <View
            style={{
              paddingHorizontal: tokens.spacing.lg,
              marginTop: tokens.spacing.xl,
            }}
          >
            <NoData
              title="No notifications yet"
              message="We'll let you know when something important happens."
              icon="bell-off-outline"
            />
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: tokens.spacing.lg,
              gap: tokens.spacing.md,
            }}
          >
            <View style={{ flexDirection: "row", gap: tokens.spacing.sm }}>
              <Button
                mode="contained-tonal"
                onPress={markAllAsRead}
                disabled={unreadCount === 0}
                style={{ flex: 1, borderRadius: tokens.radii.lg }}
                labelStyle={{ fontSize: 13, fontWeight: "700" }}
                compact
              >
                Mark all as read
              </Button>
              <Button
                mode="outlined"
                onPress={clearAll}
                style={{
                  flex: 1,
                  borderRadius: tokens.radii.lg,
                  borderColor: colors.error,
                }}
                labelStyle={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: colors.error,
                }}
                compact
              >
                Clear all
              </Button>
            </View>

            <View style={{ gap: tokens.spacing.sm }}>
              {notifications.map((item) => {
                const isUnread = !item.isRead;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => markAsRead(item.id)}
                    style={{
                      borderRadius: tokens.radii.xl,
                      padding: tokens.spacing.md,
                      backgroundColor: isUnread
                        ? colors.primaryContainer + "15"
                        : colors.surface,
                      borderWidth: 1,
                      borderColor: isUnread
                        ? colors.primary + "40"
                        : colors.outlineVariant,
                      flexDirection: "row",
                      gap: tokens.spacing.md,
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: tokens.radii.lg,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: getIconColor(item.type) + "15",
                      }}
                    >
                      <MaterialCommunityIcons
                        name={getIcon(item.type)}
                        size={20}
                        color={getIconColor(item.type)}
                      />
                    </View>

                    <View style={{ flex: 1, gap: 4 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          variant="titleSmall"
                          style={{
                            fontWeight: isUnread ? "800" : "600",
                            flex: 1,
                            marginRight: 8,
                          }}
                          numberOfLines={1}
                        >
                          {item.title}
                        </Text>

                        <Text variant="labelSmall" style={{ opacity: 0.5 }}>
                          {item.time}
                        </Text>
                      </View>

                      <Text
                        variant="bodySmall"
                        numberOfLines={2}
                        style={{ opacity: 0.7, lineHeight: 18 }}
                      >
                        {item.message}
                      </Text>
                    </View>

                    <View style={{ alignItems: "flex-end", gap: 6 }}>
                      {isUnread && (
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 99,
                            backgroundColor: colors.primary,
                            marginTop: 4,
                          }}
                        />
                      )}

                      <IconButton
                        icon="close"
                        size={16}
                        onPress={() => deleteNotification(item.id)}
                        style={{ margin: 0 }}
                      />
                    </View>
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
