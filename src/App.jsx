import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './styles/styles.css'; 

function App() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await fetch('http://localhost:3000/api/todos');
        const data = await response.json();
        setTodos(data);
    };

    const addTodo = async (title) => {
        const response = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
    };

    const updateTodo = async (title) => {
        if (!editingTodo) return;
        const response = await fetch(`http://localhost:3000/api/todos/${editingTodo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });
        const updatedTodo = await response.json();
        setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
        setEditingTodo(null);
    };

    const deleteTodo = async (id) => {
        await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'DELETE',
        });
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = async (id) => {
        const todo = todos.find(todo => todo.id === id);
        const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !todo.completed }),
        });
        const updatedTodo = await response.json();
        setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    };

    return (
        <div className="app-container">
            <h1 className="app-title">To-Do List</h1>
            <TodoForm onSubmit={editingTodo ? updateTodo : addTodo} editingTodo={editingTodo} />
            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={setEditingTodo}
            />
        </div>
    );
}

export default App;
