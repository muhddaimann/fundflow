import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, TextInput, Divider, Chip } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

type Props = {
  onSubmit: (data: { name: string; members: string[] }) => void;
  onClose: () => void;
};

export function GroupAddModal({ onSubmit, onClose }: Props) {
  const tokens = useDesign();
  const [name, setName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState<string[]>(["You"]);

  const addMember = () => {
    if (!memberInput.trim() || members.includes(memberInput.trim())) return;
    setMembers([...members, memberInput.trim()]);
    setMemberInput("");
  };

  const removeMember = (m: string) => {
    if (m === "You") return;
    setMembers(members.filter(item => item !== m));
  };

  const handleSave = () => {
    if (!name.trim() || members.length < 2) return;
    onSubmit({ name: name.trim(), members });
  };

  return (
    <View style={{ gap: tokens.spacing.sm }}>
      <View>
        <Text variant="headlineSmall" style={{ fontWeight: "800" }}>
          Create New Team
        </Text>
        <Text variant="bodySmall" style={{ opacity: 0.7, fontWeight: "500" }}>
          Group people together for shared expenses
        </Text>
      </View>

      <Divider style={{ opacity: 0.5 }} />

      <View style={{ gap: tokens.spacing.md }}>
        <TextInput
          label="Group Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          placeholder="e.g. Trip to Japan, Housemates"
          outlineStyle={{ borderRadius: tokens.radii.lg }}
        />

        <View style={{ gap: tokens.spacing.sm }}>
          <Text variant="labelLarge" style={{ fontWeight: "700", opacity: 0.7, marginLeft: 4 }}>
            Add Members
          </Text>
          <View style={{ flexDirection: "row", gap: tokens.spacing.sm }}>
            <TextInput
              value={memberInput}
              onChangeText={setMemberInput}
              mode="outlined"
              placeholder="Name"
              style={{ flex: 1 }}
              outlineStyle={{ borderRadius: tokens.radii.lg }}
              onSubmitEditing={addMember}
            />
            <Button 
              mode="contained-tonal" 
              onPress={addMember}
              style={{ justifyContent: "center", borderRadius: tokens.radii.lg }}
            >
              Add
            </Button>
          </View>
          
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
            {members.map((m) => (
              <Chip 
                key={m} 
                onClose={m !== "You" ? () => removeMember(m) : undefined}
                style={{ borderRadius: tokens.radii.pill }}
              >
                {m}
              </Chip>
            ))}
          </View>
        </View>
      </View>

      <View style={{ marginTop: tokens.spacing.sm }}>
        <Button
          mode="contained"
          onPress={handleSave}
          disabled={!name.trim() || members.length < 2}
          style={{ borderRadius: tokens.radii.lg, elevation: 0 }}
          contentStyle={{ height: 52 }}
          labelStyle={{ fontWeight: "700", fontSize: 16 }}
        >
          Create Group
        </Button>
      </View>
    </View>
  );
}
