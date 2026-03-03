import React, { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTab } from "../contexts/tabContext";
import { useDesign } from "../contexts/designContext";

export function ScrollTop() {
  const theme = useTheme();
  const tokens = useDesign();
  const { isNavbarVisible, scrollToTop } = useTab();

  const translateY = useRef(new Animated.Value(-80)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const visible = !isNavbarVisible;

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: visible ? 0 : -80,
        damping: 18,
        stiffness: 180,
        mass: 0.7,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: visible ? 1 : 0.8,
        damping: 15,
        stiffness: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isNavbarVisible]);

  return (
    <Animated.View
      renderToHardwareTextureAndroid
      pointerEvents={!isNavbarVisible ? "auto" : "none"}
      style={{
        position: "absolute",
        top: tokens.spacing.xl,
        alignSelf: "center",
        zIndex: 100,
        opacity,
        transform: [{ translateY }, { scale }],
      }}
    >
      <Pressable
        onPress={scrollToTop}
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.95 : 1 }],
        })}
      >
        <View
          style={{
            height: 52,
            width: 52,
            borderRadius: 26,
            backgroundColor: theme.colors.primary,
            alignItems: "center",
            justifyContent: "center",
            elevation: 8,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
          }}
        >
          <MaterialCommunityIcons
            name="chevron-up"
            size={24}
            color={theme.colors.onPrimary}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}
