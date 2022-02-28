import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appointment } from '../../types/global'
import { Button } from '../Button'

// types
interface Props extends Appointment {
  closeModal: () => void
}

function AppointmentInfo({
  ownerName,
  petName,
  symptoms,
  email,
  closeModal
}: Props) {
  return (
    <View>
      <Text style={styles.title}>
        Información <Text style={styles.titleBold}>Cita</Text>
      </Text>
      <Button onPress={closeModal} outline>
        Cerrar
      </Button>
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
  }
})

export default AppointmentInfo
