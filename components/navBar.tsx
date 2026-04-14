import React, { useEffect, useRef } from "react";
import { Animated, View, Pressable, Easing } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname, router } from "expo-router";
import { useDesign } from "../contexts/designContext";
import { useAuth } from "../contexts/authContext";
import { useTabs } from "../contexts/tabContext";
import { useOverlay } from "../contexts/overlayContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PickerModal, PickerItem } from "./pickerModal";
import useSpend from "../hooks/useSpend";
import useBudget from "../hooks/useBudget";
import useSubscription from "../hooks/useSubscription";
import useBills from "../hooks/useBills";
import useGoals from "../hooks/useGoals";
import useSplit from "../hooks/useSplit";
import useWishlist from "../hooks/useWishlist";
import usePay from "../hooks/usePay";
import useClaim from "../hooks/useClaim";

export function NavBar() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const tokens = useDesign();
  const pathname = usePathname();
  const { signOut } = useAuth();
  const { hideTabBar } = useTabs();
  const { showModal, hideModal } = useOverlay();

  // Quick Action Hooks
  const { openAddSpendModal } = useSpend();
  const { openAddBudgetModal } = useBudget();
  const { openAddSubscriptionModal } = useSubscription();
  const { openAddBillModal } = useBills();
  const { openAddGoalModal } = useGoals();
  const { openCreateGroupModal } = useSplit();
  const { openAddWishlistModal } = useWishlist();
  const { openAddPayableModal } = usePay();
  const { openAddClaimModal } = useClaim();

  const isHome = pathname === "/home" || pathname === "/(tabs)/home";
  const isSettings =
    pathname === "/settings" || pathname === "/(tabs)/settings";
  const isTabRoot = isHome || isSettings;

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hide if manually toggled OR if we are not on a main tab root
    const shouldHide = hideTabBar || !isTabRoot;

    Animated.timing(translateY, {
      toValue: shouldHide ? 120 : 0,
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start();
  }, [hideTabBar, isTabRoot]);

  const handleActionButton = async () => {
    if (isHome) {
      const items: PickerItem[] = [
        {
          label: "Add Spend",
          icon: "plus-circle-outline",
          color: theme.colors.primary,
          onPress: () => openAddSpendModal(),
        },
        {
          label: "Add To Pay",
          icon: "arrow-up-circle-outline",
          color: theme.colors.error,
          onPress: openAddPayableModal,
        },
        {
          label: "Add To Claim",
          icon: "arrow-down-circle-outline",
          color: theme.colors.tertiary,
          onPress: openAddClaimModal,
        },
        {
          label: "Manage Budget",
          icon: "chart-donut",
          color: "#FF9F43",
          onPress: () => router.push("/home/budget"),
        },
        {
          label: "Manage Category",
          icon: "tag-outline",
          color: theme.colors.secondary,
          onPress: () => router.push("/home/category"),
        },
      ];

      showModal({
        content: (
          <PickerModal
            title=""
            subtitle=""
            items={items}
            onClose={hideModal}
          />
        ),
      });
    } else {
      await signOut();
      router.replace("/goodbye");
    }
  };

  const navigateTo = (route: string) => {
    if (pathname === route || pathname === `/(tabs)${route}`) return;
    router.navigate(route as any);
  };

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: "home-variant",
      active: isHome,
      onPress: () => navigateTo("/home"),
    },
    {
      key: "settings",
      label: "Settings",
      icon: "cog-outline",
      active: isSettings,
      onPress: () => navigateTo("/settings"),
    },
  ];

  return (
    <Animated.View
      renderToHardwareTextureAndroid
      style={{
        position: "absolute",
        bottom:
          (insets.bottom > 0 ? insets.bottom : tokens.spacing.md) +
          tokens.spacing.lg,
        left: tokens.spacing["2xl"],
        right: tokens.spacing["2xl"],
        flexDirection: "row",
        alignItems: "center",
        gap: tokens.spacing.lg,
        transform: [{ translateY }],
      }}
    >
      <View
        style={{
          flex: 1,
          height: 60,
          borderRadius: 30,
          flexDirection: "row",
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.outlineVariant,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
        }}
      >
        {navItems.map((item) => (
          <Pressable
            key={item.key}
            onPress={item.onPress}
            style={({ pressed }) => ({
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              transform: [{ scale: pressed ? 0.96 : 1 }],
            })}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={item.active ? 26 : 22}
              color={
                item.active
                  ? theme.colors.primary
                  : theme.colors.onSurfaceVariant
              }
            />
            <Text
              variant="labelSmall"
              style={{
                marginTop: 2,
                fontWeight: item.active ? "600" : "400",
                color: item.active
                  ? theme.colors.primary
                  : theme.colors.onSurfaceVariant,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={handleActionButton}
        style={({ pressed }) => ({
          height: 60,
          width: 60,
          borderRadius: 30,
          backgroundColor: isHome ? theme.colors.primary : theme.colors.error,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ scale: pressed ? 0.95 : 1 }],
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
        })}
      >
        <MaterialCommunityIcons
          name={isHome ? "plus" : "logout"}
          size={26}
          color={isHome ? theme.colors.onPrimary : theme.colors.onError}
        />
      </Pressable>
    </Animated.View>
  );
}
