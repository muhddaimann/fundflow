import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button, TextInput, Divider, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useCategory from "../../hooks/useCategory";

type Props = {
  onSubmit: (data: { categoryName: string; limit: number }) => void;
  onClose: () => void;
  initialData?: { categoryName: string; limit: number };
};

export function BudgetAddModal({ onSubmit, onClose, initialData }: Props) {
  const theme = useTheme();
  const tokens = useDesign();
  const { categories } = useCategory();

  const [selectedCategory, setSelectedCategory] = useState(
    initialData?.categoryName || categories[0]?.name || ""
  );
  const [limit, setLimit] = useState(initialData?.limit.toString() || "");

  const handleSave = () => {
    const numericLimit = parseFloat(limit);
    if (!selectedCategory || isNaN(numericLimit) || numericLimit <= 0) return;
    
    onSubmit({
      categoryName: selectedCategory,
      limit: numericLimit,
    });
  };

  const isComplete = selectedCategory && limit && parseFloat(limit) > 0;

  return (
    <View style={{ gap: tokens.spacing.sm }}>
      <View>
        <Text variant="headlineSmall" style={{ fontWeight: "800", color: theme.colors.onSurface }}>
          {initialData ? "Edit Budget" : "Set Budget"}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, fontWeight: "500" }}>
          Define a monthly spending limit for a category
        </Text>
      </View>

      <Divider style={{ backgroundColor: theme.colors.outlineVariant, opacity: 0.5 }} />

      <View style={{ gap: tokens.spacing.md }}>
        <View style={{ gap: tokens.spacing.sm }}>
          <Text variant="labelLarge" style={{ fontWeight: "700", color: theme.colors.onSurfaceVariant, marginLeft: 4 }}>
            Select Category
          </Text>
          <View style={{ maxHeight: 160 }}>
            <ScrollView 
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ 
                flexDirection: "row", 
                flexWrap: "wrap", 
                gap: 8,
                paddingBottom: tokens.spacing.xs
              }}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.name)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: tokens.radii.pill,
                    backgroundColor: selectedCategory === cat.name ? cat.color + '15' : theme.colors.surfaceVariant + '40',
                    borderWidth: 1,
                    borderColor: selectedCategory === cat.name ? cat.color : "transparent",
                    gap: 6
                  }}
                >
                  <MaterialCommunityIcons 
                    name={cat.icon as any} 
                    size={18} 
                    color={selectedCategory === cat.name ? cat.color : theme.colors.onSurfaceVariant} 
                  />
                  <Text variant="labelMedium" style={{ 
                    color: selectedCategory === cat.name ? cat.color : theme.colors.onSurface,
                    fontWeight: selectedCategory === cat.name ? "700" : "500"
                  }}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <TextInput
          label="Monthly Limit (RM)"
          value={limit}
          onChangeText={setLimit}
          mode="outlined"
          keyboardType="numeric"
          placeholder="0.00"
          style={{ backgroundColor: theme.colors.surface }}
          outlineStyle={{ borderRadius: tokens.radii.lg }}
          left={<TextInput.Icon icon="chart-donut" />}
        />
      </View>

      <View style={{ marginTop: tokens.spacing.sm }}>
        <Button
          mode="contained"
          onPress={handleSave}
          disabled={!isComplete}
          style={{ borderRadius: tokens.radii.lg, elevation: 0 }}
          contentStyle={{ height: 52 }}
          labelStyle={{ fontWeight: "700", fontSize: 16 }}
        >
          {initialData ? "Update Budget" : "Create Budget"}
        </Button>
      </View>
    </View>
  );
}
