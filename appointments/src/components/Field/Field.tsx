import React from 'react'
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from 'react-native'

import DatePicker, { DatePickerProps } from 'react-native-date-picker'

// types
interface Props {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  keyboardType?: KeyboardTypeOptions
  inputType: 'text' | 'date'
  inputProps?: TextInputProps | DatePickerProps
}

export default function Field({
  label,
  inputType = 'text',
  placeholder,
  keyboardType,
  value,
  inputProps,
  onChange
}: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {inputType === 'text' ? (
        <TextInput
          keyboardType={keyboardType}
          placeholder={placeholder}
          style={styles.input}
          value={value}
          onChangeText={onChange}
          {...inputProps}
        />
      ) : inputType === 'date' ? (
        <DatePicker
          onDateChange={(date) => onChange(date.toISOString())}
          locale="es"
          date={new Date(value)}
          {...inputProps}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 25
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    borderColor: '#d8b4fe',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15
  }
})
