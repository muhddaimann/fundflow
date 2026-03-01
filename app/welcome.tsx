import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { router } from 'expo-router';
import { useDesign } from '../contexts/designContext';
import { useAuth } from '../contexts/authContext';

export default function Welcome() {
  const tokens = useDesign();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to home after 1 second
    const timer = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.background, justifyContent: 'center', padding: tokens.spacing.lg }}>
      <Card style={{ padding: tokens.spacing.lg, borderRadius: tokens.borderRadius.xl }}>
        <Text variant="headlineLarge" style={{ fontWeight: 'bold', textAlign: 'center' }}>Welcome Back!</Text>
        <Text variant="bodyLarge" style={{ textAlign: 'center', marginVertical: tokens.spacing.md, opacity: 0.7 }}>
          Preparing your dashboard, {user}...
        </Text>
      </Card>
    </View>
  );
}
