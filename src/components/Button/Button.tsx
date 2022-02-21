import React from 'react'
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'

// types
interface Props extends PressableProps {
  children: React.ReactNode
  color?: string
  backgroundColor?: string
  outline?: boolean
}

function Button({
  children,
  backgroundColor,
  color,
  outline,
  disabled,
  ...rest
}: Props) {
  const buttonStyles = outline ? { borderColor: color } : { backgroundColor }
  const disableStyles = disabled ? { opacity: 0.5 } : {}

  return (
    <Pressable
      style={[styles.container, buttonStyles, disableStyles]}
      disabled={disabled}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, { color }]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    marginVertical: 10
  },
  text: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16
  }
})

export default Button
