import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { 
  Button, 
  Card, 
  Text, 
  Avatar, 
  IconButton, 
  List, 
  MD3Colors, 
  Portal,
  Modal,
  TextInput,
  Chip
} from 'react-native-paper';
import { Link, router } from 'expo-router';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

export default function Home() {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Banner Section */}
        <Text variant="headlineMedium" style={styles.header}>Paper Demo</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>Showcasing Material Design components.</Text>

        {/* Card Component */}
        <Card style={styles.card}>
          <Card.Title title="Card Example" subtitle="Standard Material Card" left={LeftContent} />
          <Card.Content>
            <Text variant="bodyMedium">This card is built using react-native-paper. It supports elevation, themes, and more.</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" onPress={() => {}}>Cancel</Button>
            <Button mode="contained" onPress={() => {}}>Ok</Button>
          </Card.Actions>
        </Card>

        {/* Input & Chips */}
        <View style={styles.section}>
          <TextInput
            label="Example Input"
            mode="outlined"
            placeholder="Type something..."
            style={styles.input}
          />
          <View style={styles.chipRow}>
            <Chip icon="information" style={styles.chip} onPress={() => {}}>Info</Chip>
            <Chip icon="heart" style={styles.chip} onPress={() => {}}>Favorite</Chip>
            <Chip selected style={styles.chip}>Selected</Chip>
          </View>
        </View>

        {/* List Section */}
        <List.Section>
          <List.Subheader>Important Links</List.Subheader>
          <List.Item
            title="Open Info Modal"
            description="Uses React Native Paper Portal & Modal"
            left={props => <List.Icon {...props} icon="information-outline" color={MD3Colors.primary50} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={showModal}
          />
          <List.Item
            title="Switch Tab"
            description="Go to the settings tab below"
            left={props => <List.Icon {...props} icon="tab" color={MD3Colors.error50} />}
            onPress={() => router.push('/settings')}
          />
        </List.Section>

        {/* Buttons Section */}
        <View style={styles.section}>
          <Button icon="camera" mode="contained" onPress={showModal} style={styles.button}>
            Open Demo Modal
          </Button>
          <Button icon="navigation" mode="elevated" onPress={() => {}} style={styles.button}>
            Elevated Button
          </Button>
        </View>

        {/* Portal & Modal */}
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
            <Text variant="headlineSmall">Native Paper Modal</Text>
            <Text variant="bodyMedium" style={{ marginVertical: 10 }}>
              This modal uses the Paper Portal system to render above everything else.
            </Text>
            <Button mode="contained" onPress={hideModal}>Close</Button>
          </Modal>
        </Portal>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110, // Extra space for FloatingNavBar
  },
  header: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 20,
    opacity: 0.7,
  },
  card: {
    marginBottom: 16,
  },
  section: {
    marginVertical: 10,
  },
  input: {
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginBottom: 4,
  },
  button: {
    marginVertical: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
