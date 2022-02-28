import React, { useCallback, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { AppointmentForm, Appointement, Button, Modal } from './src/components'
import AppointmentInfo from './src/components/AppointmentInfo/AppointmentInfo'

// utils
import { Appointment } from './src/types/global'

//types
type Modals = 'appointmentForm' | 'appointmentInfo'

function App() {
  const [isModalOpened, setIsModalOpened] = useState<Modals | null>(null)
  const [appointments, setAppointements] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null)

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
      setAppointements((prevAppointments) => [
        ...prevAppointments,
        newAppointement
      ])
    },
    []
  )

  const updateAppointment = useCallback(
    (newAppointement) => {
      const newAppointements = appointments.filter((appointment) => {
        return appointment.id !== newAppointement.id
      })

      setAppointements([newAppointement, ...newAppointements])
    },
    [appointments]
  )

  const deleteAppointment = useCallback((appointmentId: Appointment['id']) => {
    setAppointements((prevAppointments) => {
      return prevAppointments.filter(
        (appointment) => appointment.id !== appointmentId
      )
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
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

        <View>
          {appointments.length ? (
            <FlatList
              data={appointments}
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
          ) : (
            <Text style={styles.noAppointmentsMessage}>
              No hay citas por el momento.
            </Text>
          )}
        </View>
      </View>
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
    marginTop: 20
  }
})

export default App
