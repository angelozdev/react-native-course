import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Pressable,
  PressableProps
} from 'react-native'

// utils
import { formatDate } from '../../utils'
import { Button } from '../Button'

// types
import { Appointment } from '../../types/global'
interface Props extends Appointment {
  openEditModal: (id: Appointment['id']) => void
  deleteAppointment: (id: Appointment['id']) => void
  onLongPress: PressableProps['onLongPress']
}

export function Appointement({
  date,
  deleteAppointment,
  id,
  onLongPress,
  openEditModal,
  ownerName,
  petName
}: Props) {
  const handleDeleteAppointment = () => {
    Alert.alert('Eliminar cita', '¿Estás seguro?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => deleteAppointment(id),
        style: 'destructive'
      }
    ])
  }

  return (
    <Pressable onLongPress={onLongPress}>
      <View style={styles.card}>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre de la mascota:</Text>
          <Text style={styles.text}>{petName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Nombre del dueño:</Text>
          <Text style={styles.text}>{ownerName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Fecha de la cita:</Text>
          <Text style={styles.text}>{formatDate(date)}</Text>
        </View>

        <View style={styles.buttons}>
          <Button
            onPress={() => openEditModal(id)}
            size="small"
            color="#ffffff"
            backgroundColor="#ea580c"
          >
            Editar
          </Button>
          <Button
            onPress={handleDeleteAppointment}
            size="small"
            color="#ffffff"
            backgroundColor="#dc2626"
          >
            Eliminar
          </Button>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#581c87',
    fontWeight: '800'
  },
  text: {
    fontWeight: '600',
    color: '#52525b',
    textTransform: 'none',
    fontSize: 16
  },
  field: {
    marginBottom: 10
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5
  }
})

export default Appointement
