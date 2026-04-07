import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button, TextInput, useTheme, Divider } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  onSave: (data: { name: string; icon: string; color: string }) => void;
  onClose: () => void;
};

const COLORS = [
  "#FF9F43", "#00CFE8", "#7367F0", "#28C76F", "#EA5455", 
  "#4B4B4B", "#FF6B6B", "#10AC84", "#54A0FF", "#5F27CD"
];

const ICONS = [
  "cart", "car", "silverware-fork-knife", "gamepad-variant", "lightning-bolt", 
  "heart", "briefcase", "airplane", "medical-bag", "school", 
  "home", "cellphone", "television", "cat", "dog", 
  "gift", "movie", "music", "camera", "basketball",
  "bicycle", "bus", "train", "water", "gas-station",
  "tools", "hammer", "scissors-cutting", "brush", "palette"
];

export function CategoryAddModal({ onSave, onClose }: Props) {
  const theme = useTheme();
  const tokens = useDesign();

  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), icon: selectedIcon, color: selectedColor });
  };

  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <View>
        <Text variant="headlineSmall" style={{ fontWeight: "800", color: theme.colors.onSurface }}>
          New Category
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, fontWeight: "500" }}>
          Create a personalized label for your transactions
        </Text>
      </View>

      <Divider style={{ backgroundColor: theme.colors.outlineVariant, opacity: 0.5 }} />

      <View style={{ gap: tokens.spacing.md }}>
        <TextInput
          label="Category Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          placeholder="e.g. Health, Gift, etc."
          style={{ backgroundColor: theme.colors.surface }}
          outlineStyle={{ borderRadius: tokens.radii.lg }}
        />

        <View style={{ gap: tokens.spacing.sm }}>
          <Text variant="labelLarge" style={{ fontWeight: "700", color: theme.colors.onSurfaceVariant }}>
            Select Color
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: color,
                  borderWidth: 2,
                  borderColor: selectedColor === color ? theme.colors.primary : "transparent",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {selectedColor === color && (
                  <MaterialCommunityIcons name="check" size={16} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ gap: tokens.spacing.sm }}>
          <Text variant="labelLarge" style={{ fontWeight: "700", color: theme.colors.onSurfaceVariant }}>
            Select Icon
          </Text>
          <View style={{ maxHeight: 180 }}>
            <ScrollView 
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ 
                flexDirection: "row", 
                flexWrap: "wrap", 
                gap: 10,
                paddingBottom: tokens.spacing.sm
              }}
            >
              {ICONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  onPress={() => setSelectedIcon(icon)}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    backgroundColor: selectedIcon === icon ? selectedColor + '20' : theme.colors.surfaceVariant + '40',
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: selectedIcon === icon ? selectedColor : "transparent"
                  }}
                >
                  <MaterialCommunityIcons 
                    name={icon as any} 
                    size={22} 
                    color={selectedIcon === icon ? selectedColor : theme.colors.onSurfaceVariant} 
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>

      <View style={{ marginTop: tokens.spacing.sm }}>
        <Button
          mode="contained"
          onPress={handleSave}
          disabled={!name.trim()}
          style={{ borderRadius: tokens.radii.lg, elevation: 0 }}
          contentStyle={{ height: 52 }}
          labelStyle={{ fontWeight: "700", fontSize: 16 }}
        >
          Create Category
        </Button>
      </View>
    </View>
  );
}
