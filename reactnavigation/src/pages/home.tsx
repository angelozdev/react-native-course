import {Button, StyleSheet, View} from 'react-native';
import React from 'react';

// types
import type {HomeProps} from '../types/global';

export function Home({navigation}: HomeProps) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate('Us', {name: 'Angelo Zambrano'})}
        title="GO TO US"
      />
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
