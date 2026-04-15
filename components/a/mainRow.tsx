import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { useRouter } from "expo-router";

type CardItem = {
  amount: string | number;
  icon: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  labelColor?: string;
  route?: string;
  params?: Record<string, any>;
};

type MainRowProps = {
  totalSpend: CardItem;
  toPay: CardItem;
  toClaim: CardItem;
};

export default function MainRow({ totalSpend, toPay, toClaim }: MainRowProps) {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();

  const Card = (
    item: CardItem,
    label: string,
    key: string,
    flex = 1,
    isPrimary = false,
  ) => {
    const Wrapper = (item.route ? Pressable : View) as any;

    return (
      <Wrapper
        key={key}
        onPress={() =>
          item.route &&
          router.push({
            pathname: item.route!,
            params: item.params,
          })
        }
        style={({ pressed }: any) => ({
          flex,
          backgroundColor: item.bgColor ?? colors.surfaceVariant,
          borderRadius: tokens.radii.xl,
          padding: tokens.spacing.sm,
          justifyContent: "space-between",
          transform: [{ scale: pressed ? 0.97 : 1 }],
        })}
      >
        <View style={{ alignSelf: "flex-end" }}>{item.icon}</View>

        <View style={{ gap: tokens.spacing.xxs }}>
          <Text
            style={{
              fontSize: isPrimary
                ? tokens.typography.sizes.xl
                : tokens.typography.sizes.md,
              fontWeight: tokens.typography.weights.bold,
              color: item.textColor ?? colors.onSurface,
            }}
          >
            {item.amount}
          </Text>

          <Text
            style={{
              fontSize: tokens.typography.sizes.xs,
              color: item.labelColor ?? colors.onSurfaceVariant,
            }}
          >
            {label}
          </Text>
        </View>
      </Wrapper>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: tokens.spacing.lg,
        flexDirection: "row",
        gap: tokens.spacing.sm,
      }}
    >
      {Card(totalSpend, "Total Spend", "left", 1, true)}

      <View style={{ flex: 1, gap: tokens.spacing.sm }}>
        {Card(toPay, "To Pay", "top")}
        {Card(toClaim, "To Claim", "bottom")}
      </View>
    </View>
  );
}
