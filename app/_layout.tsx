import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* (tabs) is a route group, it will be mapped to the / URL but can have its own layout */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Settings Modal' }} />
    </Stack>
  );
}
