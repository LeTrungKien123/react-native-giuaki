import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EventHubContainer } from '../screens/EventHubContainer';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <EventHubContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
