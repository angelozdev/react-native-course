import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../theme/colors'
import { Card } from '../card'

// types
interface Props {
  children?: React.ReactNode
}

export function Header({ children }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.content, children ? styles.hasChildren : {}]}>
        <Text style={styles.title}>Planificador de gastos</Text>
      </View>
      {children && (
        <View style={styles.childrenContainer}>
          <Card>{children}</Card>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  title: {
    color: colors.stone[100],
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  childrenContainer: {
    transform: [{ translateY: -90 }],
    margin: 16
  },
  content: {
    backgroundColor: colors.blue[600],
    padding: 16
  },
  hasChildren: {
    paddingBottom: 90
  }
})
