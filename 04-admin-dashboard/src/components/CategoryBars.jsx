import { useState } from 'react'
import { compactMoney, money } from '../format'

const W = 760
const BAND = 44
const BAR = 22
const RADIUS = 4
const LABEL_W = 140
const RIGHT = 86

export default function CategoryBars({ items }) {
  const [active, setActive] = useState(null)

  const height = items.length * BAND + 12
  const plotW = W - LABEL_W - RIGHT
  const highest = Math.max(...items.map((item) => item.value))

  const barPath = (width, top) => {
    const radius = Math.min(RADIUS, width)
    const end = LABEL_W + width

    return `M${LABEL_W} ${top} H${end - radius} A${radius} ${radius} 0 0 1 ${end} ${
      top + radius
    } V${top + BAR - radius} A${radius} ${radius} 0 0 1 ${end - radius} ${
      top + BAR
    } H${LABEL_W} Z`
  }

  return (
    <div className="chart-wrap">
      <svg
        className="chart"
        viewBox={`0 0 ${W} ${height}`}
        role="img"
        aria-label="Revenue by category over the last 90 days"
      >
        <line
          x1={LABEL_W}
          x2={LABEL_W}
          y1="6"
          y2={height - 6}
          stroke="var(--axis)"
          strokeWidth="1"
        />

        {items.map((item, i) => {
          const width = Math.max(2, (item.value / highest) * plotW)
          const top = 6 + i * BAND + (BAND - BAR) / 2

          return (
            <g
              key={item.name}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <rect
                x="0"
                y={6 + i * BAND}
                width={W}
                height={BAND}
                fill="transparent"
              />
              <text className="cat" x={LABEL_W - 12} y={top + BAR / 2 + 4} textAnchor="end">
                {item.name}
              </text>
              <path
                d={barPath(width, top)}
                fill="var(--series-1)"
                fillOpacity={active === null || active === i ? 1 : 0.45}
              />
              <text className="bar-value" x={LABEL_W + width + 10} y={top + BAR / 2 + 4}>
                {compactMoney(item.value)}
              </text>
            </g>
          )
        })}
      </svg>

      {active !== null && (
        <div
          className="tip bar-tip"
          style={{
            left: `${Math.min(80, (LABEL_W / W) * 100 + 6)}%`,
            top: `${((6 + active * BAND + BAND / 2) / height) * 100}%`,
          }}
        >
          <p className="tip-head">{items[active].name}</p>
          <p className="tip-row">
            <span className="swatch" style={{ background: 'var(--series-1)' }} />
            Revenue
            <b>{money(items[active].value)}</b>
          </p>
        </div>
      )}
    </div>
  )
}
