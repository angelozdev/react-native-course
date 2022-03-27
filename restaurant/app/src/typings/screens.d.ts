type StackScreenProps<T> = import('@react-navigation/stack').StackScreenProps<
  RootStackParamList,
  T
>
type NavigationProp =
  import('@react-navigation/native').NavigationProp<RootStackParamList>

type RootStackParamList = {
  Basket: undefined
  DishDetail: { dish: Dish }
  Menu: undefined
  Orders: undefined
}

type OrdersProps = StackScreenProps<'Orders'>
type DishDetailProps = StackScreenProps<'DishDetail'>
