import React, { useCallback, useState } from 'react'
import { Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { AddAppointmentForm, Button } from './src/components'

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsModalOpened(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpened(false)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Administrador de citas{' '}
          <Text style={styles.titleBold}>Veterinaria</Text>
        </Text>

        <View>
          <Button
            onPress={handleOpenModal}
            color="white"
            backgroundColor="#6b21a8"
          >
            Nueva Cita
          </Button>
        </View>

        <View style={styles.modalContainer}>
          <Modal transparent animationType="slide" visible={isModalOpened}>
            <SafeAreaView style={styles.modalContent}>
              <AddAppointmentForm closeModal={handleCloseModal} />
            </SafeAreaView>
          </Modal>
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
  }
})

export default App
