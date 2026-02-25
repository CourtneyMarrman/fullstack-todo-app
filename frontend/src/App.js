
import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API = "http://localhost/todo-app/backend/";

  // Fetch tasks
  const fetchTasks = () => {
    fetch(API + "get_tasks.php")
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = () => {
    fetch(API + "add_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    })
    .then(res => res.json())
    .then(() => {
      setTitle("");
      setDescription("");
      fetchTasks();
    });
  };

  // Delete Task
  const deleteTask = (id) => {
    fetch(API + "delete_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    }).then(() => fetchTasks());
  };

  // Toggle Status
  const toggleStatus = (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";

    fetch(API + "update_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, status: newStatus })
    }).then(() => fetchTasks());
  };

  return (
    <div style={{ width: "500px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Todo App</h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button onClick={addTask} style={{ padding: "10px", width: "100%" }}>
        Add Task
      </button>

      <hr />

      {tasks.map(task => (
        <div key={task.id} style={{
          border: "1px solid #ddd",
          padding: "10px",
          marginTop: "10px"
        }}>
          <h4
            onClick={() => toggleStatus(task)}
            style={{
              textDecoration:
                task.status === "completed" ? "line-through" : "none",
              cursor: "pointer"
            }}
          >
            {task.title}
          </h4>
          <p>{task.description}</p>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;