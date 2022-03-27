import { formatCurrency } from '@features/menu/utils'
import {
  gettingOrders,
  gotOrdersSuccessfully,
  gotOrdersWithError,
} from '@features/orders/orders.slice'
import { useAppDispatch, useAppSelector } from '@redux'
import { ordersServices } from '@services'
import { View, Button, FlatList, Text, Box } from 'native-base'
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
          <Box
            p={4}
            bg="white"
            borderBottomWidth={1}
            borderBottomColor="gray.100"
          >
            <Text>{index + 1}</Text>
            <View>
              {item.items.map(({ name, id }) => (
                <Text key={id}>{name}</Text>
              ))}
            </View>

            <Text>{formatCurrency(item.total)}</Text>
          </Box>
        )}
        ListFooterComponent={() => (
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
