import React from 'react'
import { Button, FlatList, View } from 'native-base'
import { useAppDispatch, useAppSelector } from '@redux'
import CartItem from './cart-item'
import { useNavigation } from '@react-navigation/native'
import { emptyCart } from './cart.slice'

export default function CartList() {
  const navigation = useNavigation<NavigationProp>()
  const { items, count } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()

  React.useLayoutEffect(() => {
    if (!count) navigation.navigate('Menu')
  }, [count, navigation])

  return (
    <FlatList
      keyExtractor={({ id }) => id}
      data={items}
      renderItem={({ item }) => <CartItem {...item} />}
      ListFooterComponent={() => (
        <View p={4}>
          <Button
            onPress={() => dispatch(emptyCart())}
            bg="white"
            rounded="full"
            size="lg"
            variant="outline"
            colorScheme="gray"
            borderWidth={0}
          >
            Empty Cart
          </Button>
        </View>
      )}
    />
  )
}
