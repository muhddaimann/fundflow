import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { useRouter } from "expo-router";

export type CardItem = {
  label: string;
  amount: string | number;
  icon: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  labelColor?: string;
  route?: string;
  params?: Record<string, any>;
  isPrimary?: boolean;
};

type MainRowProps = {
  items: CardItem[];
};

export default function MainRow({ items }: MainRowProps) {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();

  const renderCard = (
    item: CardItem,
    index: number,
    flex = 1,
    isPrimary = false,
  ) => {
    const Wrapper = (item.route ? Pressable : View) as any;
    const baseColor = item.textColor ?? colors.primary;

    return (
      <Wrapper
        key={index}
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
          padding: tokens.spacing.md,
          justifyContent: "space-between",
          borderWidth: isPrimary ? 0 : 1.5,
          borderStyle: isPrimary ? "solid" : "dashed",
          borderColor: isPrimary ? "transparent" : baseColor + "30",
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
              fontFamily: tokens.typography.families.bold,
              fontWeight: "700",
              color: item.textColor ?? colors.onSurface,
            }}
          >
            {item.amount}
          </Text>

          <Text
            style={{
              fontSize: tokens.typography.sizes.xs,
              fontFamily: tokens.typography.families.medium,
              color: item.labelColor ?? colors.onSurfaceVariant,
              opacity: isPrimary ? 1 : 0.8,
            }}
          >
            {item.label}
          </Text>
        </View>
      </Wrapper>
    );
  };

  if (items.length === 0) return null;

  return (
    <View
      style={{
        paddingHorizontal: tokens.spacing.lg,
        flexDirection: "row",
        gap: tokens.spacing.sm,
      }}
    >
      {/* First item is always the large primary card */}
      {renderCard(items[0], 0, 1, true)}

      {/* Remaining items are stacked in the right column */}
      {items.length > 1 && (
        <View style={{ flex: 1, gap: tokens.spacing.sm }}>
          {items.slice(1).map((item, idx) => renderCard(item, idx + 1))}
        </View>
      )}
    </View>
  );
}
