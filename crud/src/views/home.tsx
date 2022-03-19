import { Fab, Text, Box, View } from 'native-base'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ClientList } from '../features/clients'
import * as ClientsService from '../services/clients'

// types
import type { Client, HomeProps } from '../types/global'

export function Home({ route, navigation }: HomeProps) {
  const [clients, setClients] = React.useState<Client[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ClientsService.getAll()
      .then(setClients)
      .finally(() => setIsLoading(false))
  }, [])

  React.useEffect(() => {
    const { action, client } = route.params || {}
    if (!action || !client) return
    setClients((prevClients) => {
      const actions: Record<'add' | 'update' | 'remove', Function> = {
        add: () => [...prevClients, client],
        update: () => prevClients.map((c) => (c.id === client.id ? client : c)),
        remove: () => prevClients.filter((c) => c.id !== client.id),
      }

      return actions[action]() || prevClients
    })
  }, [route.params])

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <Box>
      <ClientList clients={clients} />
      <Fab
        renderInPortal={false}
        onPress={() => navigation.navigate('NewClient')}
        icon={<AntDesign name="plus" color="white" size={24} />}
      />
    </Box>
  )
}
