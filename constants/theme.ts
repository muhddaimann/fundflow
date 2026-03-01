import { MD3LightTheme } from 'react-native-paper';

export const DesignTokens = {
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#f8f9fa',
    surface: '#ffffff',
    error: '#b00020',
    text: '#000000',
    onPrimary: '#ffffff',
    activeBackground: '#f0f4ff',
    inactiveIcon: '#757575',
  },
  fonts: {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    bold: 'PlusJakartaSans_700Bold',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  elevation: {
    none: 0,
    low: 2,
    medium: 5,
    high: 10,
  }
};

export const PaperTheme = {
  ...MD3LightTheme,
  colors: DesignTokens.colors,
  roundness: DesignTokens.borderRadius.md,
  fonts: {
    ...MD3LightTheme.fonts,
    default: {
      fontFamily: DesignTokens.fonts.regular,
      fontWeight: '400' as const,
    },
    displaySmall: {
      fontFamily: DesignTokens.fonts.bold,
      fontWeight: '700' as const,
    },
    headlineMedium: {
      fontFamily: DesignTokens.fonts.bold,
      fontWeight: '700' as const,
    },
    bodyLarge: {
      fontFamily: DesignTokens.fonts.regular,
      fontWeight: '400' as const,
    },
    labelSmall: {
      fontFamily: DesignTokens.fonts.medium,
      fontWeight: '500' as const,
    },
  },
};
