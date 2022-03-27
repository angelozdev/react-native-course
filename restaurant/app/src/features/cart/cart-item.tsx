import React from 'react'
import { formatCurrency } from '@features/menu/utils'
import {
  View,
  Text,
  HStack,
  Image,
  VStack,
  Pressable,
  IPressableProps,
} from 'native-base'
import Feather from 'react-native-vector-icons/Feather'
import { increaseQuantity, decreaseQuantity } from '@features/cart/cart.slice'
import { useAppDispatch } from '@redux'
import { useNavigation } from '@react-navigation/native'

export default function CartItem(props: CartItem) {
  const navigation = useNavigation<NavigationProp>()
  const dispatch = useAppDispatch()
  const { name, image, price, id, quantity } = props
  const formattedPrice = formatCurrency(price * quantity)

  return (
    <View
      bg="white"
      borderBottomColor="gray.200"
      p={4}
      borderBottomWidth={1}
      key={id}
      flexGrow={1}
    >
      <HStack space={4}>
        <Pressable
          accessibilityRole="link"
          onPress={() => navigation.navigate('DishDetail', { dish: props })}
          _pressed={{ opacity: 0.8, shadow: '2' }}
        >
          {!!image && (
            <Image
              rounded="lg"
              alt={name}
              accessibilityIgnoresInvertColors
              source={{
                uri: image,
                width: 70,
                height: 70,
              }}
            />
          )}
        </Pressable>

        <VStack flexGrow={1} justifyContent="center">
          <Text>{name}</Text>
          <Text fontWeight="bold">{formattedPrice}</Text>
        </VStack>

        <View justifyContent="center">
          <HStack space={2}>
            <CircleButton onPress={() => dispatch(decreaseQuantity(id))}>
              <Feather
                color={quantity > 1 ? 'black' : 'red'}
                name={quantity > 1 ? 'minus' : 'trash'}
                size={14}
              />
            </CircleButton>
            <View justifyContent="center">
              <Text fontSize="xs">{quantity}</Text>
            </View>
            <CircleButton onPress={() => dispatch(increaseQuantity(id))}>
              <Feather color="black" name="plus" size={14} />
            </CircleButton>
          </HStack>
        </View>
      </HStack>
    </View>
  )
}

function CircleButton({ children, ...rest }: IPressableProps) {
  return (
    <Pressable
      p={2}
      _pressed={{ bg: 'gray.100' }}
      borderColor="gray.100"
      borderWidth={1}
      rounded="full"
      {...rest}
    >
      {children}
    </Pressable>
  )
}
