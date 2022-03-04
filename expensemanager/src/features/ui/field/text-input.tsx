import React from 'react'
import { StyleSheet, TextInput as Input, TextInputProps } from 'react-native'
import { colors } from '../../../theme/colors'

// types
interface Props extends TextInputProps {}

export function TextInput({ style, ...rest }: Props) {
  return <Input style={[styles.input, style]} {...rest} />
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.stone[100],
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8
  }
})

export default TextInput
