import { Link, router } from 'expo-router';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Modal() {
  const isPresented = router.canGoBack();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Modal</Text>
      <Text>This screen opens as a modal.</Text>
      
      {/* Go back using the router API */}
      <Button title="Dismiss" onPress={() => router.back()} />

      {/* Or use Link with relative path or direct href */}
      <Link href="/">Back to Home</Link>
      
      {/* Use light status bar on iOS to match the dark background of the modal */}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
