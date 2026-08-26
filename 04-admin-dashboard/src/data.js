const MONTHS = [
  'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb',
  'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
]

const NAMES = [
  'Ayesha Khan', 'Bilal Ahmed', 'Clara Diaz', 'Daniyal Raza', 'Emma Stone',
  'Farhan Malik', 'Grace Wong', 'Hina Sheikh', 'Imran Qureshi', 'Julia Novak',
  'Kamran Ali', 'Lena Fischer', 'Mahnoor Tariq', 'Noah Bennett', 'Omar Siddiqui',
  'Priya Nair', 'Rabia Yousaf', 'Samir Haddad', 'Tania Rossi', 'Usman Javed',
]

const PRODUCTS = [
  { name: 'Starter plan', category: 'Subscriptions', price: 29 },
  { name: 'Pro plan', category: 'Subscriptions', price: 89 },
  { name: 'Team plan', category: 'Subscriptions', price: 249 },
  { name: 'Onboarding call', category: 'Services', price: 180 },
  { name: 'Custom report', category: 'Services', price: 320 },
  { name: 'Extra seats', category: 'Add-ons', price: 45 },
  { name: 'Storage pack', category: 'Add-ons', price: 60 },
  { name: 'Priority support', category: 'Support', price: 140 },
  { name: 'Training day', category: 'Training', price: 550 },
  { name: 'API credits', category: 'Usage', price: 75 },
]

const STATUSES = ['paid', 'paid', 'paid', 'paid', 'pending', 'pending', 'refunded', 'failed']

function makeRandom(seed) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

function buildSeries(seed, base, growth) {
  const random = makeRandom(seed)
  return MONTHS.map((month, i) => ({
    month,
    value: Math.round((base + i * growth) * (0.86 + random() * 0.28)),
  }))
}

function buildOrders() {
  const random = makeRandom(20260826)
  const start = new Date('2026-05-29T00:00:00')

  return Array.from({ length: 78 }, (_, i) => {
    const product = PRODUCTS[Math.floor(random() * PRODUCTS.length)]
    const quantity = 1 + Math.floor(random() * 3)
    const date = new Date(start)
    date.setDate(start.getDate() + Math.floor(random() * 90))

    return {
      id: `ORD-${4180 + i}`,
      customer: NAMES[Math.floor(random() * NAMES.length)],
      product: product.name,
      category: product.category,
      amount: product.price * quantity,
      status: STATUSES[Math.floor(random() * STATUSES.length)],
      date: date.toISOString().slice(0, 10),
    }
  }).sort((a, b) => b.date.localeCompare(a.date))
}

export const revenue = {
  thisYear: buildSeries(7, 42000, 2600),
  lastYear: buildSeries(31, 33000, 1500),
}

export const orderCounts = {
  thisYear: buildSeries(11, 320, 17),
  lastYear: buildSeries(53, 268, 11),
}

export const newCustomers = {
  thisYear: buildSeries(67, 184, 9),
  lastYear: buildSeries(89, 151, 6),
}

export const avgOrder = {
  thisYear: revenue.thisYear.map((point, i) => ({
    month: point.month,
    value: point.value / orderCounts.thisYear[i].value,
  })),
  lastYear: revenue.lastYear.map((point, i) => ({
    month: point.month,
    value: point.value / orderCounts.lastYear[i].value,
  })),
}

export const orders = buildOrders()

export const categories = Object.values(
  orders.reduce((acc, order) => {
    acc[order.category] ??= { name: order.category, value: 0 }
    acc[order.category].value += order.amount
    return acc
  }, {}),
).sort((a, b) => b.value - a.value)

export const customers = Object.values(
  orders.reduce((acc, order) => {
    acc[order.customer] ??= {
      name: order.customer,
      email: `${order.customer.toLowerCase().replace(' ', '.')}@example.com`,
      orders: 0,
      spent: 0,
      last: order.date,
    }

    acc[order.customer].orders += 1
    acc[order.customer].spent += order.amount
    if (order.date > acc[order.customer].last) acc[order.customer].last = order.date
    return acc
  }, {}),
).sort((a, b) => b.spent - a.spent)
