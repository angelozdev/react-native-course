import React from 'react'
import { Image, Pressable, PressableProps, StyleSheet } from 'react-native'

// types
interface Props extends PressableProps {}

export function AddExpenseButton({ ...rest }: Props) {
  return (
    <Pressable {...rest} style={styles.button}>
      <Image
        style={styles.image}
        width={60}
        height={60}
        source={require('../../assets/nuevo-gasto.png')}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {},
  image: {
    width: '100%',
    height: '100%'
  }
})

export default AddExpenseButton
