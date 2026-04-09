import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button, TextInput, Divider, SegmentedButtons } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  onSubmit: (data: { name: string; amount: number; frequency: "monthly" | "yearly"; nextBilling: string }) => void;
  onClose: () => void;
  initialData?: { name: string; amount: number; frequency: "monthly" | "yearly"; nextBilling: string };
};

export function SubscriptionAddModal({ onSubmit, onClose, initialData }: Props) {
  const tokens = useDesign();

  const [name, setName] = useState(initialData?.name || "");
  const [amount, setAmount] = useState(initialData?.amount.toString() || "");
  const [frequency, setFrequency] = useState<"monthly" | "yearly">(initialData?.frequency || "monthly");
  const [date, setDate] = useState(initialData?.nextBilling || new Date().toISOString().split('T')[0]);

  const handleSave = () => {
    const numericAmount = parseFloat(amount);
    if (!name.trim() || isNaN(numericAmount) || numericAmount <= 0) return;
    
    onSubmit({
      name: name.trim(),
      amount: numericAmount,
      frequency,
      nextBilling: date,
    });
  };

  const isComplete = name.trim() && amount && parseFloat(amount) > 0;

  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <View>
        <Text variant="headlineSmall" style={{ fontWeight: "800" }}>
          {initialData ? "Edit Subscription" : "Add Subscription"}
        </Text>
        <Text variant="bodySmall" style={{ opacity: 0.7, fontWeight: "500" }}>
          Keep track of your recurring digital and physical costs
        </Text>
      </View>

      <Divider style={{ opacity: 0.5 }} />

      <View style={{ gap: tokens.spacing.md }}>
        <TextInput
          label="Subscription Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          placeholder="e.g. Netflix, Gym, iCloud"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
        />

        <View style={{ flexDirection: "row", gap: tokens.spacing.sm }}>
          <TextInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            mode="outlined"
            keyboardType="numeric"
            placeholder="0.00"
            style={{ flex: 1 }}
            outlineStyle={{ borderRadius: tokens.radii.lg }}
            left={<TextInput.Icon icon="cash" />}
          />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <SegmentedButtons
              value={frequency}
              onValueChange={v => setFrequency(v as any)}
              buttons={[
                { value: "monthly", label: "Mo" },
                { value: "yearly", label: "Yr" },
              ]}
              style={{ scaleX: 0.9, scaleY: 0.9 }}
            />
          </View>
        </View>

        <TextInput
          label="Next Billing Date"
          value={date}
          onChangeText={setDate}
          mode="outlined"
          placeholder="YYYY-MM-DD"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
          left={<TextInput.Icon icon="calendar" />}
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
          {initialData ? "Update Subscription" : "Save Subscription"}
        </Button>
      </View>
    </View>
  );
}
