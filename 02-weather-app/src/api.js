const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

export async function findCity(name) {
  const res = await fetch(
    `${GEO_URL}?name=${encodeURIComponent(name)}&count=1&language=en&format=json`,
  )
  if (!res.ok) throw new Error('Could not reach the search service')

  const data = await res.json()
  const place = data.results?.[0]
  if (!place) throw new Error(`No place found called "${name}"`)

  return {
    name: place.name,
    admin: place.admin1,
    country: place.country,
    latitude: place.latitude,
    longitude: place.longitude,
  }
}

export async function getWeather({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current:
      'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: 6,
  })

  const res = await fetch(`${FORECAST_URL}?${params}`)
  if (!res.ok) throw new Error('Could not load the forecast')

  return res.json()
}
