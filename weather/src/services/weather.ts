import Axios from 'axios'
import { EnvironmentVariables } from '@consts'
import { WeatherResponse } from 'types'

const baseURL = 'https://api.openweathermap.org/data/2.5/'
const {} = EnvironmentVariables
const axios = Axios.create({
  baseURL,
  params: { appid: EnvironmentVariables.OPEN_WEATHER_KEY, units: 'metric' },
})

export async function getByCity(city: string) {
  try {
    const params = { q: city }
    const { data } = await axios.get<WeatherResponse>(`weather`, { params })

    return data
  } catch (error) {
    console.error('[SERVICES: WEATHER]', error)
    return Promise.reject(error)
  }
}
