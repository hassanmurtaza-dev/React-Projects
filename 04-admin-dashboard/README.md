# Admin Dashboard

A multi-page analytics dashboard for a fictional company, built with React,
React Router and hand-drawn SVG charts. No chart library and no backend — the
sample data is generated from a fixed seed, so every reload shows the same
numbers.

## Features

- **Three routes** — Overview, Orders and Customers, with a persistent sidebar
- **Stat tiles** with a signed delta against last year and a 12-point sparkline
- **Revenue chart** — two series, hover crosshair and tooltip, direct end labels
  and a legend
- **Category bars** — rounded data-ends, value at the tip, per-bar hover
- **Chart / Table toggle** on every chart, so no value is reachable only by
  hovering
- **Orders table** — search across three fields, status filter, sortable
  columns, pagination
- **Customers table** — search, sorting, and a share-of-top-spender meter
- **Light and dark themes** — follows the system by default, and the toggle is
  remembered

## What I practiced

- **React Router** — nested routes with a shared layout, `NavLink` active state
- **Context** — the theme provider, with the context and the component split
  into separate files so fast refresh stays happy
- `useMemo` for the filter-sort-paginate chain, so it only reruns when an input
  changes
- Drawing charts by hand in SVG: linear scales, a "nice" axis-tick algorithm,
  and paths built from data
- Mapping mouse position back to a data index for the crosshair, and driving
  the same state from arrow keys

## About the charts

The colours are not picked by eye. They come from a validated palette, and the
pair was run through a colour-vision-deficiency check before use — worst
adjacent separation is ΔE 24.7 in light mode and 26.8 in dark, against a target
of 8. A few rules the charts follow:

- One y-axis, never two
- Two or more series always get a legend, so identity is never colour alone
- Hairline solid gridlines, 2px lines, 24px-max bars, area fills at 10% opacity
- Every chart has a table view — tooltips enhance, they never gate a value
- The end labels disappear when the two lines finish too close together, rather
  than colliding

## Run it

```bash
npm install
npm run dev
```

## Project structure

```
src/
  App.jsx              # sidebar, top bar, router outlet
  main.jsx             # routes and providers
  data.js              # seeded sample data
  format.js            # money, dates, axis ticks
  ThemeContext.js      # context and hook
  ThemeProvider.jsx    # provider component
  components/
    RevenueChart.jsx   # two-series line chart with crosshair
    CategoryBars.jsx   # horizontal bars with hover
    Sparkline.jsx      # 12-point tile trend
    StatTile.jsx       # label, value, delta, trend
    StatusBadge.jsx    # order status, mark plus label
    ChartCard.jsx      # card shell with chart/table toggle
  pages/
    Overview.jsx
    Orders.jsx
    Customers.jsx
```
