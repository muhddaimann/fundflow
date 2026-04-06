import React, { useRef, useState } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import { useTheme, Text, List, Card, IconButton } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useSpend from "../../../hooks/useSpend";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Category() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { spendData, formatCurrency } = useSpend();
  
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
        <Header 
          title="Categories" 
          subtitle="Manage your expense categories" 
          rightSlot={
            <IconButton icon="plus" mode="contained" containerColor={colors.primary} iconColor={colors.onPrimary} onPress={() => {}} />
          }
        />

        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
          {spendData.categories.map((cat, i) => (
            <Card key={i} style={{ backgroundColor: colors.surface }} mode="outlined">
              <Card.Title
                title={cat.name}
                subtitle={`${formatCurrency(cat.amount)} spent`}
                left={(props) => (
                  <View style={{ 
                    padding: tokens.spacing.sm, 
                    borderRadius: tokens.radii.md, 
                    backgroundColor: cat.color + '20' 
                  }}>
                    <MaterialCommunityIcons name={cat.icon as any} size={24} color={cat.color} />
                  </View>
                )}
                right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
              />
            </Card>
          ))}
        </View>

        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
