import Sparkline from './Sparkline'

export default function StatTile({ label, value, delta, trend }) {
  const up = delta >= 0

  return (
    <article className="tile">
      <p className="tile-label">{label}</p>
      <p className="tile-value">{value}</p>

      <div className="tile-foot">
        <span className={up ? 'delta up' : 'delta down'}>
          {up ? '↑' : '↓'} {Math.abs(delta).toFixed(1)}%
        </span>
        <span className="tile-period">vs last year</span>
        {trend && <Sparkline values={trend} />}
      </div>
    </article>
  )
}
