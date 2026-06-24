import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { BlockProps } from '../types/sdui';

function PlaceholderComponent({ block }: BlockProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{block.type} not implemented yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#333333',
  },
});

export const Placeholder = React.memo(PlaceholderComponent);
