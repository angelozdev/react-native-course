import React, { useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native'

interface Props {
  onSearch: (city: string) => void | Promise<void>
  disabled?: boolean
  isLoading?: boolean
}

export function Form({ onSearch, disabled = false, isLoading = false }: Props) {
  const [city, setCity] = useState('bogotá')
  const isButtonDisabled = disabled || isLoading || !city || city.length < 3

  const handleSearch = async () => {
    await onSearch(city)
    setCity('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={city}
        onChangeText={setCity}
        style={styles.input}
        placeholder="Search a city"
        accessibilityRole="search"
        editable={!disabled}
      />

      <Pressable
        disabled={isButtonDisabled}
        onPress={handleSearch}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
          isButtonDisabled && styles.disabled,
        ]}
        accessibilityRole="button"
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.textButton}>Search</Text>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  input: {
    borderColor: 'lightgray',
    borderWidth: 1,
    paddingHorizontal: 14,
    borderRadius: 5,
    marginBottom: 14,
  },
  button: {
    padding: 14,
    borderRadius: 5,
    backgroundColor: 'slateblue',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  textButton: {
    color: 'white',
    paddingHorizontal: 14,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  pressed: {
    backgroundColor: 'rgba(89,75,190,1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
  },
})
