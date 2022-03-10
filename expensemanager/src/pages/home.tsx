import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// components
import { Card, Header, Modal } from '@features/ui'
import {
  AddBudgetForm,
  DisplayBudget,
  AddExpenseButton,
  ExpenseForm,
  BudgetList,
  Filter
} from '@features/budget'
import { colors } from '@theme/colors'
import { Expense, Filter as TFilter, NewExpense } from 'types'
import { generateId } from '@utils'
import { ASKeys } from '@consts'

// types

export function Home() {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [budget, setBudget] = useState<number>()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [selectedExpense, setSelectedExpense] = useState<Expense>()
  const [filteredExtenses, setFilteredExtenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      setExpenses((prevExpenses) => {
        let newExpenses = [...prevExpenses]

        if (selectedExpense) {
          newExpenses = prevExpenses.map((exp) =>
            exp.id === selectedExpense.id ? (expense as Expense) : exp
          )
        } else {
          const id = generateId()
          const newExpense: Expense = { ...expense, id, createdAt: Date.now() }
          newExpenses = [newExpense, ...prevExpenses]
        }

        AsyncStorage.setItem(ASKeys.EXPENSES, JSON.stringify(newExpenses))
        return newExpenses
      })

      toggleModal()
    },
    [toggleModal, selectedExpense]
  )

  const deleteExpense = useCallback(() => {
    Alert.alert('Eliminar gasto', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          setExpenses((prevExpenses) =>
            prevExpenses.filter((exp) => exp.id !== selectedExpense?.id)
          )
          toggleModal()
        }
      }
    ])
  }, [toggleModal, selectedExpense])

  const onFilterChange = useCallback(
    (filters: TFilter[]) => {
      const newFilteredExtenses = expenses.filter((expense) => {
        return filters.every((filter) => {
          if (filter.label === 'category' && filter.value === 'all') return true
          return expense[filter.label] === filter.value
        })
      })
      setFilteredExtenses(newFilteredExtenses)
    },
    [expenses]
  )

  const resetBudget = useCallback(() => {
    Alert.alert('Reiniciar presupuesto', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Reiniciar',
        style: 'destructive',
        onPress: () => {
          AsyncStorage.removeItem(ASKeys.BUDGET)
          AsyncStorage.removeItem(ASKeys.EXPENSES)
          setBudget(undefined)
          setExpenses([])
        }
      }
    ])
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const getBudgetFromAS = async () => {
      const budgetString = await AsyncStorage.getItem(ASKeys.BUDGET)
      const budgetNumber = Number(budgetString)
      if (isNaN(budgetNumber) || budgetNumber <= 0) return
      return budgetNumber
    }

    const getExpensesFromAS = async () => {
      try {
        const expensesString = await AsyncStorage.getItem(ASKeys.EXPENSES)
        const expensesFromAS = JSON.parse(expensesString ?? '[]') as Expense[]
        return expensesFromAS
      } catch (error) {
        console.error('[HOME.getExensesFromAS]', error)
        return []
      }
    }

    Promise.all([getBudgetFromAS(), getExpensesFromAS()])
      .then(([budgetFromAS, expensesFromAS]) => {
        setBudget(budgetFromAS)
        setExpenses(expensesFromAS)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    )

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header>
          {budget ? (
            <DisplayBudget
              resetBudget={resetBudget}
              budget={budget}
              expenseTotal={expenseTotal}
            />
          ) : (
            <AddBudgetForm addBudget={setBudget} />
          )}
        </Header>

        {!!budget && (
          <View style={styles.content}>
            <Card>
              <Filter onChange={onFilterChange} />
            </Card>
            <BudgetList
              selectExpense={selectExpense}
              expenses={filteredExtenses}
            />
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
            onDelete={deleteExpense}
          />
        </Card>
      </Modal>

      {!!budget && (
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
