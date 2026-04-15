import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme, Card } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useBills from "../../hooks/useBills";
import { useRouter } from "expo-router";

export default function BillsCard() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { bills, totalPending, formatCurrency } = useBills();

  const pendingCount = bills.filter((b) => b.status === "pending").length;

  return (
    <Pressable onPress={() => router.push("/home/bills")}>
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
              name="file-document-outline"
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
              {pendingCount} bills pending
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: colors.onSecondaryContainer, opacity: 0.7 }}
            >
              Total due: {formatCurrency(totalPending)}
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
