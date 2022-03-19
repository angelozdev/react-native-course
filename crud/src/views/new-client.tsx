import { View } from 'native-base'
import React from 'react'

import * as ClientsService from '../services/clients'

import { NewClientForm } from '../features/clients'

// types
import type {
  Client,
  NewClient as INewClient,
  NewClientProps,
} from '../types/global'

export function NewClient({ navigation, route: { params } }: NewClientProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (client: INewClient | Client) => {
    setIsLoading(true)
    const isUpdating = !!(client as Client).id
    const clientFromServer = isUpdating
      ? await ClientsService.update((client as Client).id, client as Client)
      : await ClientsService.add(client)

    navigation.navigate('Home', {
      client: clientFromServer,
      action: isUpdating ? 'update' : 'add',
    })
  }

  return (
    <View p="4">
      <NewClientForm
        initialValues={params?.client}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </View>
  )
}
