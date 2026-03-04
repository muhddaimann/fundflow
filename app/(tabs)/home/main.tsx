import React, { useEffect } from "react";
import { View } from "react-native";
import { Text, TextInput, Button, Card, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { useDesign } from "../../../contexts/designContext";
import { KeyboardLayout } from "../../../components/keyboardLayout";
import { useTabs } from "../../../contexts/tabContext";
import Header from "../../../components/header";

export default function Main() {
  const theme = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();

  useEffect(() => {
    setHideTabBar(true);
    return () => setHideTabBar(false);
  }, []);

  return (
    <KeyboardLayout
      scrollable
      gap={tokens.spacing.md}
      scrollViewProps={{
        scrollEventThrottle: 16,
        contentContainerStyle: {
          flexGrow: 1,
          paddingHorizontal: tokens.spacing.xl,
          paddingBottom: tokens.spacing["3xl"],
        },
      }}
    >
      <Header title="Main Content Form" subtitle="Fill Form" showBack />

      <Card
        mode="elevated"
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: tokens.radii.xl,
        }}
        contentStyle={{
          padding: tokens.spacing.xl,
          gap: tokens.spacing.lg,
        }}
      >
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Please fill in all the details below. This is a demo of a very long
          form.
        </Text>

        <View style={{ gap: tokens.spacing.md }}>
          {[
            "First Name",
            "Last Name",
            "Email Address",
            "Phone Number",
            "Address Line 1",
            "Address Line 2",
            "City",
            "State",
            "Zip Code",
            "Country",
            "Company",
            "Job Title",
            "Department",
          ].map((field, index) => (
            <TextInput key={index} label={field} mode="outlined" />
          ))}
        </View>

        <Button
          mode="contained"
          onPress={() => router.back()}
          style={{
            borderRadius: tokens.radii.lg,
            marginTop: tokens.spacing.sm,
          }}
          contentStyle={{ paddingVertical: tokens.spacing.sm }}
        >
          Submit Form
        </Button>
      </Card>
    </KeyboardLayout>
  );
}
