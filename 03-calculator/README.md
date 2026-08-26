# Calculator

A calculator built with React and Vite, in a dark theme with violet accents.

## Features

- The four operations, percent, sign toggle and clear
- Chained sums — typing `2 + 3 + 4` folds the running total as you go
- Full keyboard support: digits, `+ - * /`, `Enter` or `=`, `Escape` to clear
  and `Backspace` to undo a digit
- Thousands separators in the display, and the font shrinks for long numbers
- The active operator key stays highlighted so you can see what is pending
- Division by zero shows `Error` instead of `Infinity`

## What I practiced

- Modelling a small state machine with `useState` — the display, the pending
  operand, the operator, and whether the next digit starts a new number
- Keeping the arithmetic in a plain `math.js` module, so it can be tested
  without React
- A global `keydown` listener in `useEffect`, removed again on cleanup
- Building the keypad from an array instead of writing 19 buttons by hand
- Rounding away floating point noise, so `0.1 + 0.2` shows `0.3`

## Run it

```bash
npm install
npm run dev
```

## Project structure

```
src/
  App.jsx     # calculator state and the keypad
  math.js     # compute, format and display grouping
  App.css     # dark theme and key styles
  index.css   # resets
```
