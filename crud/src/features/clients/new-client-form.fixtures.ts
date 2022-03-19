import type { KeyboardTypeOptions } from 'react-native'
import { NewClientValues } from '../../types/global'

interface Field {
  name: NewClientValues
  label: string
  placeholder: string
  keyboardType: KeyboardTypeOptions
}

export const fields: Field[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'John Doe',
    keyboardType: 'default',
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: '+1 (123) 456-7890',
    keyboardType: 'phone-pad',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'email@mail.com',
    keyboardType: 'email-address',
  },
  {
    name: 'company',
    label: 'Company',
    placeholder: 'Organization name',
    keyboardType: 'default',
  },
]
