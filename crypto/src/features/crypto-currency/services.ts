import Axios from 'axios'

const baseURL = 'https://min-api.cryptocompare.com/data'

const axios = Axios.create({
  baseURL,
})

type Options = {
  limit?: number
}

export async function getTopCryptoCurrencies({
  limit = 10,
}: Options = {}): Promise<Response> {
  const { data } = await axios.get<Response>('/top/totalvolfull', {
    params: { limit, tsym: 'USD' },
  })
  return data
}
