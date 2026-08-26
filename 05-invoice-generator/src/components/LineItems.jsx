import { formatMoney, lineTotal } from '../invoice'

export default function LineItems({ items, currency, onChange, onRemove, onAdd }) {
  return (
    <>
      <table className="items">
        <thead>
          <tr>
            <th>Description</th>
            <th className="num qty">Qty</th>
            <th className="num rate">Rate</th>
            <th className="num amount">Amount</th>
            <th className="strip" />
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  value={item.description}
                  placeholder="Describe the work"
                  aria-label="Item description"
                  onChange={(e) => onChange(item.id, { description: e.target.value })}
                />
              </td>
              <td className="num qty">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={item.quantity}
                  aria-label="Quantity"
                  onChange={(e) => onChange(item.id, { quantity: e.target.value })}
                />
              </td>
              <td className="num rate">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate}
                  aria-label="Rate"
                  onChange={(e) => onChange(item.id, { rate: e.target.value })}
                />
              </td>
              <td className="num amount">{formatMoney(lineTotal(item), currency)}</td>
              <td className="strip">
                <button
                  className="remove"
                  disabled={items.length === 1}
                  aria-label={`Remove ${item.description || 'this item'}`}
                  onClick={() => onRemove(item.id)}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add" onClick={onAdd}>
        + Add line
      </button>
    </>
  )
}
