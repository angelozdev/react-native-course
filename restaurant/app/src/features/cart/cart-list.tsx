import React from 'react'
import { Button, FlatList, Text, View } from 'native-base'
import { useAppDispatch, useAppSelector } from '@redux'
import CartItem from './cart-item'
import { useNavigation } from '@react-navigation/native'
import { emptyCart } from './cart.slice'
import { formatCurrency } from '@features/menu/utils'
import { ordersServices } from '@services'

export default function CartList() {
  const navigation = useNavigation<NavigationProp>()
  const [isLoading, setIsLoading] = React.useState(false)
  const cart = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const { items, count, total } = cart

  const handleOrder = async () => {
    setIsLoading(true)
    await ordersServices.addOrder(cart)
    setIsLoading(false)
    dispatch(emptyCart())
  }

  React.useLayoutEffect(() => {
    if (!count) navigation.navigate('Orders')
  }, [count, navigation])

  return (
    <View flexGrow={1} position="relative" pb={20}>
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

      <View p={4} bg="white" position="absolute" bottom={0} right={0} left={0}>
        <Button
          isLoading={isLoading}
          onPress={handleOrder}
          shadow="4"
          size="lg"
          colorScheme="success"
          rounded="full"
        >
          <Text fontSize="xl" fontWeight="semibold" color="white">
            Order {formatCurrency(total)}
          </Text>
        </Button>
      </View>
    </View>
  )
}
