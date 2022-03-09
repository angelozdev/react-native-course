import { Field } from '@features/ui'
import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Filter as TFilter } from 'types'

// types
interface Props {
  onChange: (filter: TFilter[]) => void
}

export function Filter({ onChange }: Props) {
  const [filterValues, setFilterValues] = useState({
    category: 'all'
  })

  const onValueChange = (key: string) => (value: string) => {
    setFilterValues((prevValues) => ({ ...prevValues, [key]: value }))
  }

  useEffect(() => {
    const filters: TFilter[] = Object.entries(filterValues).map(
      ([key, value]) => ({
        value,
        label: key as TFilter['label']
      })
    )

    onChange(filters)
  }, [filterValues, onChange])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtro</Text>

      <Field label="Categoría">
        <Picker
          selectedValue={filterValues.category}
          onValueChange={onValueChange('category')}
        >
          <Picker.Item label="Todas" value="all" />
          <Picker.Item label="Comida" value="food" />
          <Picker.Item label="Hogar" value="home" />
          <Picker.Item label="Ocio" value="entertainment" />
          <Picker.Item label="Salud" value="health" />
          <Picker.Item label="Suscripciones" value="subscriptions" />
          <Picker.Item label="Otros" value="other" />
        </Picker>
      </Field>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})
