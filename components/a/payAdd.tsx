import React, { useState } from "react";
import { View } from "react-native";
import {
  Text,
  Button,
  TextInput,
  Divider,
  SegmentedButtons,
} from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { Payable } from "../../hooks/usePay";

type Props = {
  onSubmit: (data: Omit<Payable, "id">) => void;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onMarkPaid?: (id: string) => void;
  initialData?: Payable;
};

export function PayAddModal({
  onSubmit,
  onClose,
  onDelete,
  onMarkPaid,
  initialData,
}: Props) {
  const tokens = useDesign();

  const [title, setTitle] = useState(initialData?.title || "");
  const [amount, setAmount] = useState(initialData?.amount.toString() || "");
  const [date, setDate] = useState(
    initialData?.dueDate || new Date().toISOString().split("T")[0],
  );
  const [type, setType] = useState<Payable["type"]>(
    initialData?.type || "bill",
  );
  const [toWhom, setToWhom] = useState(initialData?.toWhom || "");
  const [status, setStatus] = useState<Payable["status"]>(
    initialData?.status || "pending",
  );

  const handleSave = () => {
    const numericAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numericAmount) || numericAmount <= 0) return;

    onSubmit({
      title: title.trim(),
      amount: numericAmount,
      dueDate: date,
      type,
      status,
      toWhom: type === "friend" || type === "debt" ? toWhom.trim() : undefined,
    });
  };

  const isComplete = title.trim() && amount && parseFloat(amount) > 0;

  return (
    <View style={{ gap: tokens.spacing.sm }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text variant="headlineSmall" style={{ fontWeight: "800" }}>
            {initialData ? "Edit Payment" : "New Payment"}
          </Text>
          <Text variant="bodySmall" style={{ opacity: 0.7, fontWeight: "500" }}>
            Track what you owe to stay on top of your finances
          </Text>
        </View>
        {initialData && initialData.status === "pending" && onMarkPaid && (
          <Button
            mode="contained-tonal"
            onPress={() => onMarkPaid(initialData.id)}
            style={{ borderRadius: tokens.radii.pill }}
            labelStyle={{ fontSize: 12 }}
          >
            Mark Paid
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
          placeholder="e.g. Credit Card, Lunch debt"
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
          left={<TextInput.Icon icon="cash" />}
        />

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
          <Text
            variant="labelLarge"
            style={{ fontWeight: "700", opacity: 0.7, marginLeft: 4 }}
          >
            Type
          </Text>
          <SegmentedButtons
            value={type}
            onValueChange={(v) => setType(v as any)}
            buttons={[
              { value: "bill", label: "Bill", icon: "file-document-outline" },
              { value: "friend", label: "Friend", icon: "account-outline" },
              { value: "debt", label: "Debt", icon: "bank-outline" },
              { value: "other", label: "Other", icon: "dots-horizontal" },
            ]}
          />
        </View>

        {(type === "friend" || type === "debt") && (
          <TextInput
            label={type === "friend" ? "Who do you owe?" : "To Whom?"}
            value={toWhom}
            onChangeText={setToWhom}
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
          {initialData ? "Update Payment" : "Save Payment"}
        </Button>

        {initialData && onDelete && (
          <Button
            mode="text"
            onPress={() => onDelete(initialData.id)}
            textColor="#B00020"
            style={{ borderRadius: tokens.radii.lg }}
            contentStyle={{ height: 48 }}
          >
            Delete Payment
          </Button>
        )}
      </View>
    </View>
  );
}
