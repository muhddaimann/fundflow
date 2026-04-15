import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  TouchableOpacity,
} from "react-native";
import { useTheme, Text, List, Switch } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NoData from "../../../components/noData";
import useActivity from "../../../hooks/useActivity";
import { ActivityType } from "../../../hooks/useGlobal";

export default function Activity() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { activities, filter, setFilter, isEmpty } = useActivity();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const filters: { label: string; value: ActivityType | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Spending", value: "spend" },
    { label: "Income", value: "income" },
    { label: "Budgets", value: "budget" },
    { label: "Goals", value: "goal" },
    { label: "Bills", value: "bill" },
  ];

  const getTypeStyles = (type: ActivityType, customColor?: string) => {
    switch (type) {
      case "spend":
        return { bg: colors.errorContainer, icon: colors.error };
      case "income":
        return { bg: colors.tertiaryContainer, icon: colors.tertiary };
      case "budget":
        return {
          bg: (customColor || colors.secondary) + "15",
          icon: customColor || colors.secondary,
        };
      case "bill":
        return {
          bg: (customColor || colors.primary) + "15",
          icon: customColor || colors.primary,
        };
      case "goal":
        return {
          bg: (customColor || "#FF9F43") + "15",
          icon: customColor || "#FF9F43",
        };
      default:
        return { bg: colors.surfaceVariant, icon: colors.onSurfaceVariant };
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
          title="Activity Feed" 
          subtitle="Everything happening in FundFlow" 
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            paddingHorizontal: tokens.spacing.lg,
            gap: tokens.spacing.sm,
            paddingBottom: tokens.spacing.xs,
          }}
        >
          {filters.map((f) => {
            const active = filter === f.value;

            return (
              <TouchableOpacity
                key={f.value}
                onPress={() => setFilter(f.value)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: tokens.radii.pill,
                  backgroundColor: active
                    ? colors.primary
                    : colors.surfaceVariant,
                  borderWidth: 1,
                  borderColor: active ? colors.primary : colors.outlineVariant,
                }}
              >
                <Text
                  variant="labelMedium"
                  style={{
                    color: active ? colors.onPrimary : colors.onSurface,
                    fontWeight: active ? "700" : "500",
                  }}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {activities.length === 0 ? (
          <View style={{ paddingHorizontal: tokens.spacing.lg, marginTop: tokens.spacing.sm }}>
            <NoData 
              title="No activities found" 
              message={filter === 'all' ? "Your activity history will appear here." : `No ${filter} activities yet.`} 
              icon="history"
            />
          </View>
        ) : (
          <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.sm }}>
            {activities.map((item) => {
              const styles = getTypeStyles(item.type, item.color);
              const hasAmount = item.amount !== undefined;

              return (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: tokens.spacing.md,
                    padding: tokens.spacing.md,
                    backgroundColor: colors.surface,
                    borderRadius: tokens.radii.lg,
                    borderWidth: 1,
                    borderColor: colors.outlineVariant,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: tokens.radii.md,
                      backgroundColor: styles.bg,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={22}
                      color={styles.icon}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      variant="bodyLarge"
                      style={{
                        fontFamily: tokens.typography.families.bold,
                        fontWeight: "700",
                        color: colors.onSurface,
                      }}
                    >
                      {item.title}
                    </Text>

                    <Text
                      variant="bodySmall"
                      style={{
                        color: colors.onSurfaceVariant,
                        opacity: 0.7,
                      }}
                    >
                      {item.subtitle} • {item.time}
                    </Text>
                  </View>

                  {hasAmount && (
                    <Text
                      variant="titleMedium"
                      style={{
                        fontFamily: tokens.typography.families.bold,
                        fontWeight: "700",
                        color: item.type === "income" ? colors.tertiary : colors.error,
                      }}
                    >
                      {item.type === "income" ? "+" : "-"}RM{" "}
                      {Math.abs(item.amount!).toFixed(2)}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        )}

        <EndScreen />
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
