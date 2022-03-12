import Axios from 'axios'

// types
type Options = { limit?: number }
type GetPriceResponse = Record<Currencies, number>
type GetPriceOptions = { cryptocurrency: string }

const baseURL = 'https://min-api.cryptocompare.com/data'
const axios = Axios.create({ baseURL })
const currencies: Array<Currencies> = [
  'AUD',
  'BRL',
  'CAD',
  'CHF',
  'COP',
  'EUR',
  'GBP',
  'HKD',
  'JPY',
  'MXN',
  'RUB',
  'USD',
]

export async function getTopCryptoCurrencies({
  limit = 10,
}: Options = {}): Promise<Response> {
  try {
    const { data } = await axios.get<Response>('/top/totalvolfull', {
      params: { limit, tsym: 'USD' },
    })
    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export async function getPrices({
  cryptocurrency,
}: GetPriceOptions): Promise<GetPriceResponse> {
  try {
    const { data } = await axios.get<GetPriceResponse>('/price', {
      params: { fsym: cryptocurrency, tsyms: currencies.join(',') },
    })

    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
