import React, { useCallback, useMemo, useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'

import { Field, Button } from '..'

// utils
import { fields } from './fixtures'

// types
import { Appointment, NewAppointment } from '../../types/global.d'
interface Props {
  closeModal: () => void
  addNewAppointment: (appointment: Appointment) => Promise<void>
  updateAppointment: (appointment: Appointment) => void
  initialValues?: Appointment
}

const canBeEmpty = new Set(['phone'])

const initialFormValues = {
  date: new Date().toISOString(),
  email: '',
  ownerName: '',
  petName: '',
  phone: '',
  symptoms: ''
}

export function AppointmentForm({
  closeModal,
  addNewAppointment,
  initialValues,
  updateAppointment
}: Props) {
  const [formValues, setFormValues] = useState<NewAppointment>(
    initialValues ?? initialFormValues
  )

  const someFieldIsEmpty = useMemo(() => {
    return Object.entries(formValues).some(([key, value]) => {
      return !value && !canBeEmpty.has(key)
    })
  }, [formValues])

  const handleChange = useCallback((field: string, value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }))
  }, [])

  const handleSubmit = useCallback(async () => {
    initialValues
      ? updateAppointment({ ...formValues, id: initialValues.id })
      : addNewAppointment({ ...formValues, id: Date.now() })
    closeModal()
  }, [
    closeModal,
    addNewAppointment,
    formValues,
    initialValues,
    updateAppointment
  ])

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          {initialValues ? (
            <>
              Editar cita para{' '}
              <Text style={styles.titleBold}>"{formValues.petName}"</Text>
            </>
          ) : (
            <>
              Nueva <Text style={styles.titleBold}>Cita</Text>
            </>
          )}
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
        {initialValues ? 'Guardar cambios' : 'Crear cita'}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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

export default AppointmentForm
