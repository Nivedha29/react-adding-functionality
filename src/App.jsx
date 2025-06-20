import React, { useState } from 'react';
import TaskList from './TaskList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');

  const addTask = () => {
    if (!newTask.trim()) return;
    const newEntry = {
      id: uuidv4(),
      title: newTask.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newEntry]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'Active' ? !task.completed :
    filter === 'Completed' ? task.completed : true
  );

  const activeCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filter-section">
        {['All', 'Active', 'Completed'].map(tab => (
          <button key={tab} onClick={() => setFilter(tab)}>{tab}</button>
        ))}
      </div>

      <TaskList tasks={filteredTasks} onToggle={toggleTask} />

      <div className="footer">
        <span>{activeCount} task{activeCount !== 1 ? 's' : ''} left</span>
        <button onClick={clearCompleted}>Clear completed</button>
      </div>
    </div>
  );
}
