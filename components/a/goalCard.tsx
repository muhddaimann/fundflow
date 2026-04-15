import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme, Card } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useGoals from "../../hooks/useGoals";
import { useRouter } from "expo-router";

export default function GoalCard() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { goals, totalCurrent, formatCurrency } = useGoals();

  const activeGoals = goals.length;

  return (
    <Pressable onPress={() => router.push("/home/goals")}>
      <Card
        style={{
          backgroundColor: colors.primaryContainer,
          borderRadius: tokens.radii.xl,
          borderWidth: 1,
          borderColor: colors.primary + "20",
        }}
        mode="contained"
      >
        <Card.Content
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: tokens.spacing.lg,
            gap: tokens.spacing.md,
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: tokens.radii.md,
              backgroundColor: colors.onPrimaryContainer + "15",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="flag-outline"
              size={28}
              color={colors.primary}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              variant="titleMedium"
              style={{
                fontFamily: tokens.typography.families.bold,
                fontWeight: "700",
                color: colors.onPrimaryContainer,
              }}
            >
              {activeGoals} active goals
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: colors.onPrimaryContainer, opacity: 0.7 }}
            >
              Saved: {formatCurrency(totalCurrent)}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.primary}
            style={{ opacity: 0.5 }}
          />
        </Card.Content>
      </Card>
    </Pressable>
  );
}
