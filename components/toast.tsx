import React, { useEffect, useRef } from "react";
import { Animated, View, TouchableOpacity, StyleSheet } from "react-native";
import { Surface, Text, useTheme, Icon, Portal } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDesign } from "../contexts/designContext";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

type Props = {
  visible: boolean;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss: () => void;
  duration?: number;
  variant?: ToastVariant;
  icon?: string;
};

export function OverlayToast({
  visible,
  message,
  actionLabel,
  onAction,
  onDismiss,
  duration = 3000,
  variant = "default",
  icon,
}: Props) {
  const theme = useTheme();
  const tokens = useDesign();
  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const variantConfig = {
    default: {
      accent: theme.colors.primary,
      bg: theme.colors.elevation.level2,
      text: theme.colors.onSurface,
      icon: icon ?? "information",
    },
    success: {
      accent: theme.colors.tertiary,
      bg: theme.colors.tertiaryContainer,
      text: theme.colors.onTertiaryContainer,
      icon: icon ?? "check-circle",
    },
    error: {
      accent: theme.colors.error,
      bg: theme.colors.errorContainer,
      text: theme.colors.onErrorContainer,
      icon: icon ?? "alert-circle",
    },
    warning: {
      accent: theme.colors.secondary,
      bg: theme.colors.secondaryContainer,
      text: theme.colors.onSecondaryContainer,
      icon: icon ?? "alert",
    },
    info: {
      accent: theme.colors.primary,
      bg: theme.colors.primaryContainer,
      text: theme.colors.onPrimaryContainer,
      icon: icon ?? "information",
    },
  }[variant];

  useEffect(() => {
    if (!visible) return;

    Animated.spring(translateY, {
      toValue: insets.top + tokens.spacing.md,
      useNativeDriver: true,
      tension: 40,
      friction: 8,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(hide, duration);
    return () => clearTimeout(timer);
  }, [visible, insets.top]);

  const hide = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  if (!visible) return null;

  return (
    <Portal>
      <View
        pointerEvents="box-none"
        style={[styles.container, { paddingHorizontal: tokens.spacing.lg }]}
      >
        <Animated.View
          style={{
            opacity,
            transform: [{ translateY }],
            alignItems: "center",
            width: "100%",
          }}
        >
          <Surface
            elevation={2}
            style={[
              styles.content,
              {
                borderRadius: tokens.radii.lg,
                backgroundColor: variantConfig.bg,
                borderWidth: 1,
                borderColor: theme.colors.outlineVariant,
              },
            ]}
          >
            <View
              style={{
                flex: 1,
                borderRadius: tokens.radii.lg,
                overflow: "hidden",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Bookmark Accent Bar */}
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 6,
                  backgroundColor: variantConfig.accent,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 14, // Space for bookmark + gap
                  paddingRight: 16,
                  paddingVertical: 12,
                  gap: tokens.spacing.sm,
                  width: "100%",
                }}
              >
                <Icon
                  source={variantConfig.icon}
                  size={22}
                  color={variantConfig.accent}
                />

                <Text
                  variant="bodyMedium"
                  style={{
                    flex: 1,
                    color: variantConfig.text,
                    fontFamily: tokens.typography.families.medium,
                    fontWeight: "500",
                  }}
                >
                  {message}
                </Text>

                {actionLabel && (
                  <TouchableOpacity
                    onPress={() => {
                      onAction?.();
                      hide();
                    }}
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}
                  >
                    <Text
                      variant="labelLarge"
                      style={{
                        color: variantConfig.accent,
                        fontFamily: tokens.typography.families.bold,
                        fontWeight: "700",
                      }}
                    >
                      {actionLabel.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Surface>
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 9999,
  },
  content: {
    maxWidth: 600,
    width: "100%",
    minHeight: 56,
    justifyContent: "center",
  },
});
