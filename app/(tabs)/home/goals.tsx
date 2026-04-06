import React, { useRef, useState } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import { useTheme, Card, Text, ProgressBar } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useGoals from "../../../hooks/useGoals";

export default function Goals() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { goalsData, formatCurrency } = useGoals();
  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
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
          gap: tokens.spacing.lg,
        }}
      >
        <Header title="Goals" subtitle="Financial milestones" />
        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
          {goalsData.map((goal, i) => (
            <Card key={i} style={{ backgroundColor: colors.surface }} mode="contained">
              <Card.Content style={{ gap: tokens.spacing.xs }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text variant="titleSmall">{goal.title}</Text>
                  <Text variant="bodySmall">
                    {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                  </Text>
                </View>
                <ProgressBar
                  progress={goal.current / goal.target}
                  color={colors.primary}
                  style={{ height: 8, borderRadius: 4 }}
                />
              </Card.Content>
            </Card>
          ))}
        </View>
        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
