type StackScreenProps<T> = import('@react-navigation/stack').StackScreenProps<
  RootStackParamList,
  T
>
type NavigationProp =
  import('@react-navigation/native').NavigationProp<RootStackParamList>

type RootStackParamList = {
  NewOrder: undefined
  Menu: undefined
  DishDetail: { dish: Dish }
}

type NewOrderProps = StackScreenProps<'NewOrder'>
type DishDetailProps = StackScreenProps<'DishDetail'>
