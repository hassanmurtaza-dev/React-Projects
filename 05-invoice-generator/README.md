# Invoice Generator

Fill in an invoice and print it — or save it as a PDF straight from the browser.
Built with React and Vite, with no PDF library: the print stylesheet turns the
editable page into a clean document.

## Features

- **Edit in place** — the page you fill in *is* the invoice, not a form that
  produces one somewhere else
- **Line items** you can add and remove, with the amount recalculating as you type
- **Discount and tax** as percentages, with tax applied after the discount
- **Five currencies** (USD, EUR, GBP, PKR, AED), formatted with `Intl.NumberFormat`
- **Print / Save as PDF** — the toolbar, the remove buttons and the date pickers
  disappear, and dates switch to their written form (`26 Aug 2026`)
- **Auto-saved** to `localStorage`, so a refresh does not lose the invoice
- **New invoice** carries the number forward — `INV-1024` becomes `INV-1025`

## What I practiced

- Updating deeply nested state immutably — a field inside `from`, an item inside
  `items`
- Lifting the arithmetic into `invoice.js` so it can be tested without React
- Guarding every number against empty and junk input, so the total never shows
  `NaN`
- Writing a real `@media print` stylesheet, including `@page` margins and
  swapping elements between screen and paper
- `Intl.NumberFormat` for currency instead of string concatenation

## Try it

1. Press **Load sample** to fill it with a realistic invoice
2. Change a quantity — subtotal, tax and total follow immediately
3. Switch the currency to **PKR**
4. Press **Print / Save as PDF** and choose "Save as PDF" as the destination —
   the toolbar and the delete buttons are gone from the output

## Run it

```bash
npm install
npm run dev
```

## Project structure

```
src/
  App.jsx                # invoice state and layout
  invoice.js             # totals, currency, dates, storage
  components/
    LineItems.jsx        # the editable item rows
    Totals.jsx           # subtotal, discount, tax, total
  index.css              # paper styling and the print stylesheet
```
