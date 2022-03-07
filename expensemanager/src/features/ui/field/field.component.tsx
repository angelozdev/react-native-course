import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../theme/colors'

// types
interface Props {
  label: string
  children: React.ReactNode
}

export function Field({ label, children }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    color: colors.stone[500],
    marginBottom: 8
  },
  input: {}
})

export default Field
