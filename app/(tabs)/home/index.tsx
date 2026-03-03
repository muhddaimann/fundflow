import React, { useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { Button, Text, useTheme, Surface } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { router } from "expo-router";
import { useTab } from "../../../contexts/tabContext";

export default function HomeIndex() {
  const theme = useTheme();
  const tokens = useDesign();
  const { handleScroll, setScrollRef } = useTab();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setScrollRef(scrollViewRef.current);
    return () => setScrollRef(null);
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
        paddingBottom: tokens.spacing["3xl"],
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text
        variant="headlineMedium"
        style={{ color: theme.colors.onBackground, marginBottom: tokens.spacing.md }}
      >
        Home Overview
      </Text>

      <Surface
        elevation={1}
        style={{
          padding: tokens.spacing.lg,
          borderRadius: tokens.radii.lg,
          backgroundColor: theme.colors.surfaceVariant,
          gap: tokens.spacing.md,
          marginBottom: tokens.spacing.md,
        }}
      >
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Navigation Demo
        </Text>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant, opacity: 0.7 }}
        >
          Explore the long form with keyboard avoidance.
        </Text>
        
        <Button 
          mode="contained" 
          onPress={() => router.push('/(tabs)/home/main')}
          style={{ borderRadius: tokens.radii.md }}
        >
          Go to Long Form
        </Button>
      </Surface>

      {/* Added some dummy content to make it scrollable */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Surface
          key={i}
          elevation={1}
          style={{
            padding: tokens.spacing.lg,
            borderRadius: tokens.radii.lg,
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.outlineVariant,
            marginBottom: tokens.spacing.md,
          }}
        >
          <Text variant="titleSmall">Card {i + 1}</Text>
          <Text variant="bodySmall">Scroll down to hide navbar, up to show.</Text>
        </Surface>
      ))}

    </ScrollView>
  );
}
