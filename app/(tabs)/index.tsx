import React from 'react';
import { ScrollView } from 'react-native';
import { useDesign } from '../../contexts/designContext';

export default function Home() {
  const tokens = useDesign();

  return (
      <ScrollView contentContainerStyle={{ padding: tokens.spacing.md }}>
        

      </ScrollView>
  );
}
