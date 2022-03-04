import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../../theme/colors'

// types
interface Props {
  children: React.ReactNode
}

export function Card({ children }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.stone[50],
    borderRadius: 8,
    shadowColor: colors.stone[900],
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16
  }
})

export default Card
