import React from 'react'
import { View, Text, Image, HStack, VStack } from 'native-base'
import { formatCurrency, formatDate } from '@features/menu/utils'

export default function OrderDetailScreen(props: OrderDetailProps) {
  const { route } = props
  const { order } = route.params
  const { items, total, updatedAt, createdAt } = order

  return (
    <View>
      <View p={4}>
        <Text fontSize="sm" fontWeight="bold">
          {items.length} items
        </Text>
      </View>

      <View>
        {items.map(({ id, name, image, price, quantity, category }) => (
          <View
            key={id}
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
