import React, { useRef, useState } from 'react'
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { getByCity } from '@services/weather'
import type { WeatherResponse } from 'types'
import { Form } from '@components'

const getBGByTemperature = (temperature: number) => {
  if (temperature < 20) {
    return '#2196f3'
  }
  if (temperature < 30) {
    return '#ff9800'
  }
  if (temperature > 50) {
    return '#f44336'
  }
}

function App() {
  const [data, setData] = useState<WeatherResponse>()
  const [isLoading, setIsLoading] = useState(false)
  const { current: fadeAnim } = useRef(new Animated.Value(0))

  const handleSearch = async (city: string) => {
    fadeOut()
    setIsLoading(true)
    getByCity(city)
      .then((response) => {
        setData(response)
      })
      .finally(() => {
        setIsLoading(false)
        fadeIn()
      })
  }

  const fadeIn = () => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const fadeOut = () => {
    Animated.spring(fadeAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Weather App</Text>

          <Form
            onSearch={handleSearch}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </View>
        {!!data && (
          <Animated.View
            style={[
              styles.infoCard,
              {
                backgroundColor: getBGByTemperature(data?.main.temp || 0),
                opacity: fadeAnim,
              },
            ]}
          >
            <View style={styles.infoHeader}>
              <Image
                style={styles.icon}
                accessibilityIgnoresInvertColors
                width={40}
                height={40}
                source={{
                  uri:
                    'http://openweathermap.org/img/w/' +
                    data.weather[0].icon +
                    '.png',
                }}
              />

              <Text style={styles.infoText}>- {data.name} -</Text>

              <Image
                style={styles.icon}
                accessibilityIgnoresInvertColors
                width={40}
                height={40}
                source={{
                  uri:
                    'http://openweathermap.org/img/w/' +
                    data.weather[0].icon +
                    '.png',
                }}
              />
            </View>
            <Text style={styles.infoDescription}>
              {data.weather[0].main} - {data.weather[0].description}
            </Text>

            <Text style={styles.infoDescription}>
              LATITUTD: {data.coord.lat}
            </Text>

            <Text style={styles.infoDescription}>
              LONGITUDE: {data.coord.lon}
            </Text>

            <Text style={styles.infoDescription}>
              TEMPERATURE: {data.main.temp}C°
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'slateblue',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    flexGrow: 1,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  infoText: {
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
    marginLeft: 20,
    marginRight: 20,
    fontWeight: '600',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoDescription: {
    color: 'white',
    fontSize: 16,
    textTransform: 'capitalize',
  },
})

export default App
