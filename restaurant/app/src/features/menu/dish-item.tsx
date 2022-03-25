import {
  Text,
  HStack,
  Image,
  VStack,
  Heading,
  Box,
  Pressable,
} from 'native-base'
import React from 'react'
import { formatCurrency } from './utils'

// types
interface Props {
  name: Dish['name']
  price: Dish['price']
  image: Dish['image']
  description: Dish['description']
  onPress?: () => void
}

export default function DishItem({
  name,
  image,
  description,
  price,
  onPress,
}: Props) {
  return (
    <Pressable accessibilityRole="link" onPress={onPress}>
      {({ isPressed }) => (
        <Box
          bg={isPressed ? 'gray.50' : 'white'}
          borderBottomWidth={1}
          p="4"
          borderColor="gray.200"
          flex={1}
        >
          <HStack space={3}>
            {!!image && (
              <Image
                borderRadius={4}
                alt={name}
                resizeMode="cover"
                accessibilityIgnoresInvertColors
                source={{
                  uri: image,
                  width: 100,
                  height: 100,
                }}
              />
            )}
            <VStack space={1}>
              <Heading color="gray.700" fontSize="md">
                {name}
              </Heading>
              <Text numberOfLines={2} color="gray.500">
                {description}
              </Text>
              <Text fontWeight="bold" color="orange.700">
                {formatCurrency(price)}
              </Text>
            </VStack>
          </HStack>
        </Box>
      )}
    </Pressable>
  )
}
