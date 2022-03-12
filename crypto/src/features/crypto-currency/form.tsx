import { Box, Button, FormControl, Select } from 'native-base'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getTopCryptoCurrencies } from '@services/cryptocurrencies'

// types
interface Props {
  onValuesChange?: (values: Values) => void
  onSubmit: (values: Values) => void | Promise<void>
}

export function Form({ onValuesChange, onSubmit }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState<Values>({
    cryptocurrency: '',
  })

  const [topCtryptoCurrencies, setTopCryptoCurrencies] = useState<Datum[]>([])

  const handleValuesChange =
    (name: 'currency' | 'cryptocurrency') => (value: string) => {
      setValues((prevValues) => ({ ...prevValues, [name]: value }))
      onValuesChange?.(values)
    }

  const handleSubmit = async () => {
    setIsLoading(true)
    await onSubmit(values)
    setIsLoading(false)
  }

  useEffect(() => {
    getTopCryptoCurrencies({ limit: 50 })
      .then(({ Data: data }) => {
        const sortedData = [...data].sort((a, b) =>
          a.CoinInfo.FullName.localeCompare(b.CoinInfo.FullName),
        )
        setTopCryptoCurrencies(sortedData)
      })
      .catch(console.error)
  }, [])

  return (
    <Box w="full" py={4}>
      <FormControl
        mb={4}
        isRequired
        isDisabled={isLoading || !topCtryptoCurrencies.length}
      >
        <FormControl.Label>Cryptocurrency</FormControl.Label>
        <Select
          _selectedItem={{
            bg: 'gray.200',
          }}
          selectedValue={values.cryptocurrency}
          accessibilityHint="Select a cryptocurrency"
          accessibilityLabel="Cryptocurrencies"
          placeholder="-- Select a cryptocurrency --"
          onValueChange={handleValuesChange('cryptocurrency')}
        >
          {topCtryptoCurrencies.map(({ CoinInfo, DISPLAY }) => (
            <Select.Item
              key={CoinInfo.Id}
              label={`${CoinInfo.FullName}${
                DISPLAY?.USD?.FROMSYMBOL ? ` (${DISPLAY.USD.FROMSYMBOL})` : ''
              }`}
              value={CoinInfo.Name}
            />
          ))}
        </Select>
      </FormControl>

      <Button
        _loading={{ bg: 'green.600' }}
        _pressed={{ bg: 'green.700', shadow: 'none' }}
        bg="green.600"
        shadow={1}
        _text={{ textTransform: 'uppercase' }}
        isDisabled={values.cryptocurrency === '' || isLoading}
        isLoading={isLoading}
        onPress={handleSubmit}
      >
        Search
      </Button>
    </Box>
  )
}
