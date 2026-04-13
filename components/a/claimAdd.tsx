import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, TextInput, Divider, SegmentedButtons } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { Claimable } from "../../hooks/useClaim";

type Props = {
  onSubmit: (data: Omit<Claimable, "id">) => void;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onMarkReceived?: (id: string) => void;
  initialData?: Claimable;
};

export function ClaimAddModal({ onSubmit, onClose, onDelete, onMarkReceived, initialData }: Props) {
  const tokens = useDesign();

  const [title, setTitle] = useState(initialData?.title || "");
  const [amount, setAmount] = useState(initialData?.amount.toString() || "");
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<Claimable["type"]>(initialData?.type || "reimbursement");
  const [fromWhom, setFromWhom] = useState(initialData?.fromWhom || "");
  const [status, setStatus] = useState<Claimable["status"]>(initialData?.status || "pending");

  const handleSave = () => {
    const numericAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numericAmount) || numericAmount <= 0) return;
    
    onSubmit({
      title: title.trim(),
      amount: numericAmount,
      date,
      type,
      status,
      fromWhom: type === "friend" ? fromWhom.trim() : undefined,
    });
  };

  const isComplete = title.trim() && amount && parseFloat(amount) > 0;

  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flex: 1 }}>
          <Text variant="headlineSmall" style={{ fontWeight: "800" }}>
            {initialData ? "Edit Claim" : "New Claim"}
          </Text>
          <Text variant="bodySmall" style={{ opacity: 0.7, fontWeight: "500" }}>
            Track money you're expecting to receive
          </Text>
        </View>
        {initialData && initialData.status === "pending" && onMarkReceived && (
          <Button 
            mode="contained-tonal" 
            onPress={() => onMarkReceived(initialData.id)}
            style={{ borderRadius: tokens.radii.pill }}
            labelStyle={{ fontSize: 12 }}
          >
            Received
          </Button>
        )}
      </View>

      <Divider style={{ opacity: 0.5 }} />

      <View style={{ gap: tokens.spacing.md }}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          placeholder="e.g. Travel Claim, Lunch debt"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
        />

        <TextInput
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          mode="outlined"
          keyboardType="numeric"
          placeholder="0.00"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
          left={<TextInput.Icon icon="cash-plus" />}
        />

        <TextInput
          label="Date"
          value={date}
          onChangeText={setDate}
          mode="outlined"
          placeholder="YYYY-MM-DD"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
          left={<TextInput.Icon icon="calendar" />}
        />

        <View style={{ gap: tokens.spacing.sm }}>
          <Text variant="labelLarge" style={{ fontWeight: "700", opacity: 0.7, marginLeft: 4 }}>
            Type
          </Text>
          <SegmentedButtons
            value={type}
            onValueChange={v => setType(v as any)}
            buttons={[
              { value: "reimbursement", label: "Reimbursement", icon: "file-document-outline" },
              { value: "friend", label: "Friend", icon: "account-outline" },
              { value: "other", label: "Other", icon: "dots-horizontal" },
            ]}
          />
        </View>

        {type === "friend" && (
          <TextInput
            label="Who owes you?"
            value={fromWhom}
            onChangeText={setFromWhom}
            mode="outlined"
            placeholder="e.g. Ahmad, Sarah"
            outlineStyle={{ borderRadius: tokens.radii.lg }}
            left={<TextInput.Icon icon="account" />}
          />
        )}
      </View>

      <View style={{ marginTop: tokens.spacing.sm, gap: tokens.spacing.sm }}>
        <Button
          mode="contained"
          onPress={handleSave}
          disabled={!isComplete}
          style={{ borderRadius: tokens.radii.lg, elevation: 0 }}
          contentStyle={{ height: 52 }}
          labelStyle={{ fontWeight: "700", fontSize: 16 }}
        >
          {initialData ? "Update Claim" : "Save Claim"}
        </Button>

        {initialData && onDelete && (
          <Button
            mode="text"
            onPress={() => onDelete(initialData.id)}
            textColor="#B00020"
            style={{ borderRadius: tokens.radii.lg }}
            contentStyle={{ height: 48 }}
          >
            Delete Claim
          </Button>
        )}
      </View>
    </View>
  );
}
