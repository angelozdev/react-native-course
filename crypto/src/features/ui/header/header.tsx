import React from 'react'
import { Text, View } from 'native-base'

export function Header() {
  return (
    <View p={3} borderBottomColor="gray.200" borderBottomWidth={1}>
      <Text fontSize="xl" textAlign="center">
        Cryptocurrency
      </Text>
    </View>
  )
}
