import React from 'react'
import { Pressable, PressableProps, Text, StyleSheet } from 'react-native'

// types
interface Props extends PressableProps {
  children: string
}

export function Button({ children, ...rest }: Props) {
  return (
    <Pressable {...rest}>
      <Text>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({})

export default Button
