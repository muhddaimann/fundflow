import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Pressable,
} from "react-native";
import { useTheme, Text, Card } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import SectionHeader from "../../../components/secHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScrollTop from "../../../components/scrollTop";
import EndScreen from "../../../components/endScreen";
import Header from "../../../components/header";
import { OverlayModal } from "../../../components/modal";
import { ToolModal } from "../../../components/a/toolModal";

type ToolType = "loan" | "savings" | "compound";

export default function FinancialTools() {
  const { colors } = useTheme();
  const tokens = useDesign();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ToolType>("loan");

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const openTool = (type: ToolType) => {
    setSelectedTool(type);
    setModalVisible(true);
  };

  const tools: { type: ToolType; title: string; sub: string; icon: any; color: string }[] = [
    {
      type: "loan",
      title: "Loan Estimator",
      sub: "Calculate monthly repayments and total interest for personal or housing loans.",
      icon: "calculator",
      color: colors.primary,
    },
    {
      type: "savings",
      title: "Savings Plan",
      sub: "Project how much your savings will grow with regular monthly contributions.",
      icon: "piggy-bank-outline",
      color: colors.secondary,
    },
    {
      type: "compound",
      title: "Compound Growth",
      sub: "Visualize the power of compound interest with lump sum and monthly additions.",
      icon: "chart-timeline-variant",
      color: colors.tertiary,
    },
  ];

  return (
    <>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingBottom: tokens.spacing["3xl"],
          gap: tokens.spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Financial Tools" subtitle="Calculators & Planning" />

        <View style={{ gap: tokens.spacing.md }}>
          <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
            {tools.map((tool) => (
              <Pressable 
                key={tool.type} 
                onPress={() => openTool(tool.type)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }]
                })}
              >
                <Card 
                  style={{ backgroundColor: colors.surface, borderRadius: tokens.radii.xl }} 
                  mode="outlined"
                >
                  <Card.Content style={{ 
                    flexDirection: "row", 
                    alignItems: "center", 
                    gap: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.lg 
                  }}>
                    <View style={{ 
                      backgroundColor: tool.color + '15', 
                      padding: tokens.spacing.md, 
                      borderRadius: tokens.radii.lg 
                    }}>
                      <MaterialCommunityIcons name={tool.icon} size={32} color={tool.color} />
                    </View>
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text variant="titleMedium" style={{ fontWeight: "800" }}>{tool.title}</Text>
                      <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant, lineHeight: 16 }}>
                        {tool.sub}
                      </Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={colors.onSurfaceVariant} />
                  </Card.Content>
                </Card>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: tokens.spacing.lg, marginTop: tokens.spacing.sm }}>
          <Card 
            style={{ 
              backgroundColor: colors.primaryContainer, 
              borderRadius: tokens.radii.xl,
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: colors.primary
            }} 
            mode="flat"
          >
            <Card.Content style={{ alignItems: "center", gap: tokens.spacing.xs, paddingVertical: tokens.spacing.xl }}>
              <MaterialCommunityIcons name="lightbulb-on-outline" size={28} color={colors.onPrimaryContainer} />
              <Text variant="titleSmall" style={{ color: colors.onPrimaryContainer, fontWeight: "bold", textAlign: "center" }}>
                Financial Tip
              </Text>
              <Text variant="bodySmall" style={{ color: colors.onPrimaryContainer, textAlign: "center", opacity: 0.8 }}>
                The best time to start saving was yesterday. The second best time is today. Use these tools to map your journey!
              </Text>
            </Card.Content>
          </Card>
        </View>

        <EndScreen />
      </ScrollView>

      <OverlayModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        content={
          <ToolModal 
            initialType={selectedTool} 
            onClose={() => setModalVisible(false)} 
          />
        }
      />

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
