import {
  MD3DarkTheme,
  MD3LightTheme,
  configureFonts,
  type MD3Theme,
} from "react-native-paper";

const make = (
  family: string,
  weight: "400" | "700",
  fontSize: number,
  lineHeight: number,
  letterSpacing = 0,
) => ({
  fontFamily: family,
  fontWeight: weight,
  fontSize,
  lineHeight,
  letterSpacing,
});

const fontConfig = {
  displayLarge: make("ComicNeue_700Bold", "700", 57, 64),
  displayMedium: make("ComicNeue_700Bold", "700", 45, 52),
  displaySmall: make("ComicNeue_700Bold", "700", 36, 44),

  headlineLarge: make("ComicNeue_700Bold", "700", 32, 40),
  headlineMedium: make("ComicNeue_700Bold", "700", 28, 36),
  headlineSmall: make("ComicNeue_700Bold", "700", 24, 32),

  titleLarge: make("ComicNeue_700Bold", "700", 22, 28),
  titleMedium: make("ComicNeue_700Bold", "700", 16, 24, 0.1),
  titleSmall: make("ComicNeue_700Bold", "700", 14, 20, 0.1),

  labelLarge: make("ComicNeue_700Bold", "700", 14, 20, 0.1),
  labelMedium: make("ComicNeue_400Regular", "400", 12, 16, 0.5),
  labelSmall: make("ComicNeue_400Regular", "400", 11, 16, 0.5),

  bodyLarge: make("ComicNeue_400Regular", "400", 16, 24),
  bodyMedium: make("ComicNeue_400Regular", "400", 14, 20),
  bodySmall: make("ComicNeue_400Regular", "400", 12, 16),
};

const fonts = configureFonts({ config: fontConfig });

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 14,
  fonts,
  colors: {
    ...MD3LightTheme.colors,

    primary: "#10B981",
    onPrimary: "#FFFFFF",
    primaryContainer: "#D1FAE5",
    onPrimaryContainer: "#064E3B",

    secondary: "#0F172A",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E2E8F0",
    onSecondaryContainer: "#020617",

    tertiary: "#38BDF8",
    onTertiary: "#082F49",
    tertiaryContainer: "#E0F2FE",
    onTertiaryContainer: "#082F49",

    error: "#DC2626",
    onError: "#FFFFFF",
    errorContainer: "#FEE2E2",
    onErrorContainer: "#7F1D1D",

    surface: "#FFFFFF",
    onSurface: "#020617",
    surfaceVariant: "#F1F5F9",
    onSurfaceVariant: "#475569",

    background: "#F0FDF4",
    onBackground: "#020617",

    outline: "#CBD5E1",
    outlineVariant: "#E2E8F0",

    shadow: "#000000",
    scrim: "#000000",

    surfaceDisabled: "rgba(2,6,23,0.12)",
    onSurfaceDisabled: "rgba(2,6,23,0.38)",
    backdrop: "rgba(2,6,23,0.4)",

    elevation: {
      level0: "transparent",
      level1: "#F0FDF4",
      level2: "#DCFCE7",
      level3: "#BBF7D0",
      level4: "#86EFAC",
      level5: "#4ADE80",
    },
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 14,
  fonts,
  colors: {
    ...MD3DarkTheme.colors,

    primary: "#34D399",
    onPrimary: "#064E3B",
    primaryContainer: "#065F46",
    onPrimaryContainer: "#D1FAE5",

    secondary: "#94A3B8",
    onSecondary: "#020617",
    secondaryContainer: "#1E293B",
    onSecondaryContainer: "#E2E8F0",

    tertiary: "#38BDF8",
    onTertiary: "#082F49",
    tertiaryContainer: "#075985",
    onTertiaryContainer: "#E0F2FE",

    error: "#F87171",
    onError: "#7F1D1D",
    errorContainer: "#991B1B",
    onErrorContainer: "#FEE2E2",

    surface: "#020617",
    onSurface: "#E2E8F0",
    surfaceVariant: "#1E293B",
    onSurfaceVariant: "#94A3B8",

    background: "#020617",
    onBackground: "#F1F5F9",

    outline: "#475569",
    outlineVariant: "#334155",

    shadow: "#000000",
    scrim: "#000000",

    surfaceDisabled: "rgba(226,232,240,0.12)",
    onSurfaceDisabled: "rgba(226,232,240,0.38)",
    backdrop: "rgba(0,0,0,0.4)",

    elevation: {
      level0: "transparent",
      level1: "#020617",
      level2: "#022C22",
      level3: "#064E3B",
      level4: "#065F46",
      level5: "#047857",
    },
  },
};
