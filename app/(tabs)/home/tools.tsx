import React, { useRef } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from "react-native";
import { useTheme, Text, Card, TextInput, Divider } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import SectionHeader from "../../../components/secHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScrollTop from "../../../components/scrollTop";
import EndScreen from "../../../components/endScreen";
import Header from "../../../components/header";
import useTools from "../../../hooks/useTools";

export default function FinancialTools() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { loan, savings } = useTools();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingBottom: tokens.spacing["3xl"],
          gap: tokens.spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Financial Tools" subtitle="Calculators & Planning" />

        {/* Loan Calculator */}
        <View style={{ gap: tokens.spacing.md }}>
          <SectionHeader
            icon={<MaterialCommunityIcons name="calculator" size={24} color={colors.primary} />}
            head="Loan Calculator"
            subHeader="Estimate your monthly repayments"
          />
          
          <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
            <Card style={{ backgroundColor: colors.surface }} mode="contained">
              <Card.Content style={{ gap: tokens.spacing.md }}>
                <TextInput
                  label="Loan Amount (RM)"
                  value={loan.amount}
                  onChangeText={loan.setAmount}
                  keyboardType="numeric"
                  mode="outlined"
                  outlineStyle={{ borderRadius: tokens.radii.lg }}
                />
                <TextInput
                  label="Interest Rate (%)"
                  value={loan.rate}
                  onChangeText={loan.setRate}
                  keyboardType="numeric"
                  mode="outlined"
                  outlineStyle={{ borderRadius: tokens.radii.lg }}
                />
                <TextInput
                  label="Loan Term (Years)"
                  value={loan.term}
                  onChangeText={loan.setTerm}
                  keyboardType="numeric"
                  mode="outlined"
                  outlineStyle={{ borderRadius: tokens.radii.lg }}
                />

                {loan.result && (
                  <View style={{ 
                    marginTop: tokens.spacing.md, 
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
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Savings Calculator */}
        <View style={{ gap: tokens.spacing.md }}>
          <SectionHeader
            icon={<MaterialCommunityIcons name="piggy-bank-outline" size={24} color={colors.primary} />}
            head="Savings Calculator"
            subHeader="Project your future wealth"
          />
          
          <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
            <Card style={{ backgroundColor: colors.surface }} mode="contained">
              <Card.Content style={{ gap: tokens.spacing.md }}>
                <TextInput
                  label="Monthly Deposit (RM)"
                  value={savings.deposit}
                  onChangeText={savings.setDeposit}
                  keyboardType="numeric"
                  mode="outlined"
                  outlineStyle={{ borderRadius: tokens.radii.lg }}
                />
                <TextInput
                  label="Annual Interest Rate (%)"
                  value={savings.rate}
                  onChangeText={savings.setRate}
                  keyboardType="numeric"
                  mode="outlined"
                  outlineStyle={{ borderRadius: tokens.radii.lg }}
                />
                <TextInput
                  label="Investment Period (Years)"
                  value={savings.years}
                  onChangeText={savings.setYears}
                  keyboardType="numeric"
                  mode="outlined"
                  outlineStyle={{ borderRadius: tokens.radii.lg }}
                />

                {savings.result && (
                  <View style={{ 
                    marginTop: tokens.spacing.md, 
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
              </Card.Content>
            </Card>
          </View>
        </View>

        <EndScreen />
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
