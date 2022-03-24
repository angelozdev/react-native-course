import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from './src/redux'
import { NewOrderScreen } from '@screens'

const Stack = createStackNavigator<RootStackParamList>()

function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="NewOrder" component={NewOrderScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  )
}

export default App
