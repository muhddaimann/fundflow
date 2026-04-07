import React, { useRef } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View, Pressable } from "react-native";
import { useTheme, Text, Card, Switch } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/scrollTop";
import Header from "../../../components/header";
import EndScreen from "../../../components/endScreen";
import useCategory, { Category as CategoryType } from "../../../hooks/useCategory";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Category() {
  const { colors } = useTheme();
  const tokens = useDesign();
  const {
    categories,
    isEmpty,
    setIsEmpty,
    openCategoryModal,
    openAddCategoryModal,
  } = useCategory();
  
  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const customCategories = categories.filter(c => !c.isDefault);
  const systemCategories = categories.filter(c => c.isDefault);

  const renderCategoryCard = (cat: CategoryType) => (
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
            <Text 
              variant="titleMedium" 
              style={{ fontWeight: "600" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {cat.name}
            </Text>
          </View>

          <MaterialCommunityIcons 
            name="chevron-right" 
            size={20} 
            color={colors.onSurfaceVariant} 
            style={{ opacity: 0.5 }}
          />
        </Card.Content>
      </Card>
    </Pressable>
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

        {/* Custom Section */}
        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
          <View>
            <Text variant="titleMedium" style={{ fontWeight: "800", letterSpacing: 0.5 }}>
              YOUR CATEGORIES
            </Text>
            <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
              Personalized categories for your tracking
            </Text>
          </View>

          <Pressable 
            onPress={() => openAddCategoryModal((data) => console.log('Create', data))}
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
              Add New Category
            </Text>
          </Pressable>

          <View style={{ gap: tokens.spacing.sm }}>
            {customCategories.map(renderCategoryCard)}
          </View>
        </View>

        {/* System Section */}
        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
          <View>
            <Text variant="titleMedium" style={{ fontWeight: "800", letterSpacing: 0.5, color: colors.onSurfaceVariant }}>
              SYSTEM DEFAULTS
            </Text>
            <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant, opacity: 0.7 }}>
              Pre-defined categories that cannot be removed
            </Text>
          </View>

          <View style={{ gap: tokens.spacing.sm }}>
            {systemCategories.map(renderCategoryCard)}
          </View>
        </View>

        <EndScreen />
      </ScrollView>
      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
