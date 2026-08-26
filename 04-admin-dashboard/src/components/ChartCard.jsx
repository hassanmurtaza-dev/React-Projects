import { useState } from 'react'

export default function ChartCard({ title, subtitle, table, children }) {
  const [view, setView] = useState('chart')

  return (
    <section className="card">
      <header className="card-head">
        <div>
          <h2>{title}</h2>
          <p className="card-sub">{subtitle}</p>
        </div>

        <div className="toggle" role="group" aria-label={`${title} view`}>
          <button
            className={view === 'chart' ? 'on' : ''}
            aria-pressed={view === 'chart'}
            onClick={() => setView('chart')}
          >
            Chart
          </button>
          <button
            className={view === 'table' ? 'on' : ''}
            aria-pressed={view === 'table'}
            onClick={() => setView('table')}
          >
            Table
          </button>
        </div>
      </header>

      {view === 'chart' ? children : table}
    </section>
  )
}
