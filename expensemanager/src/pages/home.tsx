import React, { useCallback, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

// components
import { Card, Header, Modal } from '@features/ui'
import {
  AddBudgetForm,
  DisplayBudget,
  AddExpenseButton,
  ExpenseForm,
  BudgetList
} from '@features/budget'
import { colors } from '../theme/colors'
import { Expense, NewExpense } from 'types'
import { generateId } from '../utils'

// types

export function Home() {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [budget, setBudget] = useState<number>()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [selectedExpense, setSelectedExpense] = useState<Expense>()

  const expenseTotal = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense?.amount, 0)
  }, [expenses])

  const selectExpense = useCallback((expense: Expense) => {
    setSelectedExpense(expense)
    setIsModalOpened(true)
  }, [])

  const toggleModal = useCallback(() => {
    setIsModalOpened((prevIsModalOpened) => {
      const newIsModalOpened = !prevIsModalOpened
      if (!newIsModalOpened) setSelectedExpense(undefined)
      return newIsModalOpened
    })
  }, [])

  const addOrEditExpense = useCallback(
    (expense: Expense | NewExpense) => {
      if (selectedExpense) {
        setExpenses((prevExpenses) => {
          const newExpenses = prevExpenses.map((exp) =>
            exp.id === selectedExpense.id ? (expense as Expense) : exp
          )
          return newExpenses
        })
      } else {
        const id = generateId()
        const newExpense: Expense = { ...expense, id, createdAt: Date.now() }
        setExpenses((prevExpenses) => [newExpense, ...prevExpenses])
      }
      toggleModal()
    },
    [toggleModal, selectedExpense]
  )

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header>
          {budget ? (
            <DisplayBudget budget={budget} expenseTotal={expenseTotal} />
          ) : (
            <AddBudgetForm addBudget={setBudget} />
          )}
        </Header>

        {budget && (
          <View style={styles.content}>
            <BudgetList selectExpense={selectExpense} expenses={expenses} />
          </View>
        )}
      </ScrollView>

      <Modal
        closeModal={toggleModal}
        animationType="slide"
        visible={isModalOpened}
        backgroundColor={colors.stone[100]}
      >
        <Card>
          <ExpenseForm
            initialValues={selectedExpense}
            onSubmit={addOrEditExpense}
          />
        </Card>
      </Modal>

      {budget && (
        <View
          style={[styles.floatingButton, isModalOpened ? styles.pressed : {}]}
        >
          <AddExpenseButton onPress={toggleModal} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  pressed: {
    transform: [{ rotateZ: '45deg' }]
  },
  container: {
    flex: 1,
    backgroundColor: colors.stone[100]
  },
  content: {
    transform: [{ translateY: -90 }],
    padding: 16
  }
})
