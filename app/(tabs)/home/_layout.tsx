import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="tools" options={{ title: 'Financial Tools' }} />
      <Stack.Screen name="spend" options={{ title: 'Spend' }} />
      <Stack.Screen name="pay" options={{ title: 'Pay' }} />
      <Stack.Screen name="claim" options={{ title: 'Claim' }} />
      <Stack.Screen name="budget" options={{ title: 'Budget' }} />
      <Stack.Screen name="subscription" options={{ title: 'Subscription' }} />
      <Stack.Screen name="wishlist" options={{ title: 'Wishlist' }} />
      <Stack.Screen name="bills" options={{ title: 'Bills' }} />
      <Stack.Screen name="goals" options={{ title: 'Goals' }} />
      <Stack.Screen name="split" options={{ title: 'Split' }} />
      <Stack.Screen name="transaction" options={{ title: 'Transactions' }} />
      <Stack.Screen name="category" options={{ title: 'Categories' }} />
      <Stack.Screen name="team/[id]" options={{ title: 'Team Detail' }} />
    </Stack>
  );
}
