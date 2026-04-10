import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, TextInput, Divider, SegmentedButtons, useTheme, Button } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import useTools from "../../hooks/useTools";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ToolType = "loan" | "savings" | "compound";

type Props = {
  initialType?: ToolType;
  onClose: () => void;
};

export function ToolModal({ initialType = "loan", onClose }: Props) {
  const tokens = useDesign();
  const { colors } = useTheme();
  const { loan, savings, compound, formatCurrency } = useTools();
  const [activeTab, setActiveTab] = useState<ToolType>(initialType);

  useEffect(() => {
    setActiveTab(initialType);
  }, [initialType]);

  const renderLoan = () => (
    <View style={{ gap: tokens.spacing.md }}>
      <TextInput
        label="Loan Amount (RM)"
        value={loan.amount}
        onChangeText={loan.setAmount}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={{ borderRadius: tokens.radii.lg }}
        left={<TextInput.Icon icon="cash" />}
      />
      <TextInput
        label="Interest Rate (%)"
        value={loan.rate}
        onChangeText={loan.setRate}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={{ borderRadius: tokens.radii.lg }}
        left={<TextInput.Icon icon="percent" />}
      />
      <TextInput
        label="Loan Term (Years)"
        value={loan.term}
        onChangeText={loan.setTerm}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={{ borderRadius: tokens.radii.lg }}
        left={<TextInput.Icon icon="calendar-clock" />}
      />

      {loan.result && (
        <View style={{ 
          marginTop: tokens.spacing.sm, 
          backgroundColor: colors.primaryContainer, 
          padding: tokens.spacing.md,
          borderRadius: tokens.radii.lg,
          gap: tokens.spacing.sm
        }}>
          <View style={{ alignItems: "center", marginBottom: tokens.spacing.xs }}>
            <Text variant="labelMedium" style={{ color: colors.onPrimaryContainer, opacity: 0.7 }}>MONTHLY PAYMENT</Text>
            <Text variant="headlineMedium" style={{ color: colors.onPrimaryContainer, fontWeight: "bold" }}>{loan.result.monthly}</Text>
          </View>
          <Divider style={{ backgroundColor: colors.onPrimaryContainer, opacity: 0.1 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text variant="bodySmall" style={{ color: colors.onPrimaryContainer }}>Total Repayment</Text>
            <Text variant="bodySmall" style={{ color: colors.onPrimaryContainer, fontWeight: "700" }}>{loan.result.total}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text variant="bodySmall" style={{ color: colors.onPrimaryContainer }}>Total Interest</Text>
            <Text variant="bodySmall" style={{ color: colors.onPrimaryContainer, fontWeight: "700" }}>{loan.result.interest}</Text>
          </View>
        </View>
      )}
    </View>
  );

  const renderSavings = () => (
    <View style={{ gap: tokens.spacing.md }}>
      <TextInput
        label="Monthly Deposit (RM)"
        value={savings.deposit}
        onChangeText={savings.setDeposit}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={{ borderRadius: tokens.radii.lg }}
        left={<TextInput.Icon icon="piggy-bank" />}
      />
      <TextInput
        label="Annual Interest Rate (%)"
        value={savings.rate}
        onChangeText={savings.setRate}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={{ borderRadius: tokens.radii.lg }}
        left={<TextInput.Icon icon="trending-up" />}
      />
      <TextInput
        label="Investment Period (Years)"
        value={savings.years}
        onChangeText={savings.setYears}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={{ borderRadius: tokens.radii.lg }}
        left={<TextInput.Icon icon="calendar-range" />}
      />

      {savings.result && (
        <View style={{ 
          marginTop: tokens.spacing.sm, 
          backgroundColor: colors.secondaryContainer, 
          padding: tokens.spacing.md,
          borderRadius: tokens.radii.lg,
          gap: tokens.spacing.sm
        }}>
          <View style={{ alignItems: "center", marginBottom: tokens.spacing.xs }}>
            <Text variant="labelMedium" style={{ color: colors.onSecondaryContainer, opacity: 0.7 }}>ESTIMATED FUTURE VALUE</Text>
            <Text variant="headlineMedium" style={{ color: colors.onSecondaryContainer, fontWeight: "bold" }}>{savings.result.futureValue}</Text>
          </View>
          <Divider style={{ backgroundColor: colors.onSecondaryContainer, opacity: 0.1 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text variant="bodySmall" style={{ color: colors.onSecondaryContainer }}>Total Deposits</Text>
            <Text variant="bodySmall" style={{ color: colors.onSecondaryContainer, fontWeight: "700" }}>{savings.result.totalDeposits}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text variant="bodySmall" style={{ color: colors.onSecondaryContainer }}>Interest Earned</Text>
            <Text variant="bodySmall" style={{ color: colors.onSecondaryContainer, fontWeight: "700" }}>{savings.result.interest}</Text>
          </View>
        </View>
      )}
    </View>
  );

  const renderCompound = () => (
    <View style={{ gap: tokens.spacing.md }}>
      <TextInput
        label="Initial Lump Sum (RM)"
        value={compound.lumpSum}
        onChangeText={compound.setLumpSum}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={{ borderRadius: tokens.radii.lg }}
        left={<TextInput.Icon icon="bank-transfer-in" />}
      />
      <TextInput
        label="Monthly Contribution (RM)"
        value={compound.monthlyContribution}
        onChangeText={compound.setMonthlyContribution}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={{ borderRadius: tokens.radii.lg }}
        left={<TextInput.Icon icon="plus-circle-outline" />}
      />
      <TextInput
        label="Annual Return Rate (%)"
        value={compound.rate}
        onChangeText={compound.setRate}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={{ borderRadius: tokens.radii.lg }}
        left={<TextInput.Icon icon="chart-line" />}
      />
      <TextInput
        label="Duration (Years)"
        value={compound.years}
        onChangeText={compound.setYears}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={{ borderRadius: tokens.radii.lg }}
        left={<TextInput.Icon icon="timer-outline" />}
      />

      {compound.result && (
        <View style={{ 
          marginTop: tokens.spacing.sm, 
          backgroundColor: colors.tertiaryContainer, 
          padding: tokens.spacing.md,
          borderRadius: tokens.radii.lg,
          gap: tokens.spacing.sm
        }}>
          <View style={{ alignItems: "center", marginBottom: tokens.spacing.xs }}>
            <Text variant="labelMedium" style={{ color: colors.onTertiaryContainer, opacity: 0.7 }}>PROJECTED TOTAL</Text>
            <Text variant="headlineMedium" style={{ color: colors.onTertiaryContainer, fontWeight: "bold" }}>{compound.result.total}</Text>
          </View>
          <Divider style={{ backgroundColor: colors.onTertiaryContainer, opacity: 0.1 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text variant="bodySmall" style={{ color: colors.onTertiaryContainer }}>Total Contributions</Text>
            <Text variant="bodySmall" style={{ color: colors.onTertiaryContainer, fontWeight: "700" }}>{compound.result.contributions}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text variant="bodySmall" style={{ color: colors.onTertiaryContainer }}>Interest Earned</Text>
            <Text variant="bodySmall" style={{ color: colors.onTertiaryContainer, fontWeight: "700" }}>{compound.result.interest}</Text>
          </View>
        </View>
      )}
    </View>
  );

  const getHeaderInfo = () => {
    switch(activeTab) {
      case "loan": return { title: "Loan Estimator", sub: "Calculate your monthly debt obligation", icon: "calculator" };
      case "savings": return { title: "Savings Plan", sub: "Project your wealth with regular deposits", icon: "piggy-bank-outline" };
      case "compound": return { title: "Compound Interest", sub: "The power of time and consistent investing", icon: "chart-timeline-variant" };
    }
  };

  const header = getHeaderInfo();

  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: tokens.spacing.md }}>
        <View style={{ 
          backgroundColor: colors.primaryContainer, 
          padding: tokens.spacing.sm, 
          borderRadius: tokens.radii.md 
        }}>
          <MaterialCommunityIcons name={header.icon as any} size={28} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="headlineSmall" style={{ fontWeight: "800" }}>{header.title}</Text>
          <Text variant="bodySmall" style={{ opacity: 0.7, fontWeight: "500" }}>{header.sub}</Text>
        </View>
      </View>

      <SegmentedButtons
        value={activeTab}
        onValueChange={v => setActiveTab(v as ToolType)}
        buttons={[
          { value: "loan", label: "Loan", icon: "calculator" },
          { value: "savings", label: "Savings", icon: "piggy-bank" },
          { value: "compound", label: "Compound", icon: "chart-line" },
        ]}
        style={{ marginBottom: tokens.spacing.xs }}
      />

      <Divider style={{ opacity: 0.5 }} />

      {activeTab === "loan" && renderLoan()}
      {activeTab === "savings" && renderSavings()}
      {activeTab === "compound" && renderCompound()}

      <View style={{ marginTop: tokens.spacing.sm }}>
        <Button 
          mode="contained-tonal" 
          onPress={onClose}
          style={{ borderRadius: tokens.radii.lg }}
          contentStyle={{ height: 48 }}
        >
          Dismiss
        </Button>
      </View>
    </View>
  );
}
