import React from "react";
import { View } from "react-native";
import { Text, Button, Divider, useTheme, List } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { Category } from "../../hooks/useCategory";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  category: Category;
  onDelete?: (id: string) => void;
  onEdit?: (category: Category) => void;
  onClose: () => void;
};

export function CategoryModal({ category, onDelete, onEdit, onClose }: Props) {
  const theme = useTheme();
  const tokens = useDesign();

  return (
    <View style={{ gap: tokens.spacing.sm }}>
      {/* Header Section */}
      <View style={{ gap: tokens.spacing.md }}>
        <View style={{ 
          width: 56, 
          height: 56, 
          borderRadius: 28, 
          backgroundColor: category.color + '12',
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: category.color + '20'
        }}>
          <MaterialCommunityIcons name={category.icon as any} size={28} color={category.color} />
        </View>
        
        <View>
          <Text variant="headlineSmall" style={{ fontWeight: "800", color: theme.colors.onSurface }}>
            {category.name}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, fontWeight: "500", marginTop: 2 }}>
            {category.isDefault ? "Standard system category" : "Personalized custom category"}
          </Text>
        </View>
      </View>

      <Divider style={{ backgroundColor: theme.colors.outlineVariant, opacity: 0.5 }} />

      {/* Details Section */}
      <View style={{ gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: tokens.spacing.sm }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: tokens.spacing.sm }}>
            <MaterialCommunityIcons name="tag-outline" size={20} color={theme.colors.onSurfaceVariant} />
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Type</Text>
          </View>
          <View style={{ 
            paddingHorizontal: 8, 
            paddingVertical: 2, 
            borderRadius: 4, 
            backgroundColor: category.isDefault ? theme.colors.surfaceVariant : category.color + '15'
          }}>
            <Text variant="labelSmall" style={{ 
              color: category.isDefault ? theme.colors.onSurfaceVariant : category.color,
              fontWeight: "700"
            }}>
              {category.isDefault ? "SYSTEM" : "CUSTOM"}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: tokens.spacing.sm }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: tokens.spacing.sm }}>
            <MaterialCommunityIcons name="palette-outline" size={20} color={theme.colors.onSurfaceVariant} />
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Theme Color</Text>
          </View>
          <Text variant="bodyMedium" style={{ fontWeight: "600", color: theme.colors.onSurface }}>{category.color.toUpperCase()}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{ gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
        <Button
          mode="contained"
          onPress={() => onEdit?.(category)}
          disabled={category.isDefault}
          style={{ borderRadius: tokens.radii.lg, elevation: 0 }}
          contentStyle={{ height: 52 }}
          labelStyle={{ fontWeight: "700", fontSize: 16 }}
        >
          {category.isDefault ? "Protected Category" : "Edit Settings"}
        </Button>

        {!category.isDefault && (
          <Button
            mode="outlined"
            onPress={() => onDelete?.(category.id)}
            style={{ borderRadius: tokens.radii.lg, borderColor: theme.colors.error + '40' }}
            textColor={theme.colors.error}
            contentStyle={{ height: 52 }}
            labelStyle={{ fontWeight: "600" }}
            icon="trash-can-outline"
          >
            Remove Category
          </Button>
        )}
      </View>
    </View>
  );
}
