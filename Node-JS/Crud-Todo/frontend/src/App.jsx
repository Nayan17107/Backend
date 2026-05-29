import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './redux/actions/todoActions'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const dispatch = useDispatch()
  const { items: todos, status } = useSelector((state) => state.todos)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos())
    }
  }, [status, dispatch])

  const handleAddTodo = (e) => {
    e.preventDefault()
    if (title.trim()) {
      dispatch(addTodo(title))
      setTitle('')
    }
  }

  const handleToggleTodo = (todo) => {
    dispatch(updateTodo({ id: todo._id, completed: !todo.completed }))
  }

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleStartEdit = (todo) => {
    setEditingId(todo._id)
    setEditTitle(todo.title)
  }

  const handleUpdateTodo = (id) => {
    if (editTitle.trim()) {
      dispatch(updateTodo({ id, title: editTitle }))
      setEditingId(null)
      setEditTitle('')
    }
  }

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            {editingId === todo._id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleUpdateTodo(todo._id)} className="save-btn">Save</button>
                <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
              </div>
            ) : (
              <>
                <span>{todo.title}</span>
                <div className="actions">
                  <button 
                    onClick={() => handleToggleTodo(todo)} 
                    className={`status-btn ${todo.completed ? 'undo' : 'done'}`}
                  >
                    {todo.completed ? 'Undo' : 'Done'}
                  </button>
                  <button onClick={() => handleStartEdit(todo)} className="edit-btn">Update</button>
                  <button onClick={() => handleDeleteTodo(todo._id)} className="delete-btn">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;