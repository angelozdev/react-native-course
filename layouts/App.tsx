import React from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const carouselImages = [
  require('./src/assets/img/actividad1.jpg'),
  require('./src/assets/img/actividad2.jpg'),
  require('./src/assets/img/actividad3.jpg'),
  require('./src/assets/img/actividad4.jpg'),
  require('./src/assets/img/actividad5.jpg'),
]

const bestPlaces = [
  require('./src/assets/img/mejores1.jpg'),
  require('./src/assets/img/mejores2.jpg'),
  require('./src/assets/img/mejores3.jpg'),
]

const houses = [
  require('./src/assets/img/hospedaje1.jpg'),
  require('./src/assets/img/hospedaje2.jpg'),
  require('./src/assets/img/hospedaje3.jpg'),
  require('./src/assets/img/hospedaje4.jpg'),
]

function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.banner}>
          <Image
            height={200}
            accessibilityIgnoresInvertColors
            source={require('./src/assets/img/bg.jpg')}
            style={styles.bannerImage}
          />
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>¿Qué hacer en París?</Text>

          <ScrollView horizontal>
            <View style={styles.carousel}>
              {carouselImages.map((image, index) => (
                <Image
                  style={styles.carouselImage}
                  key={index}
                  accessibilityIgnoresInvertColors
                  source={image}
                  width={250}
                  height={350}
                />
              ))}
            </View>
          </ScrollView>

          <Text style={styles.title}>Los mejores alojamientos</Text>
          <View style={styles.bestPlaces}>
            {bestPlaces.map((image, index) => (
              <Image
                accessibilityIgnoresInvertColors
                source={image}
                key={index}
                style={styles.bestPlacesImage}
              />
            ))}
          </View>

          <Text style={styles.title}>Hospedajes</Text>
          <View style={styles.grid}>
            {houses.map((image, index) => (
              <Image
                accessibilityIgnoresInvertColors
                source={image}
                key={index}
                style={styles.item}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  banner: {
    height: 200,
  },
  body: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {},
  carousel: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    marginRight: 15,
  },
  bestPlacesImage: {
    width: '100%',
    resizeMode: 'cover',
    height: 200,
    marginBottom: 15,
  },
  bestPlaces: {
    marginVertical: 20,
  },
  grid: {
    marginVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
  item: {
    flexBasis: '48%',
    height: 180,
    resizeMode: 'cover',
    marginBottom: '4%',
  },
})

export default App
