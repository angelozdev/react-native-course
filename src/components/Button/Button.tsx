import React from 'react'
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle
} from 'react-native'

// types
type Sizes = 'small' | 'medium' | 'large'
interface Props extends PressableProps {
  children: React.ReactNode
  color?: string
  backgroundColor?: string
  outline?: boolean
  size?: Sizes
}

function Button({
  children,
  backgroundColor,
  color,
  outline,
  disabled,
  size = 'medium',
  ...rest
}: Props) {
  const buttonStyles = outline ? { borderColor: color } : { backgroundColor }
  const disableStyles = disabled ? { opacity: 0.5 } : {}
  const sizesStyles: Record<Sizes, ViewStyle> = {
    small: {
      paddingVertical: 4,
      paddingHorizontal: 10
    },
    medium: {
      paddingVertical: 10,
      paddingHorizontal: 20
    },
    large: {
      paddingVertical: 15,
      paddingHorizontal: 30
    }
  }

  return (
    <Pressable
      style={[styles.container, buttonStyles, disableStyles, sizesStyles[size]]}
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
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    minWidth: 100
  },
  text: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 14
  }
})

export default Button
