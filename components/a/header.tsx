import React from "react";
import { View, Pressable } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useGlobal from "../../hooks/useGlobal";
import useNotification from "../../hooks/useNotification";
import { useRouter } from "expo-router";

type HeaderProps = {
  name?: string;
};

export default function Header({ name = "User" }: HeaderProps) {
  const { colors } = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { greeting, today, initials, setIsEmpty, isEmpty } = useGlobal(name);
  const { unreadCount } = useNotification();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        paddingHorizontal: tokens.spacing.lg,
      }}
    >
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text
          variant="bodyMedium"
          style={{
            color: colors.onSurfaceVariant,
            opacity: tokens.typography.opacities.muted,
          }}
        >
          {greeting}, {name}
        </Text>

        <Text
          variant="headlineMedium"
          style={{
            fontWeight: "700",
            lineHeight: tokens.typography.sizes["2xl"] + 4,
            letterSpacing: -0.5,
          }}
        >
          Your spending{"\n"}in a glance
        </Text>
      </View>

      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: tokens.spacing.sm,
          }}
        >
          <Pressable
            onPress={() => router.push("home/notification")}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              borderRadius: tokens.radii.full,
              backgroundColor: colors.surfaceVariant,
              alignItems: "center",
              justifyContent: "center",
              transform: [{ scale: pressed ? 0.96 : 1 }],
            })}
          >
            <View>
              <MaterialCommunityIcons
                name="bell-outline"
                size={tokens.sizes.icon.xl}
                color={colors.onSurfaceVariant}
              />
              {unreadCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: colors.error,
                    borderWidth: 2,
                    borderColor: colors.surfaceVariant,
                  }}
                />
              )}
            </View>
          </Pressable>

          <Pressable
            onPress={() => setIsEmpty(!isEmpty)}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              borderRadius: tokens.radii.full,
              backgroundColor: isEmpty ? colors.surfaceVariant : colors.primary,
              alignItems: "center",
              justifyContent: "center",
              transform: [{ scale: pressed ? 0.96 : 1 }],
            })}
          >
            <Text
              variant="titleLarge"
              style={{
                color: isEmpty ? colors.onSurfaceVariant : colors.onPrimary,
                fontWeight: "700",
              }}
            >
              {initials}
            </Text>
          </Pressable>
        </View>

        <Text
          variant="bodySmall"
          style={{
            color: colors.onSurfaceVariant,
            opacity: tokens.typography.opacities.muted,
          }}
        >
          {today}
        </Text>
      </View>
    </View>
  );
}
