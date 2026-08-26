import { useEffect, useState } from 'react'
import { compute, format, pretty } from './math'
import './App.css'

const KEYS = [
  { label: 'AC', kind: 'util' },
  { label: '±', kind: 'util' },
  { label: '%', kind: 'util' },
  { label: '÷', kind: 'operator' },
  { label: '7' },
  { label: '8' },
  { label: '9' },
  { label: '×', kind: 'operator' },
  { label: '4' },
  { label: '5' },
  { label: '6' },
  { label: '−', kind: 'operator' },
  { label: '1' },
  { label: '2' },
  { label: '3' },
  { label: '+', kind: 'operator' },
  { label: '0', wide: true },
  { label: '.' },
  { label: '=', kind: 'equals' },
]

const KEYBOARD = {
  '/': '÷',
  '*': '×',
  '-': '−',
  '+': '+',
  '%': '%',
  '=': '=',
  Enter: '=',
  Escape: 'AC',
}

export default function App() {
  const [display, setDisplay] = useState('0')
  const [previous, setPrevious] = useState(null)
  const [operator, setOperator] = useState(null)
  const [fresh, setFresh] = useState(true)

  const clear = () => {
    setDisplay('0')
    setPrevious(null)
    setOperator(null)
    setFresh(true)
  }

  const typeDigit = (digit) => {
    if (fresh) {
      setDisplay(digit)
      setFresh(false)
      return
    }

    if (display === '0') {
      setDisplay(digit)
      return
    }

    if (display.replace(/[-.]/g, '').length < 12) setDisplay(display + digit)
  }

  const typeDot = () => {
    if (fresh) {
      setDisplay('0.')
      setFresh(false)
      return
    }

    if (!display.includes('.')) setDisplay(display + '.')
  }

  const chooseOperator = (next) => {
    const value = Number(display)

    if (previous !== null && operator && !fresh) {
      const result = compute(previous, value, operator)
      setDisplay(format(result))
      setPrevious(result)
    } else {
      setPrevious(value)
    }

    setOperator(next)
    setFresh(true)
  }

  const equals = () => {
    if (previous === null || !operator) return

    setDisplay(format(compute(previous, Number(display), operator)))
    setPrevious(null)
    setOperator(null)
    setFresh(true)
  }

  const backspace = () => {
    if (fresh) return

    const next = display.slice(0, -1)
    setDisplay(next === '' || next === '-' ? '0' : next)
  }

  const press = (key) => {
    if (key === 'AC') return clear()
    if (display === 'Error') return

    if (key >= '0' && key <= '9') return typeDigit(key)
    if (key === '.') return typeDot()
    if (key === '=') return equals()

    if (key === '±') {
      if (display !== '0') {
        setDisplay(display.startsWith('-') ? display.slice(1) : `-${display}`)
      }
      return
    }

    if (key === '%') {
      setDisplay(format(Number(display) / 100))
      setFresh(true)
      return
    }

    chooseOperator(key)
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Backspace') {
        backspace()
        return
      }

      const key = /^[0-9.]$/.test(e.key) ? e.key : KEYBOARD[e.key]
      if (!key) return

      e.preventDefault()
      press(key)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const shown = pretty(display)
  const history = operator ? `${pretty(format(previous))} ${operator}` : ''

  return (
    <div className="page">
      <main className="calc">
        <div className="screen">
          <p className="history">{history}</p>
          <p className={shown.length > 9 ? 'display long' : 'display'}>{shown}</p>
        </div>

        <div className="keys">
          {KEYS.map((key) => (
            <button
              key={key.label}
              className={[
                key.kind,
                key.wide && 'wide',
                operator === key.label && fresh && 'held',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => press(key.label)}
            >
              {key.label}
            </button>
          ))}
        </div>
      </main>

      <p className="tip">Your keyboard works too</p>
    </div>
  )
}
