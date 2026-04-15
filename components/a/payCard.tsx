import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme, Card } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import usePay from "../../hooks/usePay";
import { useRouter } from "expo-router";

export default function PayCard() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { payables, totalToPay, formatCurrency } = usePay();

  const pendingCount = payables.filter((p) => p.status === "pending").length;

  return (
    <Pressable onPress={() => router.push("/home/pay")}>
      <Card
        style={{
          backgroundColor: colors.errorContainer,
          borderRadius: tokens.radii.xl,
          borderWidth: 1,
          borderColor: colors.error + "20",
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
              backgroundColor: colors.onErrorContainer + "15",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="arrow-up-circle-outline"
              size={28}
              color={colors.error}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              variant="titleMedium"
              style={{
                fontFamily: tokens.typography.families.bold,
                fontWeight: "700",
                color: colors.onErrorContainer,
              }}
            >
              {pendingCount} to pay
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: colors.onErrorContainer, opacity: 0.7 }}
            >
              Total debt: {formatCurrency(totalToPay)}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.error}
            style={{ opacity: 0.5 }}
          />
        </Card.Content>
      </Card>
    </Pressable>
  );
}
