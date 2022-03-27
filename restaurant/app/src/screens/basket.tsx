import { CartList } from '@features/cart'
import { View } from 'native-base'
import React from 'react'

export default function Basket() {
  return (
    <View flexGrow={1}>
      <CartList />
    </View>
  )
}
