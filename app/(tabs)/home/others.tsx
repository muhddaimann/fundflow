import React, { useMemo } from "react";
import { ScrollView, View, Pressable } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../../components/header";
import useOthers, { OtherRoute } from "../../../hooks/useOthers";

type Section = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  items: OtherRoute[];
};

export default function Others() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { routes, navigateTo } = useOthers();

  const sections = useMemo<Section[]>(() => {
    const find = (id: string) => routes.find((r) => r.id === id)!;

    return [
      {
        title: "Planning & Goals",
        icon: "bullseye-arrow",
        items: [find("budget"), find("goals"), find("wishlist")],
      },
      {
        title: "Payments & Sharing",
        icon: "credit-card-sync-outline",
        items: [find("subscription"), find("bills"), find("split")],
      },
      {
        title: "Activity & Setup",
        icon: "cog-outline",
        items: [find("transaction"), find("category")],
      },
      {
        title: "Utilities",
        icon: "toolbox-outline",
        items: [find("tools")],
      },
    ];
  }, [routes]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingBottom: tokens.spacing["3xl"],
        gap: tokens.spacing.md,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Others" subtitle="Explore all features of FundFlow" />

      {sections.map((section, idx) => (
        <View key={idx} style={{ gap: tokens.spacing.md }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.lg,
              marginBottom: -tokens.spacing.xs,
            }}
          >
            <MaterialCommunityIcons
              name={section.icon}
              size={tokens.sizes.icon.sm}
              color={colors.primary}
            />
            <Text
              variant="labelLarge"
              style={{
                fontFamily: tokens.typography.families.bold,
                fontWeight: "700",
                color: colors.primary,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              {section.title}
            </Text>
          </View>

          <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.sm }}>
            {section.items.map((route) => (
              <Pressable
                key={route.id}
                onPress={() => navigateTo(route.path)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: tokens.spacing.md,
                  padding: tokens.spacing.md,
                  borderRadius: tokens.radii.lg,
                  borderWidth: 1,
                  borderColor: colors.outlineVariant,
                  backgroundColor: pressed ? colors.surfaceVariant : colors.surface,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radii.md,
                    backgroundColor: colors.surfaceVariant,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name={route.icon}
                    size={tokens.sizes.icon.md}
                    color={colors.onSurfaceVariant}
                  />
                </View>

                <View style={{ flex: 1, gap: 0 }}>
                  <Text
                    variant="titleMedium"
                    style={{
                      fontFamily: tokens.typography.families.bold,
                      fontWeight: "700",
                    }}
                  >
                    {route.label}
                  </Text>
                  <Text
                    variant="bodySmall"
                    style={{
                      color: colors.onSurfaceVariant,
                      opacity: 0.6,
                    }}
                  >
                    {route.description}
                  </Text>
                </View>

                <MaterialCommunityIcons
                  name="chevron-right"
                  size={tokens.sizes.icon.sm}
                  color={colors.outline}
                />
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
