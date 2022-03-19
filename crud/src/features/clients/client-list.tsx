import React from 'react'
import { FlatList, Heading, Text, View } from 'native-base'

// types
import type { Client, MainNavigation } from '../../types/global'
import { ClientItem } from './client-item'
import { useNavigation } from '@react-navigation/native'

interface Props {
  clients: Client[]
}

export function ClientList({ clients }: Props) {
  const navigation = useNavigation<MainNavigation>()
  return (
    <FlatList
      p={4}
      ListHeaderComponent={<Heading mb={4}>Clients</Heading>}
      ListEmptyComponent={
        <Text>
          No clients for now. To add a client{' '}
          <Text
            onPress={() => navigation.navigate('NewClient')}
            underline
            color="darkBlue.900"
          >
            click here
          </Text>
          .
        </Text>
      }
      renderItem={({ item: client }) => {
        const { name, email, company, createdAt } = client
        return (
          <ClientItem
            email={email}
            name={name}
            company={company}
            createdAt={createdAt}
            onPress={() => navigation.navigate('ClientDetail', { client })}
            onLongPress={() => navigation.navigate('NewClient', { client })}
          />
        )
      }}
      ListFooterComponent={<View mb={8} />}
      keyExtractor={(client) => client.id}
      data={clients}
    />
  )
}
