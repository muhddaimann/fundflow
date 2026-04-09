import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, TextInput, Divider, SegmentedButtons } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

type Props = {
  onSubmit: (data: { name: string; amount: number; dueDate: string; status: "paid" | "pending" | "overdue" }) => void;
  onClose: () => void;
  initialData?: { name: string; amount: number; dueDate: string; status: "paid" | "pending" | "overdue" };
};

export function BillAddModal({ onSubmit, onClose, initialData }: Props) {
  const tokens = useDesign();

  const [name, setName] = useState(initialData?.name || "");
  const [amount, setAmount] = useState(initialData?.amount.toString() || "");
  const [date, setDate] = useState(initialData?.dueDate || new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<"paid" | "pending" | "overdue">(initialData?.status || "pending");

  const handleSave = () => {
    const numericAmount = parseFloat(amount);
    if (!name.trim() || isNaN(numericAmount) || numericAmount <= 0) return;
    
    onSubmit({
      name: name.trim(),
      amount: numericAmount,
      dueDate: date,
      status,
    });
  };

  const isComplete = name.trim() && amount && parseFloat(amount) > 0;

  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <View>
        <Text variant="headlineSmall" style={{ fontWeight: "800" }}>
          {initialData ? "Edit Bill" : "New Bill"}
        </Text>
        <Text variant="bodySmall" style={{ opacity: 0.7, fontWeight: "500" }}>
          Stay on top of your upcoming payments and avoid late fees
        </Text>
      </View>

      <Divider style={{ opacity: 0.5 }} />

      <View style={{ gap: tokens.spacing.md }}>
        <TextInput
          label="Bill Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          placeholder="e.g. Rent, Electricity, Water"
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
        </View>

        <TextInput
          label="Due Date"
          value={date}
          onChangeText={setDate}
          mode="outlined"
          placeholder="YYYY-MM-DD"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
          left={<TextInput.Icon icon="calendar" />}
        />

        <View style={{ gap: tokens.spacing.sm }}>
          <Text variant="labelLarge" style={{ fontWeight: "700", opacity: 0.7, marginLeft: 4 }}>
            Payment Status
          </Text>
          <SegmentedButtons
            value={status}
            onValueChange={v => setStatus(v as any)}
            buttons={[
              { value: "pending", label: "Pending" },
              { value: "paid", label: "Paid" },
              { value: "overdue", label: "Overdue" },
            ]}
          />
        </View>
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
          {initialData ? "Update Bill" : "Save Bill"}
        </Button>
      </View>
    </View>
  );
}
