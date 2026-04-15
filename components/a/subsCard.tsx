import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme, Card } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useSubscription from "../../hooks/useSubscription";
import { useRouter } from "expo-router";

export default function SubsCard() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { subscriptions, totalMonthly, formatCurrency } = useSubscription();

  const activeCount = subscriptions.length;

  return (
    <Pressable onPress={() => router.push("/home/subscription")}>
      <Card
        style={{
          backgroundColor: colors.secondaryContainer,
          borderRadius: tokens.radii.xl,
          borderWidth: 1,
          borderColor: colors.secondary + "20",
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
              backgroundColor: colors.onSecondaryContainer + "15",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="repeat"
              size={28}
              color={colors.secondary}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              variant="titleMedium"
              style={{
                fontFamily: tokens.typography.families.bold,
                fontWeight: "700",
                color: colors.onSecondaryContainer,
              }}
            >
              {activeCount} subscriptions
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: colors.onSecondaryContainer, opacity: 0.7 }}
            >
              Monthly total: {formatCurrency(totalMonthly)}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.secondary}
            style={{ opacity: 0.5 }}
          />
        </Card.Content>
      </Card>
    </Pressable>
  );
}
