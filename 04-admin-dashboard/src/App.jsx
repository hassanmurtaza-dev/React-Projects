import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from './ThemeContext'

const ICONS = {
  overview: 'M3 3h7v7H3zM14 3h7v4h-7zM14 10h7v11h-7zM3 13h7v8H3z',
  orders: 'M4 3h13l3 3v15H4zM8 9h8M8 13h8M8 17h5',
  customers: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M17 8h5M19.5 5.5v5',
}

const LINKS = [
  { to: '/', label: 'Overview', icon: 'overview', end: true },
  { to: '/orders', label: 'Orders', icon: 'orders' },
  { to: '/customers', label: 'Customers', icon: 'customers' },
]

const TITLES = {
  '/': 'Overview',
  '/orders': 'Orders',
  '/customers': 'Customers',
}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d={ICONS[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">N</span>
          <span className="brand-name">Northwind</span>
        </div>

        <nav>
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              <Icon name={link.icon} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <p className="sidebar-foot">Sample data · no backend</p>
      </aside>

      <div className="main">
        <header className="topbar">
          <div>
            <h1>{TITLES[pathname] ?? 'Overview'}</h1>
            <p className="topbar-sub">Last 12 months</p>
          </div>

          <button className="theme" onClick={toggle}>
            {theme === 'dark' ? '☀' : '☾'}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
