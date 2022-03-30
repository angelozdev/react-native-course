import React from 'react'
import { View, Skeleton, HStack, VStack } from 'native-base'

// types
interface Props {
  numberOfItems?: number
}

export default function OrderListSkeleton({ numberOfItems = 5 }: Props) {
  return (
    <View>
      <View p={4}>
        <Skeleton rounded="full" />
      </View>

      <View>
        {Array.from({ length: numberOfItems }).map((_, index) => (
          <View
            key={index}
            p={4}
            bg="white"
            borderBottomWidth={1}
            borderColor="gray.100"
          >
            <VStack space={2}>
              <Skeleton h={6} w="2/3" rounded="md" />

              {Array.from({ length: 3 }).map((__, i) => (
                <HStack flexGrow={1} key={i} space={3} alignItems="center">
                  <Skeleton width={25} height={25} />
                  <View flexGrow={1}>
                    <Skeleton.Text lines={1} />
                  </View>
                </HStack>
              ))}
              <Skeleton h={4} w="1/3" rounded="md" />
            </VStack>
          </View>
        ))}
      </View>
    </View>
  )
}
