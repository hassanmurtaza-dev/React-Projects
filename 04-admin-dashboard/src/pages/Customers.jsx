import { useMemo, useState } from 'react'
import { customers } from '../data'
import { money, shortDate } from '../format'

export default function Customers() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'spent', direction: 'desc' })

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase()
    const direction = sort.direction === 'asc' ? 1 : -1

    return customers
      .filter((person) => !term || person.name.toLowerCase().includes(term))
      .sort((a, b) => {
        const left = a[sort.key]
        const right = b[sort.key]

        if (typeof left === 'number') return (left - right) * direction
        return String(left).localeCompare(String(right)) * direction
      })
  }, [search, sort])

  const best = Math.max(...customers.map((person) => person.spent))

  const sortBy = (key) =>
    setSort((now) =>
      now.key === key
        ? { key, direction: now.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'desc' },
    )

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
          placeholder="Search customers"
          aria-label="Search customers"
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="count">{rows.length} customers</span>
      </div>

      <section className="card">
        <div className="scroll">
          <table className="data">
            <thead>
              <tr>
                <th>
                  <button onClick={() => sortBy('name')}>Customer{arrow('name')}</button>
                </th>
                <th>Email</th>
                <th>
                  <button onClick={() => sortBy('last')}>Last order{arrow('last')}</button>
                </th>
                <th className="num">
                  <button onClick={() => sortBy('orders')}>Orders{arrow('orders')}</button>
                </th>
                <th className="num">
                  <button onClick={() => sortBy('spent')}>Spent{arrow('spent')}</button>
                </th>
                <th className="share">Share of top spender</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((person) => (
                <tr key={person.email}>
                  <td>{person.name}</td>
                  <td className="dim">{person.email}</td>
                  <td className="dim">{shortDate(person.last)}</td>
                  <td className="num">{person.orders}</td>
                  <td className="num">{money(person.spent)}</td>
                  <td className="share">
                    <span
                      className="meter"
                      role="img"
                      aria-label={`${Math.round((person.spent / best) * 100)} percent of the top spender`}
                    >
                      <span
                        className="meter-fill"
                        style={{ width: `${(person.spent / best) * 100}%` }}
                      />
                    </span>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty">
                    No customers match that search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
