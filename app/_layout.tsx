import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DesignProvider } from "../contexts/designContext";
import { AuthProvider } from "../contexts/authContext";
import { TokenProvider } from "../contexts/tokenContext";
import { PaperTheme } from "../constants/theme";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <TokenProvider>
        <AuthProvider>
          <DesignProvider>
            <PaperProvider theme={PaperTheme}>
              <StatusBar
                style="dark"
                backgroundColor={PaperTheme.colors.background}
              />
              <Stack screenOptions={{ headerShown: false }} />
            </PaperProvider>
          </DesignProvider>
        </AuthProvider>
      </TokenProvider>
    </SafeAreaProvider>
  );
}
