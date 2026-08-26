const STORAGE_KEY = 'invoice'

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'PKR', 'AED']

export const lineTotal = (item) =>
  (Number(item.quantity) || 0) * (Number(item.rate) || 0)

export function totals(items, discountRate, taxRate) {
  const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0)
  const discount = subtotal * ((Number(discountRate) || 0) / 100)
  const taxable = subtotal - discount
  const tax = taxable * ((Number(taxRate) || 0) / 100)

  return { subtotal, discount, tax, total: taxable + tax }
}

export function formatMoney(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0)
}

export const formatDate = (iso) =>
  iso
    ? new Date(`${iso}T00:00`).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : ''

const addDays = (date, days) => {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next.toISOString().slice(0, 10)
}

export const emptyItem = () => ({
  id: crypto.randomUUID(),
  description: '',
  quantity: 1,
  rate: 0,
})

export function blankInvoice(number = 1) {
  const today = new Date()

  return {
    number: `INV-${String(number).padStart(4, '0')}`,
    issued: today.toISOString().slice(0, 10),
    due: addDays(today, 14),
    currency: 'USD',
    from: { name: '', address: '', email: '' },
    to: { name: '', address: '', email: '' },
    items: [emptyItem()],
    discount: 0,
    tax: 0,
    notes: '',
  }
}

export function sampleInvoice() {
  return {
    ...blankInvoice(1024),
    from: {
      name: 'Northwind Studio',
      address: '14 Jail Road, Lahore, Pakistan',
      email: 'billing@northwind.studio',
    },
    to: {
      name: 'Harbour Coffee Co.',
      address: '221 Marine Drive, Dubai, UAE',
      email: 'accounts@harbourcoffee.ae',
    },
    items: [
      { id: crypto.randomUUID(), description: 'Brand identity design', quantity: 1, rate: 1800 },
      { id: crypto.randomUUID(), description: 'Website build (5 pages)', quantity: 1, rate: 3200 },
      { id: crypto.randomUUID(), description: 'Product photography', quantity: 24, rate: 45 },
      { id: crypto.randomUUID(), description: 'Monthly maintenance', quantity: 3, rate: 250 },
    ],
    discount: 5,
    tax: 5,
    notes: 'Payment due within 14 days. Bank details are on the second page of the contract.',
  }
}

export function loadInvoice() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : sampleInvoice()
  } catch {
    return sampleInvoice()
  }
}

export function saveInvoice(invoice) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice))
  } catch {
    return
  }
}
