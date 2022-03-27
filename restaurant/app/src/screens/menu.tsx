import React from 'react'
import { Heading, SectionList, View } from 'native-base'

import { menuServices } from '@services'
import { useAppDispatch, useAppSelector } from '@redux'
import {
  getDishesSuccessfully,
  getDishesWithError,
} from '@features/menu/dishes.slice'
import { DishItem, DishListSkeleton } from '@features/menu'
import { useNavigation } from '@react-navigation/native'

export default function MenuScreen() {
  const {
    data: { dishesGroupedByCategory },
    isLoading,
  } = useAppSelector((state) => state.dishes)
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NavigationProp>()

  const onPressDish = React.useCallback(
    (dish: Dish) => {
      navigation.navigate('DishDetail', { dish })
    },
    [navigation],
  )

  React.useEffect(() => {
    const unsubscribe = menuServices.getDishesRT({
      onSuccess: (newDishes) => {
        dispatch(getDishesSuccessfully(newDishes))
      },
      onError: (error) => dispatch(getDishesWithError(error)),
    })

    return () => unsubscribe?.()
  }, [dispatch])

  if (isLoading) {
    return <DishListSkeleton numberOfDishes={5} />
  }

  return (
    <SectionList
      sections={Object.entries(dishesGroupedByCategory).map(
        ([category, dishesWithoutCategory]) => {
          return {
            title: category,
            data: dishesWithoutCategory,
          }
        },
      )}
      keyExtractor={(item) => item.id}
      renderSectionHeader={({ section }) => (
        <View px={4} mb={2} mt={6}>
          <Heading fontSize="sm" color="gray.500" textTransform="uppercase">
            {section.title}
          </Heading>
        </View>
      )}
      renderItem={({ item, section }) => {
        const { description, image, name, price } = item
        return (
          <DishItem
            onPress={() => onPressDish({ category: section.title, ...item })}
            description={description}
            image={image}
            name={name}
            price={price}
          />
        )
      }}
    />
  )
}
