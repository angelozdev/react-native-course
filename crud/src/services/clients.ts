import Axios from 'axios'
import { generateId } from '../utils'

// types
import type { ClientValues, NewClient, Client } from '../types/global'
type Options = {
  page?: number
  limit?: number
  sort?: ClientValues
  order?: 'asc' | 'desc'
}

const BASE_URL = 'http://192.168.0.11:3000/clients'

const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getAll(options: Options = {}) {
  try {
    const {
      limit: _limit = 10,
      order: _order = 'asc',
      page: _page = 1,
      sort: _sort = 'name',
    } = options

    const params = { _limit, _order, _page, _sort }

    const { data } = await axios.get('/', { params })
    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
export async function add(newClient: NewClient) {
  try {
    const id = generateId()
    const createdAt = new Date().toISOString()
    const client = { ...newClient, id, createdAt }
    const { data } = await axios.post<Client>('/', client)

    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export async function remove(id: Client['id']) {
  try {
    const { data } = await axios.delete<Client>(`/${id}`)
    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export async function update(id: Client['id'], client: Client) {
  try {
    const { data } = await axios.put<Client>(`/${id}`, client)
    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
