import React from 'react'
import { View } from 'react-native'

// components
import { Header } from '@features/ui'
import { AddBudgetForm } from '@features/budget'

export function Home() {
  return (
    <View>
      <Header>
        <AddBudgetForm />
      </Header>
    </View>
  )
}
