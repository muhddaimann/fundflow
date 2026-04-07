import React, { useRef, useState } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View, Pressable } from "react-native";
import { useTheme, Text, IconButton, Switch, Badge, Card } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useCategory from "../../../hooks/useCategory";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Category() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { categories, isEmpty, setIsEmpty, openCategoryModal, openAddCategoryModal } = useCategory();
  
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
        }}
      >
        <Header 
          title="Categories" 
          subtitle="Organize your spending" 
          rightSlot={
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>Empty</Text>
              <Switch value={isEmpty} onValueChange={setIsEmpty} />
            </View>
          }
        />

        {/* Categories Grid/List */}
        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.sm }}>
          <View style={{ 
            flexDirection: "row", 
            flexWrap: "wrap", 
            gap: tokens.spacing.md,
            paddingTop: tokens.spacing.md
          }}>
            {/* Add Category Pill - Always Visible First */}
            <Pressable 
              onPress={() => openAddCategoryModal((data) => console.log('Create', data))}
              style={({ pressed }) => ({
                width: '100%',
                backgroundColor: colors.primaryContainer,
                borderRadius: tokens.radii.pill,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: tokens.spacing.md,
                gap: tokens.spacing.sm,
                borderWidth: 1.5,
                borderStyle: 'dashed',
                borderColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }]
              })}
            >
              <MaterialCommunityIcons name="plus-circle-outline" size={24} color={colors.primary} />
              <Text variant="titleMedium" style={{ color: colors.primary, fontWeight: "bold" }}>
                Add New Category
              </Text>
            </Pressable>

            {/* Existing Categories */}
            {categories.map((cat) => (
              <Pressable 
                key={cat.id} 
                onPress={() => openCategoryModal(cat, {
                  onDelete: (id) => console.log('Delete', id),
                  onEdit: (c) => console.log('Edit', c)
                })}
                style={({ pressed }) => ({
                  width: '100%',
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.99 : 1 }]
                })}
              >
                <Card 
                  style={{ 
                    backgroundColor: colors.surface, 
                    borderRadius: tokens.radii.lg,
                  }} 
                  mode="outlined"
                >
                  <Card.Content style={{ 
                    flexDirection: "row", 
                    alignItems: "center", 
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    gap: tokens.spacing.md
                  }}>
                    <View style={{ 
                      width: 44,
                      height: 44,
                      borderRadius: 22, 
                      backgroundColor: cat.color + '15',
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <MaterialCommunityIcons name={cat.icon as any} size={22} color={cat.color} />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text variant="titleMedium" style={{ fontWeight: "600" }}>{cat.name}</Text>
                      {cat.isDefault && (
                        <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant, opacity: 0.7 }}>
                          System Category
                        </Text>
                      )}
                    </View>

                    <IconButton icon="chevron-right" size={20} onPress={() => {}} />
                  </Card.Content>
                </Card>
              </Pressable>
            ))}
          </View>
        </View>

        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
