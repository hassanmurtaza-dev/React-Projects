import { useState } from 'react'
import { compactMoney, money, niceScale } from '../format'

const W = 760
const H = 300
const PAD = { top: 18, right: 70, bottom: 34, left: 58 }
const PLOT_W = W - PAD.left - PAD.right
const PLOT_H = H - PAD.top - PAD.bottom

export default function RevenueChart({ series }) {
  const [active, setActive] = useState(null)

  const months = series[0].points.map((p) => p.month)
  const count = months.length
  const highest = Math.max(...series.flatMap((s) => s.points.map((p) => p.value)))
  const scale = niceScale(highest)

  const x = (i) => PAD.left + (i / (count - 1)) * PLOT_W
  const y = (value) => PAD.top + PLOT_H * (1 - value / scale.top)

  const lineOf = (points) =>
    points
      .map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`)
      .join(' ')

  const areaOf = (points) =>
    `${lineOf(points)} L${x(count - 1).toFixed(1)} ${PAD.top + PLOT_H} L${PAD.left} ${
      PAD.top + PLOT_H
    } Z`

  const endGap = Math.abs(
    y(series[0].points.at(-1).value) - y(series[1].points.at(-1).value),
  )
  const labelEnds = endGap >= 16

  const pick = (event) => {
    const box = event.currentTarget.getBoundingClientRect()
    const inside = ((event.clientX - box.left) / box.width) * W
    const step = (inside - PAD.left) / PLOT_W
    setActive(Math.min(count - 1, Math.max(0, Math.round(step * (count - 1)))))
  }

  const move = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    event.preventDefault()
    setActive((current) => {
      const from = current ?? count - 1
      const next = event.key === 'ArrowLeft' ? from - 1 : from + 1
      return Math.min(count - 1, Math.max(0, next))
    })
  }

  return (
    <div className="chart-wrap">
      <ul className="legend">
        {series.map((s) => (
          <li key={s.key}>
            <span className="swatch" style={{ background: s.color }} />
            {s.label}
          </li>
        ))}
      </ul>

      <svg
        className="chart"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Monthly revenue, this year against last year"
        tabIndex={0}
        onMouseMove={pick}
        onMouseLeave={() => setActive(null)}
        onKeyDown={move}
        onBlur={() => setActive(null)}
      >
        {scale.ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={PAD.left + PLOT_W}
              y1={y(tick)}
              y2={y(tick)}
              stroke="var(--grid)"
              strokeWidth="1"
            />
            <text className="tick" x={PAD.left - 10} y={y(tick) + 4} textAnchor="end">
              {compactMoney(tick)}
            </text>
          </g>
        ))}

        {months.map((month, i) => (
          <text key={month} className="tick" x={x(i)} y={H - 12} textAnchor="middle">
            {month}
          </text>
        ))}

        <path d={areaOf(series[0].points)} fill={series[0].color} fillOpacity="0.1" />

        {series.map((s) => (
          <path
            key={s.key}
            d={lineOf(s.points)}
            fill="none"
            stroke={s.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {active !== null && (
          <line
            x1={x(active)}
            x2={x(active)}
            y1={PAD.top}
            y2={PAD.top + PLOT_H}
            stroke="var(--axis)"
            strokeWidth="1"
          />
        )}

        {series.map((s) => {
          const spot = active ?? count - 1
          return (
            <circle
              key={s.key}
              cx={x(spot)}
              cy={y(s.points[spot].value)}
              r="4"
              fill={s.color}
              stroke="var(--surface)"
              strokeWidth="2"
            />
          )
        })}

        {labelEnds &&
          active === null &&
          series.map((s) => (
            <text
              key={s.key}
              className="end-label"
              x={x(count - 1) + 10}
              y={y(s.points.at(-1).value) + 4}
            >
              {compactMoney(s.points.at(-1).value)}
            </text>
          ))}
      </svg>

      {active !== null && (
        <div
          className="tip"
          style={{ left: `${Math.min(88, Math.max(12, (x(active) / W) * 100))}%` }}
        >
          <p className="tip-head">{months[active]}</p>
          {series.map((s) => (
            <p key={s.key} className="tip-row">
              <span className="swatch" style={{ background: s.color }} />
              {s.label}
              <b>{money(s.points[active].value)}</b>
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
