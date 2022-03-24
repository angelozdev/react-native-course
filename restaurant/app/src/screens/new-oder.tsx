import { View, Text } from 'react-native'
import React from 'react'
import { FIREBASE_CONFIG } from '@env'

export default function NewOrderScreen() {
  return (
    <View>
      <Text>{FIREBASE_CONFIG}</Text>
    </View>
  )
}
