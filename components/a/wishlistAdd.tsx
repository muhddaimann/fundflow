import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, TextInput, Divider } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

type Props = {
  onSubmit: (data: { name: string; price: number; saved: number }) => void;
  onClose: () => void;
  initialData?: { name: string; price: number; saved: number };
};

export function WishlistAddModal({ onSubmit, onClose, initialData }: Props) {
  const tokens = useDesign();

  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price.toString() || "");
  const [saved, setSaved] = useState(initialData?.saved.toString() || "0");

  const handleSave = () => {
    const numericPrice = parseFloat(price);
    const numericSaved = parseFloat(saved) || 0;
    if (!name.trim() || isNaN(numericPrice) || numericPrice <= 0) return;
    
    onSubmit({
      name: name.trim(),
      price: numericPrice,
      saved: numericSaved,
    });
  };

  const isComplete = name.trim() && price && parseFloat(price) > 0;

  return (
    <View style={{ gap: tokens.spacing.sm }}>
      <View>
        <Text variant="headlineSmall" style={{ fontWeight: "800" }}>
          {initialData ? "Edit Goal" : "New Wishlist Item"}
        </Text>
        <Text variant="bodySmall" style={{ opacity: 0.7, fontWeight: "500" }}>
          Define what you're saving for and set your target
        </Text>
      </View>

      <Divider style={{ opacity: 0.5 }} />

      <View style={{ gap: tokens.spacing.md }}>
        <TextInput
          label="Item Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          placeholder="e.g. New Camera, Vacation"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
        />

        <TextInput
          label="Target Price"
          value={price}
          onChangeText={setPrice}
          mode="outlined"
          keyboardType="numeric"
          placeholder="0.00"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
          left={<TextInput.Icon icon="tag-outline" />}
        />

        <TextInput
          label="Already Saved (optional)"
          value={saved}
          onChangeText={setSaved}
          mode="outlined"
          keyboardType="numeric"
          placeholder="0.00"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
          left={<TextInput.Icon icon="cash-check" />}
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
          {initialData ? "Update Item" : "Add to Wishlist"}
        </Button>
      </View>
    </View>
  );
}
