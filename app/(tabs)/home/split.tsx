import React, { useRef, useState } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View, Pressable } from "react-native";
import { useTheme, List, Text, Card } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useSplit from "../../../hooks/useSplit";
import useSpend from "../../../hooks/useSpend";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Split() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { splits, formatCurrency } = useSplit();
  const { openAddSpendModal } = useSpend();
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
          gap: tokens.spacing.xl,
          paddingTop: tokens.spacing.md
        }}
      >
        <Header title="Split" subtitle="Shared expenses" />

        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
          <View>
            <Text variant="titleMedium" style={{ fontWeight: "800", letterSpacing: 0.5 }}>
              SHARED EXPENSES
            </Text>
            <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
              Manage who owes what for group spending
            </Text>
          </View>

          <Pressable 
            onPress={() => openAddSpendModal((data) => console.log('Split Spend', data))}
            style={({ pressed }) => ({
              backgroundColor: colors.primaryContainer,
              borderRadius: tokens.radii.pill,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingVertical: tokens.spacing.md,
              paddingHorizontal: tokens.spacing.lg,
              gap: tokens.spacing.sm,
              borderWidth: 1.5,
              borderStyle: 'dashed',
              borderColor: colors.primary,
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }]
            })}
          >
            <MaterialCommunityIcons name="plus-circle-outline" size={24} color={colors.primary} />
            <Text 
              variant="titleMedium" 
              style={{ color: colors.primary, fontWeight: "bold" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Add New Spending
            </Text>
          </Pressable>

          <View style={{ gap: tokens.spacing.sm }}>
            {splits.map((split, i) => (
              <Card 
                key={i} 
                style={{ backgroundColor: colors.surface, borderRadius: tokens.radii.lg }} 
                mode="outlined"
              >
                <List.Item
                  title={split.person}
                  titleStyle={{ fontWeight: "600" }}
                  description={split.type === "owe" ? "You owe" : "Owes you"}
                  right={() => (
                    <Text style={{ 
                      alignSelf: "center", 
                      fontWeight: "bold",
                      color: split.type === "owe" ? colors.error : colors.primary 
                    }}>
                      {formatCurrency(split.amount)}
                    </Text>
                  )}
                  left={props => (
                    <View style={{ justifyContent: "center", paddingLeft: tokens.spacing.xs }}>
                      <View style={{ 
                        width: 44, 
                        height: 44, 
                        borderRadius: 22, 
                        backgroundColor: colors.surfaceVariant,
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <MaterialCommunityIcons name="account-outline" size={24} color={colors.onSurfaceVariant} />
                      </View>
                    </View>
                  )}
                />
              </Card>
            ))}
          </View>
        </View>
        
        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
