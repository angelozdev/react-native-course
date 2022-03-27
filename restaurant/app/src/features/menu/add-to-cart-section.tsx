import React from 'react'
import { Button, HStack, Pressable, Text, View } from 'native-base'
import Feather from 'react-native-vector-icons/Feather'
import { formatCurrency } from './utils'

// types
interface Props {
  price: Dish['price']
  onAddToCart?: (quantity: number) => void
}

export default function AddToCartSection({ price, onAddToCart }: Props) {
  const [quantity, setQuantity] = React.useState(1)
  const formattedPrice = formatCurrency(price * quantity)

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity >= 10) return prevQuantity
      return prevQuantity + 1
    })
  }

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity <= 1) return prevQuantity
      return prevQuantity - 1
    })
  }

  return (
    <HStack space={2}>
      <HStack space={4} rounded="full" borderColor="gray.100" borderWidth={1}>
        <Pressable
          flexGrow={1}
          accessibilityRole="button"
          accessibilityLabel="decrease"
          accessibilityHint="Decrease quantity"
          justifyContent="center"
          _pressed={{ bg: 'gray.100' }}
          rounded="full"
          p={4}
          onPress={handleDecreaseQuantity}
          onLongPress={() => setQuantity(1)}
        >
          <Feather color="black" size={16} name="minus" />
        </Pressable>

        <View justifyContent="center">
          <Text>{quantity}</Text>
        </View>

        <Pressable
          onPress={handleIncreaseQuantity}
          onLongPress={() => setQuantity(10)}
          rounded="full"
          p={4}
          _pressed={{ bg: 'gray.100' }}
          flexGrow={1}
          accessibilityRole="button"
          accessibilityLabel="increase"
          accessibilityHint="Increase quantity"
          justifyContent="center"
        >
          <Feather color="black" size={16} name="plus" />
        </Pressable>
      </HStack>
      <Button
        onPress={() => onAddToCart?.(quantity)}
        rounded="full"
        _pressed={{ bg: 'green.600' }}
        bg="green.500"
        flexGrow={1}
        accessibilityLabel="add to cart"
        accessibilityHint="Add to cart"
      >
        <Text color="white">Agregar {formattedPrice}</Text>
      </Button>
    </HStack>
  )
}
