import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { NativeBaseProvider } from 'native-base'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from '@redux'
import {
  MenuScreen,
  NewOrderScreen,
  DishDetailScreen,
  BasketScreen,
} from '@screens'
import { DisplayNumberOfItems } from '@features/cart'

const Stack = createStackNavigator<RootStackParamList>()

const screenOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureEnabled: true,
  headerRight: () => <DisplayNumberOfItems />,
}

function App() {
  return (
    <NativeBaseProvider>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
              options={{ title: 'Nueva Orden' }}
              name="NewOrder"
              component={NewOrderScreen}
            />

            <Stack.Screen
              options={{
                title: 'Menú',
              }}
              name="Menu"
              component={MenuScreen}
            />

            <Stack.Screen
              options={({ route }) => ({
                title: route.params.dish.name,
                headerTitleStyle: {
                  textTransform: 'uppercase',
                  fontSize: 12,
                  maxWidth: 200,
                },
              })}
              name="DishDetail"
              component={DishDetailScreen}
            />

            <Stack.Screen
              component={BasketScreen}
              name="Basket"
              options={{
                title: 'Tu cesta',
                headerRight: undefined,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ReduxProvider>
    </NativeBaseProvider>
  )
}

export default App
