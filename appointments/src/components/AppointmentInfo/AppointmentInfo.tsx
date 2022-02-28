import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appointment } from '../../types/global'
import { formatDate } from '../../utils'
import { Button } from '../Button'

// types
interface Props extends Appointment {
  closeModal: () => void
}

function AppointmentInfo({
  closeModal,
  date,
  email,
  ownerName,
  petName,
  phone,
  symptoms
}: Props) {
  return (
    <View>
      <Text style={styles.title}>
        Información <Text style={styles.titleBold}>Cita</Text>
      </Text>
      <Button color="#6b21a8" onPress={closeModal} outline>
        Cerrar
      </Button>

      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre del dueño:</Text>
          <Text style={styles.text}>{ownerName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Nombre de la mascota:</Text>
          <Text style={styles.text}>{petName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Síntomas:</Text>
          <Text style={styles.text}>{symptoms}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{email}</Text>
        </View>

        {!!phone && (
          <View style={styles.field}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.text}>{phone}</Text>
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Día de la cita:</Text>
          <Text style={styles.text}>{formatDate(date)}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  text: {
    fontSize: 18
  },
  label: {
    fontWeight: 'bold'
  },
  field: {
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 4
  },
  content: {}
})

export default AppointmentInfo
