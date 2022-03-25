import { Box, View, Skeleton, HStack, VStack } from 'native-base'
import React from 'react'

// types
interface Props {
  numberOfDishes: number
}

export default function DishListSkeleton({ numberOfDishes }: Props) {
  return (
    <View>
      {Array(numberOfDishes)
        .fill({})
        .map((_, index) => (
          <Box
            bg="white"
            p={4}
            borderBottomWidth={1}
            borderBottomColor="gray.200"
            key={index}
          >
            <HStack space={3}>
              <Skeleton rounded={4} w={100} h={100} />

              <VStack space={1} flexGrow={1}>
                <Skeleton rounded={4} mb={2} h={6} />
                <Skeleton.Text lines={2} />
              </VStack>
            </HStack>
          </Box>
        ))}
    </View>
  )
}
