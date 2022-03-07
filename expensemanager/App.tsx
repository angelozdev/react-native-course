import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Home } from '@pages'
import 'intl'
import 'intl/locale-data/jsonp/en-US'
import 'intl/locale-data/jsonp/es-ES'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 }
})

export default App
