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

    primary: "#0EA5E9",
    onPrimary: "#FFFFFF",
    primaryContainer: "#E0F2FE",
    onPrimaryContainer: "#0C4A6E",

    secondary: "#A855F7",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#F3E8FF",
    onSecondaryContainer: "#581C87",

    tertiary: "#22C55E",
    onTertiary: "#052E16",
    tertiaryContainer: "#DCFCE7",
    onTertiaryContainer: "#052E16",

    error: "#DC2626",
    onError: "#FFFFFF",
    errorContainer: "#FEE2E2",
    onErrorContainer: "#7F1D1D",

    surface: "#FFFFFF",
    onSurface: "#020617",
    surfaceVariant: "#F1F5F9",
    onSurfaceVariant: "#475569",

    background: "#F0F9FF",
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
      level1: "#F0F9FF",
      level2: "#E0F2FE",
      level3: "#BAE6FD",
      level4: "#7DD3FC",
      level5: "#38BDF8",
    },
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 14,
  fonts,
  colors: {
    ...MD3DarkTheme.colors,

    primary: "#38BDF8",
    onPrimary: "#0C4A6E",
    primaryContainer: "#0369A1",
    onPrimaryContainer: "#E0F2FE",

    secondary: "#C084FC",
    onSecondary: "#581C87",
    secondaryContainer: "#7E22CE",
    onSecondaryContainer: "#F3E8FF",

    tertiary: "#4ADE80",
    onTertiary: "#052E16",
    tertiaryContainer: "#166534",
    onTertiaryContainer: "#DCFCE7",

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
      level2: "#082F49",
      level3: "#0C4A6E",
      level4: "#0369A1",
      level5: "#0284C7",
    },
  },
};
