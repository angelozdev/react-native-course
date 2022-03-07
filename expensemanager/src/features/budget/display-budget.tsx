import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { numberToCurrency } from '../../utils'

// utils
import { colors } from '../../theme/colors'

// types
interface Props {
  budget: number
  expenseTotal: number
}

export function DisplayBudget({ budget, expenseTotal }: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        width={250}
        height={250}
        source={require('../../assets/grafico.jpg')}
      />

      <View style={styles.content}>
        <Text style={styles.label}>
          Presupuesto:{' '}
          <Text style={styles.value}>{numberToCurrency(budget)}</Text>
        </Text>

        <Text style={styles.label}>
          Disponible:{' '}
          <Text style={styles.value}>
            {numberToCurrency(budget - expenseTotal)}
          </Text>
        </Text>

        <Text style={styles.label}>
          Gastos:{' '}
          <Text style={styles.value}>
            {numberToCurrency(expenseTotal) || '$0'}
          </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  content: {
    marginTop: 24
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.blue[900]
  },
  value: {
    fontWeight: '500',
    color: colors.stone[900]
  }
})

export default DisplayBudget
