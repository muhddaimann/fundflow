import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme, Card } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useClaim from "../../hooks/useClaim";
import { useRouter } from "expo-router";

export default function ClaimCard() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { claims, totalToClaim, formatCurrency } = useClaim();

  const pendingCount = claims.filter((c) => c.status === "pending").length;

  return (
    <Pressable onPress={() => router.push("/home/claim")}>
      <Card
        style={{
          backgroundColor: colors.tertiaryContainer,
          borderRadius: tokens.radii.xl,
          borderWidth: 1,
          borderColor: colors.tertiary + "20",
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
              backgroundColor: colors.onTertiaryContainer + "15",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="arrow-down-circle-outline"
              size={28}
              color={colors.tertiary}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              variant="titleMedium"
              style={{
                fontFamily: tokens.typography.families.bold,
                fontWeight: "700",
                color: colors.onTertiaryContainer,
              }}
            >
              {pendingCount} to claim
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: colors.onTertiaryContainer, opacity: 0.7 }}
            >
              Expected: {formatCurrency(totalToClaim)}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.tertiary}
            style={{ opacity: 0.5 }}
          />
        </Card.Content>
      </Card>
    </Pressable>
  );
}
