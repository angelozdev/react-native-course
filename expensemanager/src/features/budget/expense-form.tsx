import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Field, TextInput, Button } from '@features/ui'
import { colors } from '../../theme/colors'
import { numberToCurrency, currencyToNumber } from '../../utils'
import { Expense, NewExpense } from 'types'

const defaultValues = {
  name: '',
  category: 'none',
  amount: ''
}

// types
interface Props {
  onSubmit: (expense: Expense | NewExpense) => void
  initialValues?: Expense
  onDelete?: () => void
}

export function ExpenseForm({ onSubmit, initialValues, onDelete }: Props) {
  const isEditingMode = !!initialValues
  const [values, setValues] = useState<NewExpense | Expense>({
    ...defaultValues,
    ...(initialValues || ({} as Expense))
  })
  const getAreValuesValid = () => {
    if (!values.name || !values.category || !values.amount) return false
    if (values.category === defaultValues.category) return false
    return true
  }

  const handleChange = (name: string) => (value: any) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = () => {
    const { amount, ...rest } = values
    onSubmit({ amount: Number(amount), ...rest })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditingMode ? 'Editar' : 'Nuevo'} Gasto
      </Text>

      <Field label="Nombre de gasto">
        <TextInput
          value={values.name}
          placeholder="Compras"
          onChangeText={handleChange('name')}
        />
      </Field>
      <Field label="Valor">
        <TextInput
          value={numberToCurrency(values.amount)}
          onChangeText={(value) =>
            handleChange('amount')(currencyToNumber(value))
          }
          placeholder="$30.000"
          keyboardType="numeric"
        />
      </Field>
      <Field label="Categoría">
        <Picker
          selectedValue={values.category}
          onValueChange={handleChange('category')}
        >
          <Picker.Item label="-- Seleccione una categoría --" value="none" />
          <Picker.Item label="Transporte" value="transport" />
          <Picker.Item label="Comida" value="food" />
          <Picker.Item label="Ocio" value="leisure" />
          <Picker.Item label="Casa" value="home" />
          <Picker.Item label="Salud" value="health" />
          <Picker.Item label="Suscripciones" value="subscriptions" />
          <Picker.Item label="Otros" value="others" />
        </Picker>
      </Field>

      <View style={styles.buttons}>
        {isEditingMode && onDelete && (
          <View style={styles.buttonContainer}>
            <Button color="white" onPress={onDelete} bgColor={colors.red[500]}>
              Eliminar
            </Button>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            disabled={!getAreValuesValid()}
            onPress={handleSubmit}
            color="white"
            bgColor={isEditingMode ? colors.amber[500] : colors.blue[500]}
          >
            {isEditingMode ? 'Editar' : 'Agregar'}
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
    textTransform: 'uppercase',
    marginTop: 8
  },
  container: {},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 8
  }
})
