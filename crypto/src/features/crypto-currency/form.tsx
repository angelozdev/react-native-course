import { Box, Button, FormControl, Select } from 'native-base'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getTopCryptoCurrencies } from './services'

// types
interface Props {
  onValuesChange: (values: Values) => void
}

export function Form({ onValuesChange }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [values, setValues] = useState<Values>({
    currency: '',
  })

  const [topCurrencies, setTopCurrencies] = useState<Datum[]>([])

  const handleValuesChange = (name: string) => (value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
    onValuesChange(values)
  }

  useEffect(() => {
    getTopCryptoCurrencies({ limit: 20 })
      .then(({ Data: data }) => {
        const sortedData = [...data].sort((a, b) =>
          a.CoinInfo.FullName.localeCompare(b.CoinInfo.FullName),
        )
        setTopCurrencies(sortedData)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <Box w="full" py={4}>
      <FormControl isRequired isDisabled={isLoading}>
        <FormControl.Label>Currency</FormControl.Label>
        <Select
          _selectedItem={{
            bg: 'gray.200',
          }}
          selectedValue={values.currency}
          accessibilityHint="Select a currency"
          accessibilityLabel="Currencies"
          placeholder="-- Select a currency --"
          onValueChange={handleValuesChange('currency')}
        >
          {topCurrencies.map(({ CoinInfo, DISPLAY }) => (
            <Select.Item
              key={CoinInfo.Id}
              label={`${CoinInfo.FullName} (${DISPLAY.USD.FROMSYMBOL})`}
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
        isDisabled={values.currency === '' || isLoading}
        isLoading={isLoading}
        mt={4}
      >
        Search
      </Button>
    </Box>
  )
}
