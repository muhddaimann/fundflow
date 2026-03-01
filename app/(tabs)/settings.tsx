import { StyleSheet, View } from 'react-native';
import { Text, List, Switch, MD3Colors } from 'react-native-paper';
import React from 'react';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Settings</Text>
      </View>

      <List.Section style={styles.list}>
        <List.Subheader>Preferences</List.Subheader>
        <List.Item
          title="Dark Mode"
          left={props => <List.Icon {...props} icon="brightness-6" />}
          right={() => (
            <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
          )}
        />
        <List.Item
          title="Enable Notifications"
          left={props => <List.Icon {...props} icon="bell" />}
          right={() => (
            <Switch 
              value={isNotificationsEnabled} 
              onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)} 
            />
          )}
        />
        
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Profile"
          description="Manage your personal information"
          left={props => <List.Icon {...props} icon="account" />}
          onPress={() => {}}
        />
        <List.Item
          title="Logout"
          titleStyle={{ color: MD3Colors.error50 }}
          left={props => <List.Icon {...props} icon="logout" color={MD3Colors.error50} />}
          onPress={() => {}}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
  list: {
    marginTop: 10,
    paddingBottom: 110, // Space for FloatingNavBar
  },
});
