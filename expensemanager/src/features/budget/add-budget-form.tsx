import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Button, Field, TextInput } from '@features/ui'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

// utils
import { colors } from '@theme/colors'
import { numberToCurrency, currencyToNumber } from '../../utils'
import { ASKeys } from '@consts'

// types
interface Props {
  addBudget: (value: number) => void
}

export function AddBudgetForm({ addBudget }: Props) {
  const [value, setValue] = useState<number>()
  const { setItem } = useAsyncStorage(ASKeys.BUDGET)
  const isValueValid = !!value && value >= 1_000

  const handleAddBudget = () => {
    if (!value) return
    setItem(String(value))
    addBudget(value)
  }

  const handleChangeBudget = useCallback((currency: string) => {
    const newBudget = currencyToNumber(currency)
    if (isNaN(newBudget)) return
    setValue(newBudget)
  }, [])

  return (
    <View>
      <Field label="Definir presupuesto">
        <TextInput
          value={numberToCurrency(value) || ''}
          onChangeText={handleChangeBudget}
          placeholder="Ej: 3.000.000"
          keyboardType="numeric"
        />
      </Field>
      <Button
        disabled={!isValueValid}
        onPress={handleAddBudget}
        color="white"
        bgColor={colors.blue[600]}
      >
        Agregar Presupuesto
      </Button>
    </View>
  )
}

export default AddBudgetForm
