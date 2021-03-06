import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native'
import {
  NativeBaseProvider,
  View,
  Image,
  ScrollView,
  Text,
  Box,
  Spinner,
} from 'native-base'
import { Header } from '@features/ui'
import { Form } from '@features/crypto-currency/'
import { getPrices } from '@services/cryptocurrencies'
const banner = require('@assets/img/cryptomonedas.png')

const App = () => {
  const [info, setInfo] = React.useState<{
    selectedCrypto: string
    prices: Array<{ price: number; currency: Currencies }>
  }>({
    selectedCrypto: '',
    prices: [],
  })
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSearchPrice = useCallback(async ({ cryptocurrency }: Values) => {
    if (!cryptocurrency) return
    setIsLoading(true)
    const data = await getPrices({ cryptocurrency })
    const prices = Object.entries(data).map<{
      price: number
      currency: Currencies
    }>(([key, value]) => ({
      price: value,
      currency: key as Currencies,
    }))

    setIsLoading(false)
    setInfo({ selectedCrypto: cryptocurrency, prices })
  }, [])

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

            <Form
              isLoading={isLoading}
              onSubmit={handleSearchPrice}
              onValuesChange={handleSearchPrice}
            />
          </View>
          {(!!info.selectedCrypto || isLoading) && (
            <Box mb={20} mt={4} mx={1}>
              <View bg="purple.700" borderRadius={8} shadow={4} p={4}>
                {isLoading && (
                  <Spinner
                    accessibilityHint="loading prices"
                    accessibilityLabel="loading prices"
                    size="lg"
                    color="white"
                  />
                )}

                {!!info.selectedCrypto && (
                  <Text fontSize="2xl" fontWeight="bold" mb={2} color="white">
                    {info.selectedCrypto}
                  </Text>
                )}

                {info.prices.map(({ currency, price }) => (
                  <Box key={currency}>
                    <Text color="white">
                      <Text>{currency} - </Text>
                      <Text fontWeight="semibold">
                        {price.toLocaleString('en-US', {
                          currency,
                          style: 'currency',
                          currencyDisplay: 'symbol',
                        })}
                      </Text>
                    </Text>
                  </Box>
                ))}
              </View>
            </Box>
          )}
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

export default App
