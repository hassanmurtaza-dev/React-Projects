import ChartCard from '../components/ChartCard'
import CategoryBars from '../components/CategoryBars'
import RevenueChart from '../components/RevenueChart'
import StatTile from '../components/StatTile'
import { avgOrder, categories, newCustomers, orderCounts, revenue } from '../data'
import { compactMoney, money } from '../format'

const total = (points) => points.reduce((sum, point) => sum + point.value, 0)
const mean = (points) => total(points) / points.length
const growth = (now, before) => ((now - before) / before) * 100

const SERIES = [
  { key: 'thisYear', label: 'This year', color: 'var(--series-1)', points: revenue.thisYear },
  { key: 'lastYear', label: 'Last year', color: 'var(--series-2)', points: revenue.lastYear },
]

export default function Overview() {
  const tiles = [
    {
      label: 'Revenue',
      value: money(total(revenue.thisYear)),
      delta: growth(total(revenue.thisYear), total(revenue.lastYear)),
      trend: revenue.thisYear.map((p) => p.value),
    },
    {
      label: 'Orders',
      value: Math.round(total(orderCounts.thisYear)).toLocaleString('en-US'),
      delta: growth(total(orderCounts.thisYear), total(orderCounts.lastYear)),
      trend: orderCounts.thisYear.map((p) => p.value),
    },
    {
      label: 'New customers',
      value: Math.round(total(newCustomers.thisYear)).toLocaleString('en-US'),
      delta: growth(total(newCustomers.thisYear), total(newCustomers.lastYear)),
      trend: newCustomers.thisYear.map((p) => p.value),
    },
    {
      label: 'Average order',
      value: money(mean(avgOrder.thisYear)),
      delta: growth(mean(avgOrder.thisYear), mean(avgOrder.lastYear)),
      trend: avgOrder.thisYear.map((p) => p.value),
    },
  ]

  return (
    <>
      <div className="tiles">
        {tiles.map((tile) => (
          <StatTile key={tile.label} {...tile} />
        ))}
      </div>

      <ChartCard
        title="Revenue"
        subtitle="Monthly, this year against last year"
        table={
          <table className="data">
            <thead>
              <tr>
                <th>Month</th>
                <th className="num">This year</th>
                <th className="num">Last year</th>
              </tr>
            </thead>
            <tbody>
              {revenue.thisYear.map((point, i) => (
                <tr key={point.month}>
                  <td>{point.month}</td>
                  <td className="num">{money(point.value)}</td>
                  <td className="num">{money(revenue.lastYear[i].value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      >
        <RevenueChart series={SERIES} />
      </ChartCard>

      <ChartCard
        title="Revenue by category"
        subtitle="Last 90 days"
        table={
          <table className="data">
            <thead>
              <tr>
                <th>Category</th>
                <th className="num">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td className="num">{money(item.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      >
        <CategoryBars items={categories} />
      </ChartCard>

      <p className="footnote">
        Figures are generated sample data — {compactMoney(total(revenue.thisYear))} across
        twelve months.
      </p>
    </>
  )
}
