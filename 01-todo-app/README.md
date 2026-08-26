# Todo App

A small todo list built with React and Vite.

## Features

- Add, complete and delete todos
- Filter by **all / active / completed**
- "Clear completed" to remove finished items
- Todos are saved to `localStorage`, so they survive a refresh
- Light and dark theme, follows the system setting

## What I practiced

- `useState` for local component state
- `useEffect` to sync state to `localStorage`
- Rendering lists with stable `key`s
- Controlled form inputs
- Deriving values from state (filtered list, remaining count) instead of
  storing them separately

## Run it

```bash
npm install
npm run dev
```

## Project structure

```
src/
  App.jsx     # all app logic and markup
  App.css     # component styles
  index.css   # theme variables and resets
  main.jsx    # React entry point
```
