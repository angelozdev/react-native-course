declare module '@env' {
  export const OPEN_WEATHER_KEY: string
}

declare global {
  interface WeatherResponse {
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

  interface Clouds {
    all: number
  }

  interface Coord {
    lat: number
    lon: number
  }

  interface Main {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }

  interface Rain {
    [x: string]: number
  }

  interface Sys {
    country: string
    id: number
    sunrise: number
    sunset: number
    type: number
  }

  interface Weather {
    description: string
    icon: string
    id: number
    main: string
  }

  interface Wind {
    deg: number
    speed: number
  }
}
