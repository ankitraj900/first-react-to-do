import React, { useState } from 'react';

const Task = ({ task, toggleTask, deleteTask, editTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(task.description);

    const handleEdit = () => {
        if (newDescription.trim()) {
            editTask(task.id, newDescription.trim());
            setIsEditing(false);
        }
    };

    return (
        <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <button onClick={handleEdit}>Save</button>
                </>
            ) : (
                <>
                    <span onClick={() => toggleTask(task.id)}>{task.description}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    );
};

export default Task;
