import React from 'react'
import { View } from 'react-native'
import { Field, TextInput } from '@features/ui'

export function AddBudgetForm() {
  return (
    <View>
      <Field label="Definir presupuesto">
        <TextInput keyboardType="numeric" />
      </Field>
    </View>
  )
}

export default AddBudgetForm
