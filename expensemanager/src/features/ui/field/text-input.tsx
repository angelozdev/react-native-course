import React from 'react'
import { StyleSheet, TextInput as Input, TextInputProps } from 'react-native'
import { inputStyles } from './input.styles'

// types
interface Props extends TextInputProps {}

export function TextInput({ style, ...rest }: Props) {
  return <Input style={[styles.input, style]} {...rest} />
}

const styles = StyleSheet.create({
  input: inputStyles
})

export default TextInput
