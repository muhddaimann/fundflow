import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ViewProps,
  View,
  ScrollView,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollTop from "./scrollTop";

interface Props extends ViewProps {
  children: React.ReactNode;
  behavior?: "padding" | "height" | "position";
  offset?: number;
  dismissKeyboard?: boolean;
  scrollable?: boolean;
  scrollViewProps?: ScrollViewProps;
  gap?: number;
}

export function KeyboardLayout({
  children,
  behavior,
  offset = 0,
  dismissKeyboard = true,
  scrollable = false,
  scrollViewProps,
  style,
  gap = 0,
  ...props
}: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const defaultBehavior = Platform.OS === "ios" ? "padding" : "height";
  const finalBehavior = behavior || defaultBehavior;
  const finalOffset = Platform.OS === "ios" ? offset + insets.top : offset;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 300);
    scrollViewProps?.onScroll?.(e);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const content = (
    <View style={[{ flex: 1, gap }, style]} {...props}>
      {children}
    </View>
  );

  const innerContent = scrollable ? (
    <>
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        {...scrollViewProps}
        onScroll={handleScroll}
        contentContainerStyle={[
          { flexGrow: 1 },
          scrollViewProps?.contentContainerStyle,
        ]}
      >
        {content}
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  ) : (
    content
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={finalBehavior}
      keyboardVerticalOffset={finalOffset}
    >
      {dismissKeyboard ? (
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessibilityRole="none"
        >
          <View style={{ flex: 1 }}>{innerContent}</View>
        </TouchableWithoutFeedback>
      ) : (
        innerContent
      )}
    </KeyboardAvoidingView>
  );
}
