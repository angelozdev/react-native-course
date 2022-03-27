import React from 'react'
import { View, Image, Heading, Text } from 'native-base'

import { useAppDispatch } from '@redux'
import { AddToCartSection } from '@features/menu'
import { formatCurrency } from '@features/menu/utils'
import { addDishToCart } from '@features/cart/cart.slice'

export default function DishDetailScreen(props: DishDetailProps) {
  const { route, navigation } = props
  const { dish } = route.params
  const { description, name, image, category, price } = dish
  const formattedPrice = formatCurrency(price)
  const disptach = useAppDispatch()

  const handleAddToCart = (quantity: number) => {
    disptach(addDishToCart({ ...dish, quantity }))
    navigation.navigate('Menu')
  }

  return (
    <View flexGrow={1}>
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

        <Text fontSize="3xl" fontWeight="bold" color="orange.700">
          {formattedPrice}
        </Text>
      </View>

      <View bg="white" left={0} right={0} p={4} position="absolute" bottom={0}>
        <AddToCartSection onAddToCart={handleAddToCart} price={price} />
      </View>
    </View>
  )
}
