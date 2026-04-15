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
  color: string;
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
        color: colors.primary,
        items: [find("budget"), find("goals"), find("wishlist")],
      },
      {
        title: "Payments & Sharing",
        icon: "credit-card-sync-outline",
        color: colors.secondary,
        items: [
          find("spend"),
          find("pay"),
          find("claim"),
          find("subscription"),
          find("bills"),
          find("split"),
        ],
      },
      {
        title: "Activity & Setup",
        icon: "cog-outline",
        color: colors.onPrimaryContainer,
        items: [find("activity"), find("transaction"), find("category")],
      },
      {
        title: "Utilities",
        icon: "toolbox-outline",
        color: colors.onSecondaryContainer,
        items: [find("tools")],
      },
    ];
  }, [routes, colors]);

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
              color={section.color}
            />
            <Text
              variant="labelLarge"
              style={{
                fontFamily: tokens.typography.families.bold,
                fontWeight: "700",
                color: section.color,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              {section.title}
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: tokens.spacing.lg,
              gap: tokens.spacing.sm,
            }}
          >
            {section.items.map((route, i) => {
              const shades = ["12", "18", "1F", "26", "2E", "36"];
              const shade = shades[i % shades.length];

              return (
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
                    borderColor: section.color + "30",
                    backgroundColor: pressed
                      ? section.color + "22"
                      : section.color + shade,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  })}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: tokens.radii.md,
                      backgroundColor: colors.surface,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: section.color + "15",
                    }}
                  >
                    <MaterialCommunityIcons
                      name={route.icon}
                      size={tokens.sizes.icon.md}
                      color={section.color}
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
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
