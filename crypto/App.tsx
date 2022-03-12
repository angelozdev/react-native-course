import React from 'react'
import { SafeAreaView } from 'react-native'
import { NativeBaseProvider, View, Image, ScrollView } from 'native-base'
import { Header } from '@features/ui'
import { Form } from '@features/crypto-currency/'
const banner = require('@assets/img/cryptomonedas.png')

const App = () => {
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <Header />
        <ScrollView>
          <View px={4}>
            <Image
              w="full"
              resizeMode="contain"
              height="xs"
              alt="banner"
              accessibilityIgnoresInvertColors
              source={banner}
            />

            <Form onValuesChange={console.log} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

export default App
