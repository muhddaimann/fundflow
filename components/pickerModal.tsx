import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useDesign } from "../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type PickerItem = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  onPress: () => void;
};

type PickerModalProps = {
  title?: string;
  subtitle?: string;
  items: PickerItem[];
  onClose: () => void;
};

export function PickerModal({
  title,
  subtitle,
  items,
  onClose,
}: PickerModalProps) {
  const { colors } = useTheme();
  const tokens = useDesign();

  return (
    <View>
      {(title || subtitle) && (
        <View style={{ gap: 6 }}>
          {title && (
            <Text
              variant="titleLarge"
              style={{
                fontFamily: tokens.typography.families.bold,
                fontWeight: "800",
                letterSpacing: -0.3,
              }}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              variant="bodySmall"
              style={{
                color: colors.onSurfaceVariant,
                fontWeight: "500",
                lineHeight: 18,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}

      <View style={{ gap: tokens.spacing.sm }}>
        {items.map((item, idx) => (
          <Pressable
            key={idx}
            onPress={() => {
              onClose();
              setTimeout(item.onPress, 120);
            }}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: tokens.spacing.md,
              paddingVertical: tokens.spacing.md,
              paddingHorizontal: tokens.spacing.md,
              borderRadius: tokens.radii.xl,
              backgroundColor: pressed ? colors.primary + "10" : colors.surface,
              borderWidth: 1,
              borderColor: pressed
                ? colors.primary + "30"
                : colors.outlineVariant,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: tokens.radii.lg,
                backgroundColor: item.color + "15",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={22}
                color={item.color}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                variant="titleSmall"
                style={{
                  fontFamily: tokens.typography.families.medium,
                  fontWeight: "700",
                }}
              >
                {item.label}
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={colors.onSurfaceVariant}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
