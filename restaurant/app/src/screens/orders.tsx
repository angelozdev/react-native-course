import { OrderItem } from '@features/orders'
import {
  gettingOrders,
  gotOrdersSuccessfully,
  gotOrdersWithError,
} from '@features/orders/orders.slice'
import { useAppDispatch, useAppSelector } from '@redux'
import { ordersServices } from '@services'
import { View, Button, FlatList } from 'native-base'
import React from 'react'

export default function Orders({ navigation }: OrdersProps) {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.orders)

  React.useEffect(() => {
    dispatch(gettingOrders())
    const unsubscribe = ordersServices.getAllRT({
      onNext: (orders) => dispatch(gotOrdersSuccessfully(orders)),
      onError: (error) => dispatch(gotOrdersWithError(error)),
    })

    return () => unsubscribe()
  }, [dispatch])
  return (
    <View>
      <FlatList
        data={data.orders}
        keyExtractor={({ id }) => id}
        renderItem={({ item, index }) => (
          <OrderItem
            onPress={() => navigation.navigate('OrderDetail', { order: item })}
            index={index + 1}
            {...item}
          />
        )}
        ListHeaderComponent={() => (
          <View p={4}>
            <Button
              onPress={() => navigation.navigate('Menu')}
              bg="teal.500"
              _pressed={{ bg: 'teal.600' }}
              rounded="full"
            >
              Crear nueva orden
            </Button>
          </View>
        )}
      />
    </View>
  )
}
