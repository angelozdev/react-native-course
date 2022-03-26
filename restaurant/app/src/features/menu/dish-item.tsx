import {
  Text,
  HStack,
  Image,
  VStack,
  Heading,
  Box,
  Pressable,
  View,
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
          borderBottomColor="gray.200"
          p="4"
          flex={1}
        >
          <HStack flexGrow={1} space={3}>
            <View flexGrow={0}>
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
            </View>
            <VStack flexGrow={1} maxW="3/4" space={1}>
              <Heading color="gray.700" fontSize="md">
                {name}
              </Heading>
              <Text numberOfLines={1} color="gray.500">
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
