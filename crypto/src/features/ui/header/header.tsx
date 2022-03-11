import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criptomonedas</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'teal',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
})
