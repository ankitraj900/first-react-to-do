import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load tasks from local storage on app initialization
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) setTasks(storedTasks);
    }, []);

    // Save tasks to local storage when tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Apply dark mode class to the body
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    // Add a new task
    const addTask = (description) => {
        const newTask = { id: Date.now(), description, completed: false };
        setTasks([...tasks, newTask]);
    };

    // Toggle completion status of a task
    const toggleTask = (id) => {
      setTasks(
          tasks.map((task) =>
              task.id === id
                  ? { ...task, completed: !task.completed } // Toggle completion status
                  : task
          )
      );
  };

    // Delete a task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Edit an existing task
    const editTask = (id, newDescription) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, description: newDescription } : task
            )
        );
    };

    // Filter tasks based on completion status
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true; // For 'all'
    });

    return (
        <div className="app-container">
            <h1>To-Do List</h1>
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
                Toggle Dark Mode
            </button>
            <TaskForm addTask={addTask} />
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('incomplete')}>Incomplete</button>
            </div>
            <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />
        </div>
    );
};

export default App;
