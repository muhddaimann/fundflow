import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { Surface, useTheme, Portal } from "react-native-paper";
import { useDesign } from "../contexts/designContext";

type Props = {
  visible: boolean;
  content: React.ReactNode;
  onDismiss: () => void;
  dismissable?: boolean;
};

export function OverlayModal({
  visible,
  content,
  onDismiss,
  dismissable = true,
}: Props) {
  const theme = useTheme();
  const tokens = useDesign();

  const [shouldRender, setShouldRender] = useState(visible);

  const backdropOpacity = React.useRef(new Animated.Value(0)).current;
  const contentOpacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0.92)).current;
  const translateY = React.useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      setShouldRender(true);

      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: tokens.motion.duration.slow,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: tokens.motion.duration.normal,
            easing: Easing.out(Easing.back(1.5)),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: tokens.motion.duration.normal,
            easing: Easing.out(Easing.back(1.5)),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: tokens.motion.duration.normal,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: tokens.motion.duration.fast,
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 0,
          duration: tokens.motion.duration.fast,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.95,
          duration: tokens.motion.duration.fast,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: tokens.spacing.xs,
          duration: tokens.motion.duration.fast,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setShouldRender(false);
        }
      });
    }
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <Portal>
      <View style={styles.fullscreen} pointerEvents={visible ? "auto" : "none"}>
        <TouchableWithoutFeedback onPress={dismissable ? onDismiss : undefined}>
          <Animated.View
            style={[styles.backdrop, { opacity: backdropOpacity }]}
          />
        </TouchableWithoutFeedback>

        <View
          style={[styles.container, { padding: tokens.spacing.lg }]}
          pointerEvents="box-none"
        >
          <Animated.View
            style={[
              styles.contentWrapper,
              {
                opacity: contentOpacity,
                transform: [{ scale }, { translateY }],
              },
            ]}
          >
            <Surface
              style={[
                styles.surface,
                {
                  backgroundColor: theme.colors.surface,
                  borderRadius: tokens.radii["2xl"],
                  borderWidth: 1,
                  borderColor: theme.colors.outlineVariant,
                },
              ]}
              elevation={2}
            >
              <View
                style={{
                  borderRadius: tokens.radii["2xl"],
                  overflow: "hidden",
                }}
              >
                <ScrollView
                  bounces={false}
                  overScrollMode="never"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.lg,
                    gap: tokens.spacing.md,
                  }}
                >
                  {content}
                </ScrollView>
              </View>
            </Surface>
          </Animated.View>
        </View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    width: "95%",
    maxWidth: 420,
    maxHeight: "80%",
  },
  surface: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
});
