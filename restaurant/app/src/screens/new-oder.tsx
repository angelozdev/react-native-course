import { View, Button } from 'native-base'
import React from 'react'

export default function NewOrderScreen({ navigation }: NewOrderProps) {
  return (
    <View p={4}>
      <Button
        onPress={() => navigation.navigate('Menu')}
        bg="teal.500"
        _pressed={{ bg: 'teal.600' }}
        rounded="md"
      >
        Crear nueva orden
      </Button>
    </View>
  )
}
