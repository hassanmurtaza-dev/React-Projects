import { useEffect, useState } from 'react'
import LineItems from './components/LineItems'
import Totals from './components/Totals'
import {
  CURRENCIES,
  blankInvoice,
  emptyItem,
  formatDate,
  loadInvoice,
  sampleInvoice,
  saveInvoice,
} from './invoice'

export default function App() {
  const [invoice, setInvoice] = useState(loadInvoice)

  useEffect(() => {
    saveInvoice(invoice)
  }, [invoice])

  const setField = (key, value) =>
    setInvoice((current) => ({ ...current, [key]: value }))

  const setParty = (side, key, value) =>
    setInvoice((current) => ({
      ...current,
      [side]: { ...current[side], [key]: value },
    }))

  const updateItem = (id, patch) =>
    setInvoice((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }))

  const addItem = () =>
    setInvoice((current) => ({ ...current, items: [...current.items, emptyItem()] }))

  const removeItem = (id) =>
    setInvoice((current) => ({
      ...current,
      items: current.items.filter((item) => item.id !== id),
    }))

  const startNew = () => {
    const digits = Number(invoice.number.replace(/\D/g, '')) || 0
    setInvoice(blankInvoice(digits + 1))
  }

  const party = (side, heading) => (
    <div className="party">
      <h2>{heading}</h2>
      <input
        className="party-name"
        value={invoice[side].name}
        placeholder="Company name"
        aria-label={`${heading} name`}
        onChange={(e) => setParty(side, 'name', e.target.value)}
      />
      <textarea
        rows="2"
        value={invoice[side].address}
        placeholder="Street, city, country"
        aria-label={`${heading} address`}
        onChange={(e) => setParty(side, 'address', e.target.value)}
      />
      <input
        value={invoice[side].email}
        placeholder="email@company.com"
        aria-label={`${heading} email`}
        onChange={(e) => setParty(side, 'email', e.target.value)}
      />
    </div>
  )

  return (
    <div className="page">
      <div className="toolbar">
        <div className="toolbar-left">
          <select
            value={invoice.currency}
            aria-label="Currency"
            onChange={(e) => setField('currency', e.target.value)}
          >
            {CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <button onClick={() => setInvoice(sampleInvoice())}>Load sample</button>
          <button onClick={startNew}>New invoice</button>
        </div>

        <button className="primary" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      <article className="sheet">
        <header className="sheet-head">
          <div>
            <h1>Invoice</h1>
            <input
              className="number"
              value={invoice.number}
              aria-label="Invoice number"
              onChange={(e) => setField('number', e.target.value)}
            />
          </div>

          <dl className="dates">
            <div>
              <dt>Issued</dt>
              <dd>
                <input
                  type="date"
                  value={invoice.issued}
                  aria-label="Issue date"
                  onChange={(e) => setField('issued', e.target.value)}
                />
                <span className="printed">{formatDate(invoice.issued)}</span>
              </dd>
            </div>
            <div>
              <dt>Due</dt>
              <dd>
                <input
                  type="date"
                  value={invoice.due}
                  aria-label="Due date"
                  onChange={(e) => setField('due', e.target.value)}
                />
                <span className="printed">{formatDate(invoice.due)}</span>
              </dd>
            </div>
          </dl>
        </header>

        <div className="parties">
          {party('from', 'From')}
          {party('to', 'Bill to')}
        </div>

        <LineItems
          items={invoice.items}
          currency={invoice.currency}
          onChange={updateItem}
          onRemove={removeItem}
          onAdd={addItem}
        />

        <Totals
          items={invoice.items}
          discount={invoice.discount}
          tax={invoice.tax}
          currency={invoice.currency}
          onDiscount={(value) => setField('discount', value)}
          onTax={(value) => setField('tax', value)}
        />

        <footer className="notes">
          <h2>Notes</h2>
          <textarea
            rows="3"
            value={invoice.notes}
            placeholder="Payment terms, bank details, thank you note"
            aria-label="Notes"
            onChange={(e) => setField('notes', e.target.value)}
          />
        </footer>
      </article>

      <p className="hint">Everything you type is saved in this browser.</p>
    </div>
  )
}
