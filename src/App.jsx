import React, { useState } from "react";
import './App.css'

const initialTasks = [ /* Paste your JSON task data here */ ];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("All");
  const [newTask, setNewTask] = useState("");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const task = {
      userId: 1,
      id: newId,
      title: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const unfinishedCount = tasks.filter((task) => !task.completed).length;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Todo List</h2>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task"
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      <button onClick={addTask}>Add</button>

      <div style={{ margin: "20px 0" }}>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.title}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{unfinishedCount} task(s) left</span>
        <button onClick={clearCompleted}>Clear completed</button>
      </div>
    </div>
  );
}