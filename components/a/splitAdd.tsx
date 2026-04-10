import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button, TextInput, Divider } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  members: string[];
  onSubmit: (data: { title: string; amount: number; payer: string }) => void;
  onClose: () => void;
};

export function SplitAddModal({ members, onSubmit, onClose }: Props) {
  const tokens = useDesign();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState(members[0] || "You");

  const handleSave = () => {
    const numericAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numericAmount) || numericAmount <= 0) return;
    onSubmit({ title: title.trim(), amount: numericAmount, payer });
  };

  const isComplete = title.trim() && amount && parseFloat(amount) > 0;

  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <View>
        <Text variant="headlineSmall" style={{ fontWeight: "800" }}>
          Add Group Expense
        </Text>
        <Text variant="bodySmall" style={{ opacity: 0.7, fontWeight: "500" }}>
          Split an expense equally among all members
        </Text>
      </View>

      <Divider style={{ opacity: 0.5 }} />

      <View style={{ gap: tokens.spacing.md }}>
        <TextInput
          label="What was this for?"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          placeholder="e.g. Dinner, Taxi, Tickets"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
        />

        <TextInput
          label="Total Amount"
          value={amount}
          onChangeText={setAmount}
          mode="outlined"
          keyboardType="numeric"
          placeholder="0.00"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
          left={<TextInput.Icon icon="cash" />}
        />

        <View style={{ gap: tokens.spacing.sm }}>
          <Text variant="labelLarge" style={{ fontWeight: "700", opacity: 0.7, marginLeft: 4 }}>
            Paid By
          </Text>
          <View style={{ maxHeight: 120 }}>
            <ScrollView 
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ 
                flexDirection: "row", 
                flexWrap: "wrap", 
                gap: 8,
                paddingBottom: 4
              }}
            >
              {members.map((m) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setPayer(m)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: tokens.radii.pill,
                    backgroundColor: payer === m ? 'rgba(0,0,0,0.05)' : 'transparent',
                    borderWidth: 1,
                    borderColor: payer === m ? '#000' : 'rgba(0,0,0,0.1)',
                  }}
                >
                  <Text style={{ fontWeight: payer === m ? "700" : "400" }}>{m}</Text>
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
          disabled={!isComplete}
          style={{ borderRadius: tokens.radii.lg, elevation: 0 }}
          contentStyle={{ height: 52 }}
          labelStyle={{ fontWeight: "700", fontSize: 16 }}
        >
          Add Expense
        </Button>
      </View>
    </View>
  );
}
