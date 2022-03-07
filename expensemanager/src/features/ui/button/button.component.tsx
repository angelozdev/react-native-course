import React from 'react'
import { Pressable, PressableProps, Text, StyleSheet } from 'react-native'

// types
interface Props extends PressableProps {
  children: string
  bgColor: string
  color: string
}

export function Button({ children, bgColor, disabled, color, ...rest }: Props) {
  return (
    <Pressable
      disabled={disabled}
      style={[
        styles.container,
        disabled ? styles.disabled : {},
        { backgroundColor: bgColor }
      ]}
      {...rest}
    >
      <Text style={[styles.text, { color }]}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  text: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  disabled: {
    opacity: 0.7
  }
})

export default Button
