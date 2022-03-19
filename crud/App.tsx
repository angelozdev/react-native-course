import 'react-native-gesture-handler'
import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { MainRouter } from './src/routers'

const App = () => {
  return (
    <NativeBaseProvider>
      <MainRouter />
    </NativeBaseProvider>
  )
}

export default App
