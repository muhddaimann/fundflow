import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DesignProvider } from "../contexts/designContext";
import { ThemeProvider } from "../contexts/themeContext";
import { OverlayProvider } from "../contexts/overlayContext";
import { LoaderProvider } from "../contexts/loaderContext";
import { AuthProvider } from "../contexts/authContext";
import { TokenProvider } from "../contexts/tokenContext";
import { GlobalProvider } from "../contexts/globalContext";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { useEffect } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <TokenProvider>
          <AuthProvider>
            <DesignProvider>
              <ThemeProvider>
                <OverlayProvider>
                  <LoaderProvider>
                    <View style={{ flex: 1 }}>
                      <Stack screenOptions={{ headerShown: false }} />
                    </View>
                  </LoaderProvider>
                </OverlayProvider>
              </ThemeProvider>
            </DesignProvider>
          </AuthProvider>
        </TokenProvider>
      </GlobalProvider>
    </SafeAreaProvider>
  );
}
