import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { numberToCurrency } from '../../utils'
import { Button } from '@features/ui'

// utils
import { colors } from '@theme/colors'

// types
interface Props {
  budget: number
  expenseTotal: number
  resetBudget: () => void
}

export function DisplayBudget({ budget, expenseTotal, resetBudget }: Props) {
  return (
    <View style={styles.container}>
      <CircularProgress
        radius={150}
        value={Number(((expenseTotal / budget) * 100).toFixed(2))}
        valueSuffix={'%'}
        activeStrokeWidth={24}
        inActiveStrokeWidth={20}
        duration={1000}
        inActiveStrokeColor={colors.stone[200]}
        activeStrokeColor={colors.blue[800]}
      />

      <View style={styles.content}>
        <View style={styles.resetBudgetButton}>
          <Button onPress={resetBudget} bgColor={colors.red[500]} color="white">
            Reiniciar presupuesto
          </Button>
        </View>

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
  },
  resetBudgetButton: {
    marginBottom: 24
  }
})

export default DisplayBudget
