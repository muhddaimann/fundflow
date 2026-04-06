import React, { useRef, useState } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import { useTheme, Text, List, Searchbar } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useSpend from "../../../hooks/useSpend";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Transaction() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { spendData, formatCurrency } = useSpend();
  const [searchQuery, setSearchQuery] = useState("");
  
  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const filteredTransactions = spendData.recentTransactions.filter(tx => 
    tx.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      >
        <Header title="All Transactions" subtitle="History of your spending" />

        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Searchbar
            placeholder="Search transactions..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{ backgroundColor: colors.surface, borderRadius: tokens.radii.lg }}
          />
        </View>

        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          {filteredTransactions.map((tx) => (
            <List.Item
              key={tx.id}
              title={tx.title}
              titleStyle={{ fontWeight: "600" }}
              description={new Date(tx.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
              left={props => (
                <View style={{ justifyContent: "center" }}>
                  <View style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: tokens.radii.md, 
                    backgroundColor: colors.surfaceVariant,
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <MaterialCommunityIcons name={tx.icon as any} size={24} color={colors.onSurfaceVariant} />
                  </View>
                </View>
              )}
              right={() => (
                <View style={{ justifyContent: "center" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 16, color: colors.error }}>
                    - {formatCurrency(tx.amount)}
                  </Text>
                </View>
              )}
              style={{ 
                backgroundColor: colors.surface, 
                borderRadius: tokens.radii.lg, 
                marginBottom: tokens.spacing.xs,
                borderWidth: 1,
                borderColor: colors.outlineVariant
              }}
            />
          ))}
        </View>

        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
