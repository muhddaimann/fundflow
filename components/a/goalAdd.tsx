import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, TextInput, Divider } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

type Props = {
  onSubmit: (data: { title: string; target: number; current: number; deadline: string }) => void;
  onClose: () => void;
  initialData?: { title: string; target: number; current: number; deadline: string };
};

export function GoalAddModal({ onSubmit, onClose, initialData }: Props) {
  const tokens = useDesign();

  const [title, setTitle] = useState(initialData?.title || "");
  const [target, setTarget] = useState(initialData?.target.toString() || "");
  const [current, setCurrent] = useState(initialData?.current.toString() || "0");
  const [deadline, setDeadline] = useState(initialData?.deadline || new Date(Date.now() + 86400000 * 365).toISOString().split('T')[0]);

  const handleSave = () => {
    const numericTarget = parseFloat(target);
    const numericCurrent = parseFloat(current) || 0;
    if (!title.trim() || isNaN(numericTarget) || numericTarget <= 0) return;
    
    onSubmit({
      title: title.trim(),
      target: numericTarget,
      current: numericCurrent,
      deadline,
    });
  };

  const isComplete = title.trim() && target && parseFloat(target) > 0;

  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <View>
        <Text variant="headlineSmall" style={{ fontWeight: "800" }}>
          {initialData ? "Edit Milestone" : "New Financial Goal"}
        </Text>
        <Text variant="bodySmall" style={{ opacity: 0.7, fontWeight: "500" }}>
          Set a target for your big life events and track your progress
        </Text>
      </View>

      <Divider style={{ opacity: 0.5 }} />

      <View style={{ gap: tokens.spacing.md }}>
        <TextInput
          label="Goal Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          placeholder="e.g. House Downpayment, Car"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
        />

        <TextInput
          label="Target Amount"
          value={target}
          onChangeText={setTarget}
          mode="outlined"
          keyboardType="numeric"
          placeholder="0.00"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
          left={<TextInput.Icon icon="flag-checkered" />}
        />

        <TextInput
          label="Current Savings"
          value={current}
          onChangeText={setCurrent}
          mode="outlined"
          keyboardType="numeric"
          placeholder="0.00"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
          left={<TextInput.Icon icon="piggy-bank-outline" />}
        />

        <TextInput
          label="Target Deadline"
          value={deadline}
          onChangeText={setDeadline}
          mode="outlined"
          placeholder="YYYY-MM-DD"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
          left={<TextInput.Icon icon="calendar-clock" />}
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
          {initialData ? "Update Goal" : "Create Goal"}
        </Button>
      </View>
    </View>
  );
}
