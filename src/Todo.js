import './App.css';
import Delete from './icons/delete';

function TodoForm ({todo, toggleTask, removeTask}) {
    return (
        <div key={todo.id} className="item-todo">
            <div className={todo.complete ? "item-text strike" : "item-text"}
             onClick={() => toggleTask(todo.id)}>
                {todo.name}
            </div>
            <Delete className="item-delete" onClick={() => removeTask(todo.id)}>
            </Delete>
        </div>
    )
}

export default TodoForm