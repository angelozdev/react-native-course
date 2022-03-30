import React from 'react'
import { View, Text, Image, HStack, VStack } from 'native-base'
import { formatCurrency, formatDate } from '@features/menu/utils'
import { ordersServices } from '@services'
import { colorByStatus } from '../features/orders/utils'

export default function OrderDetailScreen(props: OrderDetailProps) {
  const { route, navigation } = props
  const { order } = route.params
  const { items, total, updatedAt, createdAt, id, status } = order

  React.useEffect(() => {
    const unsubscribe = ordersServices.getByIdRT(id, {
      onNext: (orderFromServer) =>
        navigation.setParams({ order: orderFromServer || order }),
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View>
      <View p={4}>
        <Text fontSize="sm" fontWeight="bold">
          {items.length} items
        </Text>

        <Text
          color={colorByStatus[status]}
          textTransform="uppercase"
          fontSize="xs"
          fontWeight="bold"
        >
          {status}
        </Text>
      </View>

      <View>
        {items.map(({ id: itemId, name, image, price, quantity, category }) => (
          <View
            key={itemId}
            p={4}
            bg="white"
            borderBottomWidth={1}
            borderColor="gray.100"
          >
            <HStack space={3} alignItems="center">
              {!!image && (
                <Image
                  alt={name}
                  rounded="md"
                  accessibilityIgnoresInvertColors
                  source={{
                    uri: image,
                    width: 100,
                    height: 100,
                  }}
                />
              )}

              <VStack>
                <Text fontSize="xs" textTransform="uppercase" fontWeight="bold">
                  {category}
                </Text>
                <Text>
                  <Text>{name}</Text>{' '}
                  <Text fontWeight="semibold" fontSize="xs">
                    (x{quantity})
                  </Text>
                </Text>
                <Text fontWeight="bold">
                  {formatCurrency(price * quantity)}
                </Text>
              </VStack>
            </HStack>
          </View>
        ))}
      </View>

      <View p={4}>
        <Text fontSize="2xl" fontWeight="semibold">
          Total: {formatCurrency(total)}
        </Text>

        <Text fontSize="xs" color="gray.400">
          Fecha de creación: {formatDate(createdAt)}
        </Text>

        <Text fontSize="xs" color="gray.400">
          Última actualización: {formatDate(updatedAt)}
        </Text>
      </View>
    </View>
  )
}
