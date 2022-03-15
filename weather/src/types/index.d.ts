declare module '@env' {
  export const OPEN_WEATHER_KEY: string
}

export interface WeatherResponse {
  base: string
  clouds: Clouds
  cod: number
  coord: Coord
  dt: number
  id: number
  main: Main
  name: string
  rain?: Rain
  sys: Sys
  timezone: number
  visibility: number
  weather: Weather[]
  wind: Wind
}

export interface Clouds {
  all: number
}

export interface Coord {
  lat: number
  lon: number
}

export interface Main {
  feels_like: number
  humidity: number
  pressure: number
  temp: number
  temp_max: number
  temp_min: number
}

export interface Rain {
  [x: string]: number
}

export interface Sys {
  country: string
  id: number
  sunrise: number
  sunset: number
  type: number
}

export interface Weather {
  description: string
  icon: string
  id: number
  main: string
}

export interface Wind {
  deg: number
  speed: number
}
