import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'todos'

// Load saved todos on first render so the list survives a page refresh.
function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(e) {
    e.preventDefault()
    const title = text.trim()
    if (!title) return

    setTodos([{ id: crypto.randomUUID(), title, done: false }, ...todos])
    setText('')
  }

  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  function clearCompleted() {
    setTodos(todos.filter((t) => !t.done))
  }

  const visible = todos.filter((t) => {
    if (filter === 'active') return !t.done
    if (filter === 'completed') return t.done
    return true
  })

  const remaining = todos.filter((t) => !t.done).length

  return (
    <main className="app">
      <h1>My Todos</h1>

      <form className="add-form" onSubmit={addTodo}>
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

      {visible.length === 0 ? (
        <p className="empty">Nothing here yet.</p>
      ) : (
        <ul className="todo-list">
          {visible.map((todo) => (
            <li key={todo.id} className={todo.done ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.title}</span>
              </label>
              <button
                className="delete"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete ${todo.title}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <footer className="summary">
        <span>{remaining} left</span>
        {todos.length > remaining && (
          <button onClick={clearCompleted}>Clear completed</button>
        )}
      </footer>
    </main>
  )
}

export default App
