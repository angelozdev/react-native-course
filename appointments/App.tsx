import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppointmentForm, Appointement, Button, Modal } from './src/components'
import AppointmentInfo from './src/components/AppointmentInfo/AppointmentInfo'

// utils
import { Appointment } from './src/types/global'

//types
type Modals = 'appointmentForm' | 'appointmentInfo'

function App() {
  const [isModalOpened, setIsModalOpened] = useState<Modals | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [appointments, setAppointements] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null)

  useEffect(() => {
    AsyncStorage.getItem('@appointments')
      .then(JSON.parse)
      .then((appointmentsFromAS) => {
        setAppointements(appointmentsFromAS || [])
      })
      .finally(() => setIsLoading(false))
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpened(null)
    setSelectedAppointment(null)
  }, [])

  const openEditModal = useCallback(
    (id: Appointment['id']) => {
      const appointment = appointments.find((a) => id === a.id)
      setSelectedAppointment(appointment)
      setIsModalOpened('appointmentForm')
    },
    [setIsModalOpened, appointments]
  )

  const openAppointmentInfoModal = useCallback(
    (id: Appointment['id']) => {
      const appointment = appointments.find((a) => id === a.id)
      setSelectedAppointment(appointment)
      setIsModalOpened('appointmentInfo')
    },
    [appointments]
  )

  const addNewAppointment = useCallback(
    async (newAppointement: Appointment) => {
      setAppointements((prevAppointments) => {
        console.log(prevAppointments)

        const newAppointements = [newAppointement, ...prevAppointments]
        AsyncStorage.setItem('@appointments', JSON.stringify(newAppointements))
        return newAppointements
      })
    },
    []
  )

  const updateAppointment = useCallback((newAppointement) => {
    setAppointements((prevAppointments) => {
      const filteredAppointments = prevAppointments.filter((appointment) => {
        return appointment.id !== newAppointement.id
      })
      const newAppointements = [newAppointement, ...filteredAppointments]
      AsyncStorage.setItem('@appointments', JSON.stringify(newAppointements))
      return newAppointements
    })
  }, [])

  const deleteAppointment = useCallback((appointmentId: Appointment['id']) => {
    setAppointements((prevAppointments) => {
      const newAppointements = prevAppointments.filter(
        (appointment) => appointment.id !== appointmentId
      )
      AsyncStorage.setItem('@appointments', JSON.stringify(newAppointements))
      return newAppointements
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          ListHeaderComponent={
            <>
              <Text style={styles.title}>
                Administrador de citas{' '}
                <Text style={styles.titleBold}>Veterinaria</Text>
              </Text>

              <View style={styles.addNewAppontmentButtonContainer}>
                <Button
                  onPress={() => setIsModalOpened('appointmentForm')}
                  color="white"
                  backgroundColor="#6b21a8"
                >
                  Nueva Cita
                </Button>
                {isLoading && <ActivityIndicator size="large" color="white" />}
              </View>
            </>
          }
          data={appointments}
          ListEmptyComponent={
            <Text style={styles.noAppointmentsMessage}>
              No hay citas para mostrar
            </Text>
          }
          renderItem={({ item }) => (
            <Appointement
              onLongPress={() => openAppointmentInfoModal(item.id)}
              deleteAppointment={deleteAppointment}
              openEditModal={openEditModal}
              {...item}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <Modal visible={isModalOpened === 'appointmentForm'}>
        <AppointmentForm
          initialValues={selectedAppointment}
          addNewAppointment={addNewAppointment}
          updateAppointment={updateAppointment}
          closeModal={closeModal}
        />
      </Modal>

      <Modal visible={isModalOpened === 'appointmentInfo'}>
        <AppointmentInfo closeModal={closeModal} {...selectedAppointment} />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 24,
    color: '#fff'
  },
  titleBold: {
    fontWeight: '800'
  },
  container: {
    backgroundColor: '#581c87',
    flex: 1,
    padding: 20
  },
  noAppointmentsMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: '600'
  },
  addNewAppontmentButtonContainer: {
    marginVertical: 20
  }
})

export default App
