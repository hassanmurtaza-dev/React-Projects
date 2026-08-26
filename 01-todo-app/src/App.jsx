import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'todos'

function getSavedTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState(getSavedTodos)
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = text.trim()
    if (!title) return

    setTodos([{ id: crypto.randomUUID(), title, done: false }, ...todos])
    setText('')
  }

  const toggle = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const remove = (id) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.done))
  }

  const shown = todos.filter((t) => {
    if (filter === 'active') return !t.done
    if (filter === 'completed') return t.done
    return true
  })

  const left = todos.filter((t) => !t.done).length

  return (
    <main className="app">
      <h1>My Todos</h1>

      <form className="add-form" onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          aria-label="New todo"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="empty">Nothing here yet.</p>
      ) : (
        <ul className="todo-list">
          {shown.map((todo) => (
            <li key={todo.id} className={todo.done ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggle(todo.id)}
                />
                <span>{todo.title}</span>
              </label>
              <button
                className="delete"
                onClick={() => remove(todo.id)}
                aria-label={`Delete ${todo.title}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <footer className="summary">
        <span>{left} left</span>
        {todos.length > left && (
          <button onClick={clearCompleted}>Clear completed</button>
        )}
      </footer>
    </main>
  )
}
