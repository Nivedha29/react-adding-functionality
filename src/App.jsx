import React, { useState } from 'react';
import './App.css';

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [newTitle, setNewTitle] = useState('');

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    const newTask = {
      userId: 1,
      id: Date.now(),
      title: newTitle,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setNewTitle('');
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  const remainingCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      <div className="input-row">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="filter-buttons">
        {['All', 'Active', 'Completed'].map(tab => (
          <button
            key={tab}
            className={filter === tab ? 'active' : ''}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span className={task.completed ? 'completed' : ''}>{task.title}</span>
          </li>
        ))}
      </ul>

      <div className="footer">
        <span>{remainingCount} tasks left</span>
        <button className="clear" onClick={handleClearCompleted}>
          Clear completed
        </button>
      </div>
    </div>
  );
}

