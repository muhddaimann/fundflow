import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useDesign } from "../contexts/designContext";

export default function EndScreen() {
  const { colors } = useTheme();
  const tokens = useDesign();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingTop: tokens.spacing["2xl"],
      }}
    >
      <View
        style={{
          width: "40%",
          height: 2,
          borderRadius: tokens.radii.full,
          backgroundColor: colors.outlineVariant,
          opacity: tokens.opacity.disabled,
        }}
      />
    </View>
  );
}
