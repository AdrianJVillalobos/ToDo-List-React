import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/styles.css'; 

function TodoForm({ onSubmit, editingTodo }) {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
        } else {
            setTitle('');
        }
    }, [editingTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;

        onSubmit(title);
        setTitle('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                placeholder="Add a new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button className="todo-button" type="submit">
                {editingTodo ? 'Update' : 'Add'}
            </button>
        </form>
    );
}

TodoForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    editingTodo: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        completed: PropTypes.bool,
    }),
};

export default TodoForm;

