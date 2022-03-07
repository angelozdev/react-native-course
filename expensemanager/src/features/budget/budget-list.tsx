import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Expense } from 'types'
import { BudgetItem } from '.'

// types
interface Props {
  expenses: Expense[]
  selectExpense: (expense: Expense) => void
}

export function BudgetList({ expenses, selectExpense }: Props) {
  if (expenses.length === 0) {
    return <Text>No hay gastos por ahora.</Text>
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos</Text>

      {expenses.map((expense) => (
        <BudgetItem key={expense.id} onLongPress={selectExpense} {...expense} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700'
  }
})
