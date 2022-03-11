import React from 'react'
import { SafeAreaView, Text, StyleSheet, Image, View } from 'react-native'
import { Header } from '@features/ui'
const banner = require('@assets/img/cryptomonedas.png')

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header />

        <View style={styles.content}>
          <Image
            style={styles.banner}
            accessibilityIgnoresInvertColors
            source={banner}
          />

          <Text>Criptomonedas</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 30,
  },
  banner: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  container: {},
  content: {
    marginHorizontal: '2%',
  },
})

export default App
