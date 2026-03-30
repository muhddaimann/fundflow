import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Pressable,
} from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { useTabs } from "../../contexts/tabContext";
import ScrollTop from "../../components/scrollTop";
import EndScreen from "../../components/endScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/b/header";

type Item = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const sections: { title: string; items: Item[] }[] = [
  {
    title: "General",
    items: [
      { label: "Profile", icon: "account-outline" },
      { label: "Currency", icon: "currency-usd" },
      { label: "Notifications", icon: "bell-outline" },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Budget", icon: "chart-donut" },
      { label: "Categories", icon: "shape-outline" },
      { label: "Recurring", icon: "repeat" },
    ],
  },
  {
    title: "Other",
    items: [
      { label: "Export Data", icon: "download-outline" },
      { label: "Help & Support", icon: "help-circle-outline" },
      { label: "About", icon: "information-outline" },
    ],
  },
];

export default function Settings() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { onScroll } = useTabs();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 300);
    onScroll(offset);
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
          paddingTop: tokens.spacing.sm,
          paddingBottom: tokens.spacing["3xl"],
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        {sections.map((section, idx) => (
          <View key={idx} style={{ gap: tokens.spacing.sm }}>
            <Text
              style={{
                fontSize: tokens.typography.sizes.sm,
                color: colors.onSurfaceVariant,
                opacity: tokens.typography.opacities.muted,
              }}
            >
              {section.title}
            </Text>

            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: tokens.radii.xl,
                overflow: "hidden",
              }}
            >
              {section.items.map((item, i) => (
                <Pressable
                  key={i}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.md,
                    backgroundColor: pressed
                      ? colors.surfaceVariant
                      : "transparent",
                  })}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: tokens.spacing.sm,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={tokens.sizes.icon.md}
                      color={colors.onSurfaceVariant}
                    />
                    <Text
                      style={{
                        fontSize: tokens.typography.sizes.md,
                      }}
                    >
                      {item.label}
                    </Text>
                  </View>

                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={tokens.sizes.icon.md}
                    color={colors.onSurfaceVariant}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        <EndScreen />
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
