import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

// utils
import type {UsProps} from '../types/global';

export function Us({navigation, route}: UsProps) {
  return (
    <View style={styles.container}>
      <Text>Hello, {route.params.name}!</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
