import { KeyboardTypeOptions, TextInputProps } from 'react-native'
import { DatePickerProps } from 'react-native-date-picker'

type Field = {
  label: string
  id: string
  placeholder: string
  keyboardType: KeyboardTypeOptions
  inputProps?: Partial<DatePickerProps> | TextInputProps
  inputType: 'text' | 'date'
}

export const fields: Field[] = [
  {
    label: 'Nombre de mi mascota',
    placeholder: 'Aileen',
    keyboardType: 'default',
    id: 'petName',
    inputType: 'text'
  },
  {
    label: 'Nombre del dueño',
    placeholder: 'John Doe',
    keyboardType: 'default',
    id: 'ownerName',
    inputType: 'text'
  },
  {
    label: 'Correo electrónico',
    placeholder: 'email@mail.com',
    keyboardType: 'email-address',
    id: 'email',
    inputType: 'text'
  },
  {
    label: 'Número de teléfono',
    placeholder: '+1 (123) 456-7890',
    keyboardType: 'phone-pad',
    id: 'phone',
    inputProps: { maxLength: 13 },
    inputType: 'text'
  },
  {
    id: 'date',
    label: 'Fecha',
    placeholder: 'Selecciona una fecha',
    keyboardType: 'default',
    inputType: 'date',
    inputProps: {
      minimumDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      mode: 'date'
    }
  },
  {
    label: 'Síntomas',
    placeholder: 'Ej: fiebre, dolor de cabeza, etc.',
    keyboardType: 'default',
    id: 'symptoms',
    inputProps: { numberOfLines: 4, multiline: true, textAlignVertical: 'top' },
    inputType: 'text'
  }
]
