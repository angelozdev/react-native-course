import { formatCurrency } from '@features/menu/utils'
import { View, Image, Heading, Text } from 'native-base'
import React from 'react'

export default function DishDetailScreen({ route }: DishDetailProps) {
  const { description, name, image, category, price } = route.params.dish
  return (
    <View>
      {!!image && (
        <Image
          alt={name}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          w="100%"
          h={300}
          source={{
            uri: image,
            width: 300,
            height: 300,
          }}
        />
      )}
      <View p={4}>
        <Heading fontWeight="medium" fontSize="lg">
          <Text>{name}</Text>{' '}
          <Text color="coolGray.400" fontWeight="semibold">
            ({category})
          </Text>
        </Heading>
        <Text>{description}</Text>

        <Text fontSize="2xl" fontWeight="semibold" color="orange.700">
          {formatCurrency(price)}
        </Text>
      </View>
    </View>
  )
}
