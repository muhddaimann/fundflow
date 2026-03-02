import React from 'react';
import { 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard, 
  StyleSheet, 
  ViewProps,
  View,
  ScrollView,
  ScrollViewProps
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends ViewProps {
  children: React.ReactNode;
  behavior?: 'padding' | 'height' | 'position';
  offset?: number;
  dismissKeyboard?: boolean;
  scrollable?: boolean;
  scrollViewProps?: ScrollViewProps;
}

export function KeyboardLayout({ 
  children, 
  behavior,
  offset = 0,
  dismissKeyboard = true,
  scrollable = false,
  scrollViewProps,
  style,
  ...props
}: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  // Default behavior: iOS usually needs 'padding', Android often works best with 'height' or undefined
  const defaultBehavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const finalBehavior = behavior || defaultBehavior;

  // Account for status bar and potential headers
  const finalOffset = Platform.OS === 'ios' ? offset + insets.top : offset;

  const content = (
    <View style={[styles.inner, style]} {...props}>
      {children}
    </View>
  );

  const innerContent = scrollable ? (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...scrollViewProps}
    >
      {content}
    </ScrollView>
  ) : (
    content
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={finalBehavior}
      keyboardVerticalOffset={finalOffset}
    >
      {dismissKeyboard ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessibilityRole="none">
          <View style={{ flex: 1 }}>
            {innerContent}
          </View>
        </TouchableWithoutFeedback>
      ) : (
        innerContent
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
