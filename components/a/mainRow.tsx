import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

type CardItem = {
  amount: string | number;
  label: string;
  icon: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  labelColor?: string;
};

type MainRowProps = {
  left: CardItem;
  topRight: CardItem;
  bottomRight: CardItem;
};

export default function MainRow({ left, topRight, bottomRight }: MainRowProps) {
  const { colors } = useTheme();
  const tokens = useDesign();

  const Card = (item: CardItem, key: string, flex = 1) => (
    <View
      key={key}
      style={{
        flex,
        backgroundColor: item.bgColor ?? colors.surfaceVariant,
        borderRadius: tokens.radii.xl,
        padding: tokens.spacing.md,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          alignSelf: "flex-end",
        }}
      >
        {item.icon}
      </View>

      <View style={{ gap: tokens.spacing.xxs }}>
        <Text
          style={{
            fontSize: tokens.typography.sizes.lg,
            fontWeight: tokens.typography.weights.bold,
            color: item.textColor ?? colors.onSurface,
          }}
        >
          {item.amount}
        </Text>

        <Text
          style={{
            fontSize: tokens.typography.sizes.sm,
            color: item.labelColor ?? colors.onSurfaceVariant,
          }}
        >
          {item.label}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={{
        paddingHorizontal: tokens.spacing.lg,
        flexDirection: "row",
        gap: tokens.spacing.md,
      }}
    >
      {Card(left, "left", 1)}

      <View style={{ flex: 1, gap: tokens.spacing.md }}>
        {Card(topRight, "top")}
        {Card(bottomRight, "bottom")}
      </View>
    </View>
  );
}
