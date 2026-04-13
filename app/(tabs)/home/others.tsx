import React from "react";
import { ScrollView, View, Pressable } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SectionHeader from "../../../components/secHeader";
import useOthers from "../../../hooks/useOthers";

export default function Others() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { routes, navigateTo } = useOthers();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingTop: tokens.spacing.lg,
        paddingBottom: tokens.spacing["3xl"],
        gap: tokens.spacing.md,
      }}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        icon={
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={tokens.sizes.icon.md}
            color={colors.onSurfaceVariant}
          />
        }
        head="Other Actions"
        subHeader="Explore all features of FundFlow"
      />

      <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
        {routes.map((route) => (
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
                width: 48,
                height: 48,
                borderRadius: tokens.radii.md,
                backgroundColor: colors.surfaceVariant,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name={route.icon}
                size={tokens.sizes.icon.lg}
                color={colors.primary}
              />
            </View>

            <View style={{ flex: 1, gap: 2 }}>
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
                  opacity: 0.7,
                }}
              >
                {route.description}
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={tokens.sizes.icon.md}
              color={colors.outline}
            />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
