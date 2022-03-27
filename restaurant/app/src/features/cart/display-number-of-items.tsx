import React from 'react'
import { useAppSelector } from '@redux'
import { Button, HStack, Text, View } from 'native-base'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

export default function DisplayNumberOfItems() {
  const navigation = useNavigation<NavigationProp>()
  const count = useAppSelector((state) => state.cart.count)

  const handlePress = () => {
    navigation.navigate('Basket')
  }

  if (!count) return null

  return (
    <Button
      onPress={handlePress}
      _pressed={{ bg: 'teal.600' }}
      mx={2}
      bg="teal.500"
      px={3}
      py={1}
      rounded="full"
    >
      <HStack justifyContent="center" alignItems="center" space={2}>
        <Feather color="white" size={14} name="shopping-cart" />
        <View>
          <Text fontWeight="semibold" color="white" fontSize="xs">
            {count}
          </Text>
        </View>
      </HStack>
    </Button>
  )
}
