import PropTypes from 'prop-types';
import '../styles/styles.css'; 
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span className="todo-title">
                {todo.title}
            </span>
            <button className="edit-button" onClick={() => onEdit(todo)}>Edit</button>
            <button className="delete-button" onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    );
}

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default TodoItem;
