import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, Card, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import { useDesign } from '../contexts/designContext';
import { useAuth } from '../contexts/authContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const tokens = useDesign();
  const { signIn } = useAuth();

  const handleLogin = () => {
    if (signIn(username, password)) {
      setError(false);
      // Redirect to the intermediate welcome screen
      router.replace('/welcome');
    } else {
      setError(true);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.background, justifyContent: 'center', padding: tokens.spacing.lg }}>
      <Card style={{ padding: tokens.spacing.lg, borderRadius: tokens.borderRadius.xl }}>
        <Text variant="headlineLarge" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: tokens.spacing.xs }}>App Name</Text>
        <Text variant="bodyMedium" style={{ textAlign: 'center', marginBottom: tokens.spacing.lg, opacity: 0.6 }}>
          Sign in to your account
        </Text>
        
        <TextInput
          label="Username"
          mode="outlined"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          error={error}
        />
        
        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ marginTop: tokens.spacing.md }}
          error={error}
        />
        
        {error && (
          <HelperText type="error" visible={error}>
            Invalid credentials (user / 123)
          </HelperText>
        )}

        <Button 
          mode="contained" 
          onPress={handleLogin} 
          style={{ marginTop: tokens.spacing.lg }}
        >
          Login
        </Button>
      </Card>
    </View>
  );
}
