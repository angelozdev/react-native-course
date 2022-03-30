import React from 'react'
import { formatCurrency } from '@features/menu/utils'
import { View, Text, Box, Pressable, Image, HStack } from 'native-base'
import { colorByStatus } from './utils'

// types
interface Props extends Order {
  index: number
  onPress: () => void
}

export default function OrderItem(props: Props) {
  const { index, status, total, items, onPress } = props
  return (
    <Pressable onPress={onPress} accessibilityRole="link">
      {({ isPressed }) => (
        <Box
          p={4}
          bg={isPressed ? 'gray.50' : 'white'}
          borderBottomWidth={1}
          borderBottomColor="gray.100"
        >
          <Text textTransform="uppercase" fontSize="sm" fontWeight="semibold">
            <Text>orden #{index}</Text>{' '}
            <Text color={colorByStatus[status]}>- {status}</Text>
          </Text>
          <View my="2">
            {items.map(({ name, id: productId, image, quantity }) => (
              <ProductItem
                key={productId}
                name={name}
                image={image}
                quantity={quantity}
              />
            ))}
          </View>

          <Text fontWeight="semibold">Total: {formatCurrency(total)}</Text>
        </Box>
      )}
    </Pressable>
  )
}

function ProductItem(props: Partial<CartItem>) {
  const { name, image, quantity } = props
  return (
    <View p={1}>
      <HStack space={2} alignItems="center">
        {!!image && (
          <Image
            rounded="md"
            accessibilityIgnoresInvertColors
            alt={name}
            width={25}
            height={25}
            source={{
              uri: image,
              width: 25,
              height: 25,
            }}
          />
        )}
        <Text>
          <Text>{name}</Text>{' '}
          <Text fontWeight="medium" fontSize="xs">
            (x{quantity})
          </Text>
        </Text>
      </HStack>
    </View>
  )
}
