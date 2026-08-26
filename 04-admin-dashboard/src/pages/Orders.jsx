import { useMemo, useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import { orders } from '../data'
import { money, shortDate } from '../format'

const PER_PAGE = 10
const STATUSES = ['all', 'paid', 'pending', 'refunded', 'failed']

export default function Orders() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState({ key: 'date', direction: 'desc' })
  const [page, setPage] = useState(1)

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase()

    const kept = orders.filter((order) => {
      if (status !== 'all' && order.status !== status) return false
      if (!term) return true

      return (
        order.customer.toLowerCase().includes(term) ||
        order.id.toLowerCase().includes(term) ||
        order.product.toLowerCase().includes(term)
      )
    })

    const direction = sort.direction === 'asc' ? 1 : -1

    return kept.sort((a, b) => {
      const left = a[sort.key]
      const right = b[sort.key]

      if (typeof left === 'number') return (left - right) * direction
      return String(left).localeCompare(String(right)) * direction
    })
  }, [search, status, sort])

  const pages = Math.max(1, Math.ceil(rows.length / PER_PAGE))
  const current = Math.min(page, pages)
  const visible = rows.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const sortBy = (key) => {
    setPage(1)
    setSort((now) =>
      now.key === key
        ? { key, direction: now.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'desc' },
    )
  }

  const arrow = (key) => {
    if (sort.key !== key) return ''
    return sort.direction === 'asc' ? ' ↑' : ' ↓'
  }

  return (
    <>
      <div className="filters">
        <input
          className="search"
          value={search}
          placeholder="Search orders, customers, products"
          aria-label="Search orders"
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />

        <select
          value={status}
          aria-label="Filter by status"
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
        >
          {STATUSES.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? 'All statuses' : option}
            </option>
          ))}
        </select>

        <span className="count">{rows.length} orders</span>
      </div>

      <section className="card">
        <div className="scroll">
          <table className="data">
            <thead>
              <tr>
                <th>
                  <button onClick={() => sortBy('id')}>Order{arrow('id')}</button>
                </th>
                <th>
                  <button onClick={() => sortBy('customer')}>
                    Customer{arrow('customer')}
                  </button>
                </th>
                <th>Product</th>
                <th>
                  <button onClick={() => sortBy('date')}>Date{arrow('date')}</button>
                </th>
                <th>Status</th>
                <th className="num">
                  <button onClick={() => sortBy('amount')}>Amount{arrow('amount')}</button>
                </th>
              </tr>
            </thead>

            <tbody>
              {visible.map((order) => (
                <tr key={order.id}>
                  <td className="mono">{order.id}</td>
                  <td>{order.customer}</td>
                  <td className="dim">{order.product}</td>
                  <td className="dim">{shortDate(order.date)}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="num">{money(order.amount)}</td>
                </tr>
              ))}

              {visible.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty">
                    No orders match that search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="pager">
          <span>
            Page {current} of {pages}
          </span>
          <div>
            <button disabled={current === 1} onClick={() => setPage(current - 1)}>
              Previous
            </button>
            <button disabled={current === pages} onClick={() => setPage(current + 1)}>
              Next
            </button>
          </div>
        </footer>
      </section>
    </>
  )
}
