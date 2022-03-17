import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

// pages
import {Home, Us} from './src/pages';

//types
import type {RootStackParamList} from './src/types/global';

const Stack = createStackNavigator<RootStackParamList>();

const stackNavigationOptions: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  gestureEnabled: true,
  headerStyle: {
    backgroundColor: 'rebeccapurple',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: '100',
  },
  headerTitleAlign: 'center',
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={stackNavigationOptions}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          options={({route}) => ({
            title: 'Hello, ' + route.params.name + '!',
          })}
          name="Us"
          component={Us}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
