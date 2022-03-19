import { Input, Stack, FormControl, Button } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import React from 'react'

// utils
import { fields } from './new-client-form.fixtures'

// types
import type { Client, NewClient, NewClientValues } from '../../types/global'
interface Props {
  onValuesChange?: (values: NewClient) => void
  onSubmit: (values: NewClient) => void | Promise<void>
  isLoading?: boolean
  initialValues?: Client
}

const defaultValues: NewClient = {
  name: '',
  email: '',
  phone: '',
  company: '',
}

export function NewClientForm({
  onValuesChange,
  onSubmit,
  isLoading = false,
  initialValues,
}: Props) {
  const [values, setValues] = React.useState<NewClient | Client>({
    ...defaultValues,
    ...(initialValues || {}),
  })
  const areValidValues = Object.values(values).every(Boolean)
  const isEditMode = !!initialValues

  const handleInputChange = (name: NewClientValues) => (value: string) => {
    setValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value }
      onValuesChange?.(newValues)
      return newValues
    })
  }

  const handleSubmit = async () => {
    await onSubmit(values)
    setValues(defaultValues)
  }

  return (
    <Stack space={6}>
      {fields.map(({ keyboardType, label, name, placeholder }) => (
        <FormControl key={name}>
          <FormControl.Label>{label}</FormControl.Label>
          <Input
            background={'white'}
            _disabled={{ opacity: 0.8 }}
            isDisabled={isLoading}
            value={values[name]}
            onChangeText={handleInputChange(name)}
            placeholder={placeholder}
            keyboardType={keyboardType}
            _focus={{ borderColor: 'darkBlue.700' }}
          />
        </FormControl>
      ))}

      <Button
        isDisabled={!areValidValues || isLoading}
        isLoading={isLoading}
        leftIcon={<AntDesign color="white" name="pluscircle" />}
        onPress={handleSubmit}
        _text={{ textTransform: 'uppercase' }}
      >
        {isEditMode ? 'Edit client' : 'Add client'}
      </Button>
    </Stack>
  )
}
