import React, { useCallback, useState } from 'react'
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { AppointmentForm, Appointement, Button } from './src/components'

// utils
import { Appointment } from './src/types/global'

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [appointments, setAppointements] = useState<Appointment[]>([])
  const [updatedAppointment, setUpdatedAppointment] = useState<Appointment>()

  const openModal = useCallback(() => {
    setIsModalOpened(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpened(false)
    setUpdatedAppointment(undefined)
  }, [])

  const openEditModal = useCallback(
    (id: Appointment['id']) => {
      const appointment = appointments.find((a) => id === a.id)
      setUpdatedAppointment(appointment)
      openModal()
    },
    [openModal, appointments]
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

        <View>
          <Button onPress={openModal} color="white" backgroundColor="#6b21a8">
            Nueva Cita
          </Button>
        </View>

        <View style={styles.modalContainer}>
          <Modal transparent animationType="slide" visible={isModalOpened}>
            <SafeAreaView style={styles.modalContent}>
              <AppointmentForm
                initialValues={updatedAppointment}
                addNewAppointment={addNewAppointment}
                updateAppointment={updateAppointment}
                closeModal={closeModal}
              />
            </SafeAreaView>
          </Modal>
        </View>

        <View>
          {appointments.length ? (
            <FlatList
              data={appointments}
              renderItem={({ item }) => (
                <Appointement
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalContent: {
    flex: 1
  },
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
  }
})

export default App
