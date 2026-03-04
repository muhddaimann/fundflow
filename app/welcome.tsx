import React, { useEffect } from "react";
import { View } from "react-native";
import { Text, useTheme, ActivityIndicator } from "react-native-paper";
import { router } from "expo-router";
import { useDesign } from "../contexts/designContext";
import { useAuth } from "../contexts/authContext";

export default function Welcome() {
  const theme = useTheme();
  const tokens = useDesign();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: tokens.spacing.xl,
        gap: tokens.spacing.lg,
      }}
    >
      <Text
        variant="headlineMedium"
        style={{ fontWeight: "700", textAlign: "center" }}
      >
        Welcome Back
      </Text>

      <Text
        variant="bodyMedium"
        style={{
          textAlign: "center",
          color: theme.colors.onSurfaceVariant,
        }}
      >
        Preparing your dashboard{user ? `, ${user}` : ""}...
      </Text>

      <ActivityIndicator size="small" color={theme.colors.primary} />
    </View>
  );
}
