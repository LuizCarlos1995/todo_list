import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'completed'

  // Buscar tarefas do backend
  const fetchTasks = async () => {
    try {
      let url = "http://localhost:5000/api/tasks";
      if (filter !== "all") {
        url += `?status=${filter}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  // Adicionar nova tarefa
  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        fetchTasks(); // Recarregar a lista
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  // Editar tarefa
  const editTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        fetchTasks(); // Recarregar a lista
      }
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  // Excluir tarefa
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTasks(); // Recarregar a lista
      }
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  // Alternar status da tarefa
  const toggleTaskStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "completed" ? "pending" : "completed";
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        fetchTasks(); // Recarregar a lista
      }
    } catch (error) {
      console.error("Erro ao alterar status da tarefa:", error);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Gerenciador de Tarefas</h1>
      </header>

      <div className="container">
        <TaskForm onAddTask={addTask} />

        <Filter currentFilter={filter} onFilterChange={setFilter} />

        <TaskList
          tasks={tasks}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onToggleStatus={toggleTaskStatus}
        />
      </div>
    </div>
  );
}

export default App;
