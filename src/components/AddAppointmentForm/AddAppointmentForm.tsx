import React, { useCallback, useMemo, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native'

import { Field, Button } from '../'

// utils
import { fields } from './fixtures'

// types
interface Props {
  closeModal: () => void
}

const canBeEmpty = new Set(['phone'])

export function AddAppointmentForm({ closeModal }: Props) {
  const [formValues, setFormValues] = useState<Record<string, string>>({
    date: new Date().toISOString(),
    email: '',
    ownerName: '',
    petName: '',
    phone: '',
    symptoms: ''
  })

  const someFieldIsEmpty = useMemo(() => {
    return Object.entries(formValues).some(([key, value]) => {
      return !value && !canBeEmpty.has(key)
    })
  }, [formValues])

  const handleChange = useCallback((field: string, value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }))
  }, [])

  const handleSubmit = useCallback(() => {
    if (someFieldIsEmpty) return
    Alert.alert('Cita agendada', 'La cita ha sido agendada correctamente')
    closeModal()
  }, [closeModal, someFieldIsEmpty])

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Nueva <Text style={styles.titleBold}>Cita</Text>
        </Text>

        <Button color="#6b21a8" outline onPress={closeModal}>
          Cancelar
        </Button>

        <View style={styles.fields}>
          {fields.map((field) => {
            const {
              id,
              label,
              inputType,
              keyboardType,
              placeholder,
              inputProps
            } = field

            return (
              <Field
                key={id}
                label={label}
                onChange={(value) => handleChange(id, value)}
                inputType={inputType}
                keyboardType={keyboardType}
                placeholder={placeholder}
                inputProps={inputProps}
                value={formValues[id]}
              />
            )
          })}
        </View>
      </ScrollView>
      <Button
        disabled={someFieldIsEmpty}
        onPress={handleSubmit}
        backgroundColor="#6b21a8"
        color="white"
      >
        Guardar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 30,
    backgroundColor: 'white',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1
  },
  title: {
    marginVertical: 10,
    marginBottom: 30,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center'
  },
  titleBold: {
    fontWeight: 'bold'
  },
  fields: {
    marginVertical: 30
  }
})

export default AddAppointmentForm
