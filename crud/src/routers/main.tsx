import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { theme, View } from 'native-base'
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack'
import { Home, ClientDetail, NewClient } from '../views'

// types
import type { StackNavigationOptions } from '@react-navigation/stack'
import type { MainStackParamList } from '../types/global'
import { GoToCreateClientViewButton } from '../features/header'

const MainStack = createStackNavigator<MainStackParamList>()

const screenOptions: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureEnabled: true,
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  headerStyle: {
    backgroundColor: theme.colors.blueGray[800],
  },
  headerTitleAlign: 'center',
  headerTintColor: theme.colors.blueGray[50],
}

export function Main() {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={screenOptions}
        initialRouteName="Home"
      >
        <MainStack.Screen
          options={() => ({
            headerLeft: GoToCreateClientViewButton,
          })}
          name="Home"
          component={Home}
        />
        <MainStack.Screen
          options={{
            title: 'Client Detail',
          }}
          name="ClientDetail"
          component={ClientDetail}
        />
        <MainStack.Screen
          name="NewClient"
          options={({ route: { params } }) => ({
            title: params?.client
              ? `Edit "${params.client.name}"`
              : 'Add New Client',
          })}
          component={NewClient}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  )
}
