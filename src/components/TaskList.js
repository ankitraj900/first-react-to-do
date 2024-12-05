import React from 'react';

const TaskList = ({ tasks, toggleTask, deleteTask }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                    <div>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)} // Toggle completion when checkbox is clicked
                        />
                        <span>{task.description}</span>
                    </div>
                    <div className="task-actions">
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
