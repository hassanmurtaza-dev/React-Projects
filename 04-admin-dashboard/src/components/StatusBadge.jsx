const LOOK = {
  paid: { label: 'Paid', tone: 'good', mark: '✓' },
  pending: { label: 'Pending', tone: 'warning', mark: '◔' },
  refunded: { label: 'Refunded', tone: 'serious', mark: '↩' },
  failed: { label: 'Failed', tone: 'critical', mark: '✕' },
}

export default function StatusBadge({ status }) {
  const look = LOOK[status]

  return (
    <span className={`badge ${look.tone}`}>
      <span className="badge-mark" aria-hidden="true">
        {look.mark}
      </span>
      {look.label}
    </span>
  )
}
