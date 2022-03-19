import { Button, View } from 'native-base'
import Icon from 'react-native-vector-icons/Feather'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

// types
import type { MainNavigation } from '../../types/global'

export function GoToCreateClientViewButton() {
  const navigation = useNavigation<MainNavigation>()
  return (
    <View ml="1">
      <Button
        leftIcon={<Icon name="plus-circle" size={16} color="white" />}
        size="md"
        variant="ghost"
        _text={{ color: 'white' }}
        _pressed={{
          backgroundColor: 'transparent',
        }}
        onPress={() => navigation.navigate('NewClient')}
      >
        CLIENT
      </Button>
    </View>
  )
}
