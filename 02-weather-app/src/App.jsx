import { useEffect, useState } from 'react'
import { findCity, getWeather } from './api'
import { describe } from './weatherCodes'
import { themeFor } from './theme'
import './App.css'

const START_CITY = {
  name: 'Lahore',
  admin: 'Punjab',
  country: 'Pakistan',
  latitude: 31.558,
  longitude: 74.35071,
}

const dayName = (iso) =>
  new Date(`${iso}T00:00`).toLocaleDateString('en-US', { weekday: 'short' })

export default function App() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState(START_CITY)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    getWeather(city)
      .then((data) => {
        if (cancelled) return
        setWeather(data)
        setError('')
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [city])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = query.trim()
    if (!name) return

    setLoading(true)
    setError('')

    try {
      setCity(await findCity(name))
      setQuery('')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const current = weather?.current
  const daily = weather?.daily
  const now = current ? describe(current.weather_code) : null
  const theme = current ? themeFor(current.weather_code, current.is_day) : 'cloud'

  const place = [city.name, city.admin !== city.name && city.admin, city.country]
    .filter(Boolean)
    .join(', ')

  return (
    <div className={`page ${theme}`}>
      <main className="app">
        <h1>Weather</h1>

        <form className="search" onSubmit={handleSubmit}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a city"
            aria-label="City name"
          />
          <button type="submit" disabled={loading}>
            Search
          </button>
        </form>

        {error && <p className="error">{error}</p>}
        {loading && !weather && <p className="hint">Loading…</p>}

        {current && (
          <section className={loading ? 'current dim' : 'current'}>
            <p className="place">{place}</p>

            <div className="now">
              <span className="icon">{now.icon}</span>
              <span className="temp">{Math.round(current.temperature_2m)}°</span>
            </div>

            <p className="label">{now.label}</p>

            <dl className="details">
              <div>
                <dt>Feels like</dt>
                <dd>{Math.round(current.apparent_temperature)}°</dd>
              </div>
              <div>
                <dt>Humidity</dt>
                <dd>{current.relative_humidity_2m}%</dd>
              </div>
              <div>
                <dt>Wind</dt>
                <dd>{Math.round(current.wind_speed_10m)} km/h</dd>
              </div>
            </dl>
          </section>
        )}

        {daily && (
          <section className="forecast">
            {daily.time.slice(1).map((date, i) => {
              const day = describe(daily.weather_code[i + 1])
              return (
                <article key={date}>
                  <span className="day">{dayName(date)}</span>
                  <span className="icon">{day.icon}</span>
                  <span className="range">
                    {Math.round(daily.temperature_2m_max[i + 1])}°
                    <span className="min">
                      {Math.round(daily.temperature_2m_min[i + 1])}°
                    </span>
                  </span>
                </article>
              )
            })}
          </section>
        )}
      </main>
    </div>
  )
}
