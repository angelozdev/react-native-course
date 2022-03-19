import { Text, Box, Heading, Link, Pressable } from 'native-base'
import React from 'react'

// types
import type { Client } from '../../types/global'

interface Props {
  name: Client['name']
  email: Client['email']
  company: Client['company']
  createdAt: Client['createdAt']
  onPress?: () => void
  onLongPress?: () => void
}

export function ClientItem({
  name,
  email,
  company,
  onPress,
  onLongPress,
}: Props) {
  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={onPress}
      accessibilityRole="button"
    >
      {({ isPressed }) => (
        <Box
          p="4"
          background={'white'}
          borderRadius={4}
          mb={2}
          shadow="2"
          style={{
            transform: [{ scale: isPressed ? 0.99 : 1 }],
          }}
        >
          <Heading size="md">{name}</Heading>
          <Text>{company}</Text>
          <Link href={'mailto:' + email}>{email}</Link>
        </Box>
      )}
    </Pressable>
  )
}
