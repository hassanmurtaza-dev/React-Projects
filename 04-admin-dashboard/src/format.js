export const money = (n) => `$${Math.round(n).toLocaleString('en-US')}`

export const compactMoney = (n) => {
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`
  if (Math.abs(n) >= 1e3) return `$${Math.round(n / 1e3)}K`
  return `$${Math.round(n)}`
}

export const shortDate = (iso) =>
  new Date(`${iso}T00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

export function niceScale(max, count = 4) {
  const raw = max / count
  const magnitude = 10 ** Math.floor(Math.log10(raw))
  const step = Math.ceil(raw / magnitude) * magnitude

  return {
    top: step * count,
    ticks: Array.from({ length: count + 1 }, (_, i) => i * step),
  }
}
