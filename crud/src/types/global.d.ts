import type { StackScreenProps } from '@react-navigation/stack'

type NewClientValues = 'name' | 'email' | 'phone' | 'company'
type ClientValues = NewClientValues | 'id' | 'createdAt'

interface NewClient {
  name: string
  email: string
  phone: string
  company: string
}

interface Client extends NewClient {
  id: string
  createdAt: string
}

type MainStackParamList = {
  Home: undefined | { client?: Client; action?: 'add' | 'update' | 'remove' }
  NewClient: undefined | { client?: Client }
  ClientDetail: { client: Client }
}

type HomeProps = StackScreenProps<MainStackParamList, 'Home'>
type NewClientProps = StackScreenProps<MainStackParamList, 'NewClient'>
type ClientDetailProps = StackScreenProps<MainStackParamList, 'ClientDetail'>

type MainNavigation = HomeProps['navigation']
