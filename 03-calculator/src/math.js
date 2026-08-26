export function compute(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b
    case '−':
      return a - b
    case '×':
      return a * b
    case '÷':
      return a / b
    default:
      return b
  }
}

export function format(value) {
  if (!Number.isFinite(value)) return 'Error'

  const rounded = Math.round(value * 1e10) / 1e10
  return String(rounded)
}

export function pretty(value) {
  if (value === 'Error' || value.includes('e')) return value

  const [whole, fraction] = value.split('.')
  if (whole === '' || whole === '-') return value

  const grouped = Number(whole).toLocaleString('en-US')
  return fraction === undefined ? grouped : `${grouped}.${fraction}`
}
