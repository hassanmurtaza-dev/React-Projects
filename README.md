# React Practice Projects

A collection of small React projects I build while learning. Each folder is a
standalone Vite + React app.

## Projects

| # | Project | What it covers |
|---|---------|----------------|
| 01 | [Todo App](./01-todo-app) | `useState`, `useEffect`, lists & keys, forms, localStorage |
| 02 | [Weather App](./02-weather-app) | `useEffect`, `fetch`, async/await, loading & error states, working with a REST API |
| 03 | [Calculator](./03-calculator) | State machines, keyboard events, cleanup in `useEffect`, keeping logic out of the component |
| 04 | [Admin Dashboard](./04-admin-dashboard) | React Router, Context, `useMemo`, hand-drawn SVG charts, sortable and paginated tables |
| 05 | [Invoice Generator](./05-invoice-generator) | Nested state updates, derived totals, `Intl.NumberFormat`, a real print stylesheet |
| 06 | [Portfolio](./06-portfolio) | Scroll animations, theme switching, and a contact form that sends over SMTP from a serverless function |

## Running any project

```bash
cd 01-todo-app
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Tech

- React 19
- Vite
- Plain CSS (no UI library)
