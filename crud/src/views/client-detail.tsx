import { Box, Button, Heading, Link, Text, View } from 'native-base'
import React from 'react'
import { Alert } from 'react-native'
import * as ClientsService from '../services/clients'

// types
import { ClientDetailProps } from '../types/global'

export function ClientDetail({ route, navigation }: ClientDetailProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { client } = route.params

  const handleRemove = () => {
    const removeClient = async () => {
      setIsLoading(true)
      await ClientsService.remove(client.id)
      navigation.navigate('Home', { client, action: 'remove' })
    }

    Alert.alert('Are you sure?', `"${client.name}" will be removed.`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        style: 'destructive',
        onPress: removeClient,
      },
    ])
  }

  const handleEdit = () => {
    navigation.navigate('NewClient', { client })
  }

  return (
    <View p="4">
      <Box shadow="2" borderRadius="4" bg="white" p="4">
        <Heading textAlign="center">{client.name}</Heading>
        <Text>{client.company}</Text>
        <Link href={`tel:${client.phone}`}>{client.phone}</Link>
        <Link href={`mailto:${client.email}`}>{client.email}</Link>
        <Text mt="2">{new Date(client.createdAt).toDateString()}</Text>

        <Button
          isLoading={isLoading}
          onPress={handleRemove}
          _pressed={{ bg: 'red.600' }}
          bg="red.500"
          mt="4"
        >
          Remove
        </Button>

        <Button
          isLoading={isLoading}
          onPress={handleEdit}
          _pressed={{ bg: 'amber.600' }}
          bg="amber.500"
          mt="1"
        >
          Edit
        </Button>
      </Box>
    </View>
  )
}
