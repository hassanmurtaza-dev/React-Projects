import { formatMoney, totals } from '../invoice'

export default function Totals({ items, discount, tax, currency, onDiscount, onTax }) {
  const sums = totals(items, discount, tax)

  return (
    <div className="totals">
      <div className="row">
        <span>Subtotal</span>
        <span className="value">{formatMoney(sums.subtotal, currency)}</span>
      </div>

      <div className="row">
        <label htmlFor="discount">
          Discount
          <input
            id="discount"
            className="rate-input"
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={discount}
            onChange={(e) => onDiscount(e.target.value)}
          />
          %
        </label>
        <span className="value">−{formatMoney(sums.discount, currency)}</span>
      </div>

      <div className="row">
        <label htmlFor="tax">
          Tax
          <input
            id="tax"
            className="rate-input"
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={tax}
            onChange={(e) => onTax(e.target.value)}
          />
          %
        </label>
        <span className="value">{formatMoney(sums.tax, currency)}</span>
      </div>

      <div className="row grand">
        <span>Total due</span>
        <span className="value">{formatMoney(sums.total, currency)}</span>
      </div>
    </div>
  )
}
