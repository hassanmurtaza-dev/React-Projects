const WIDTH = 96
const HEIGHT = 28
const INSET = 4

export default function Sparkline({ values }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  const step = WIDTH / (values.length - 1)

  const points = values.map((value, i) => [
    i * step,
    INSET + (HEIGHT - INSET * 2) * (1 - (value - min) / span),
  ])

  const path = points
    .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ')

  const [lastX, lastY] = points.at(-1)

  return (
    <svg
      className="sparkline"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width={WIDTH}
      height={HEIGHT}
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        stroke="var(--spark)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX} cy={lastY} r="3" fill="var(--series-1)" />
    </svg>
  )
}
