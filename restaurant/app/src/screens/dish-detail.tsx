import { View, Image, Heading, Text } from 'native-base'
import React from 'react'

export default function DishDetailScreen({ route }: DishDetailProps) {
  const { description, name, image } = route.params.dish
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
        <Heading>{name}</Heading>
        <Text>{description}</Text>
      </View>
    </View>
  )
}
