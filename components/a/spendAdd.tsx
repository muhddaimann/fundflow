import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useCategory from "../../hooks/useCategory";

type Props = {
  onSubmit: (data: {
    amount: number;
    title: string;
    category: string;
    date: string;
    merchant?: string;
  }) => void;
  onClose: () => void;
};

export default function SpendModal({ onSubmit, onClose }: Props) {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { categories } = useCategory();

  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.name || "",
  );
  const [merchant, setMerchant] = useState("");

  const isComplete = amount && title && selectedCategory;

  const handleSubmit = () => {
    if (!isComplete) return;

    onSubmit({
      amount: Number(amount),
      title: title.trim(),
      category: selectedCategory,
      date: new Date().toISOString(),
      merchant: merchant.trim() || undefined,
    });

    onClose();
  };

  return (
    <View style={{ gap: tokens.spacing.sm }}>
      <View style={{ gap: 4 }}>
        <Text variant="headlineSmall" style={{ fontWeight: "800" }}>
          Add Spend
        </Text>
        <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
          Track your expense quickly
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.surfaceVariant,
          borderRadius: tokens.radii.lg,
          padding: tokens.spacing.md,
          alignItems: "center",
        }}
      >
        <Text variant="headlineMedium" style={{ fontWeight: "800" }}>
          {amount ? `RM ${Number(amount).toFixed(2)}` : "RM 0.00"}
        </Text>
      </View>

      <View style={{ gap: tokens.spacing.md }}>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          mode="outlined"
          placeholder="Amount"
          left={<TextInput.Icon icon="cash" />}
          outlineStyle={{ borderRadius: tokens.radii.lg }}
        />

        <TextInput
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          placeholder="What did you spend on?"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
        />

        <ScrollView
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat.name;

            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.name)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: tokens.radii.pill,
                  backgroundColor: active
                    ? cat.color + "20"
                    : colors.surfaceVariant,
                  borderWidth: 1,
                  borderColor: active ? cat.color : "transparent",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <MaterialCommunityIcons
                  name={cat.icon as any}
                  size={16}
                  color={active ? cat.color : colors.onSurfaceVariant}
                />
                <Text
                  variant="labelMedium"
                  style={{
                    color: active ? cat.color : colors.onSurface,
                    fontWeight: active ? "700" : "500",
                  }}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TextInput
          value={merchant}
          onChangeText={setMerchant}
          mode="outlined"
          placeholder="Merchant (optional)"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
        />
      </View>

      <View style={{ flexDirection: "row", gap: tokens.spacing.sm }}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!isComplete}
          style={{ flex: 1, borderRadius: tokens.radii.lg }}
          contentStyle={{ height: 48 }}
          labelStyle={{ fontWeight: "700" }}
        >
          Add
        </Button>

        <Button
          mode="text"
          onPress={onClose}
          style={{ justifyContent: "center" }}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
}
