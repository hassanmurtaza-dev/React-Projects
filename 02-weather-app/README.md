# Weather App

Search any city and see the current weather plus a 5-day forecast. Built with
React and Vite.

Data comes from [Open-Meteo](https://open-meteo.com) — free, and no API key
needed.

## Features

- Search any city by name
- Current temperature, condition, feels-like, humidity and wind
- 5-day forecast with high / low temperatures
- The background gradient changes with the weather — warm orange for clear
  skies, grey for cloud, deep blue for rain, purple for storms, and a dark
  night gradient wherever the sun has already set
- Loading and error states (try searching something like `asdfgh`)

## What I practiced

- `useEffect` to fetch data when the selected city changes
- `async` / `await` with `fetch`, and handling failed responses
- Keeping API calls in a separate `api.js` instead of inside the component
- Cleanup in `useEffect` so a slow response from an old city cannot overwrite
  a newer one
- Optional chaining (`weather?.current`) while data is still loading
- Driving CSS from state — the API's weather code picks the theme class

## Run it

```bash
npm install
npm run dev
```

## Project structure

```
src/
  App.jsx           # state, effects and markup
  api.js            # the two Open-Meteo calls
  weatherCodes.js   # WMO weather code -> label and icon
  theme.js          # WMO weather code + is_day -> gradient theme
  App.css           # component styles and the gradients
  index.css         # resets
```
