import React, { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (description.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        description,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setDescription('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (id: number, currentDescription: string) => {
    setEditId(id);
    setEditDescription(currentDescription);
  };

  const saveEdit = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, description: editDescription } : todo
      )
    );
    setEditId(null);  // Reset edit state
    setEditDescription('');  // Clear edit description
  };

  return (
    <div className="app-container">
      <header>
        <h1>Task Master</h1>
      </header>

      <main>
        <div className="input-section">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTodo}>Add Task</button>
        </div>

        <div className="list-section">
          <ul className="todo-list">
            {todos.length === 0 ? (
              <p>No tasks available. Add a new one!</p>
            ) : (
              todos.map((todo) => (
                <li key={todo.id}>
                  {editId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Edit task description..."
                      />
                      <button onClick={() => saveEdit(todo.id)}>Save</button>
                    </>
                  ) : (
                    <>
                      <span className={todo.completed ? 'completed-task' : ''}>
                        {todo.description}
                      </span>
                      <div className="todo-buttons">
                        <button onClick={() => toggleComplete(todo.id)}>
                          {todo.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => startEditing(todo.id, todo.description)}>
                          Edit
                        </button>
                        <button onClick={() => deleteTodo(todo.id)} className="delete">
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </main>

      <footer>
        <p>Task Master &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;