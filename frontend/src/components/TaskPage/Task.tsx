import React, { useState, useEffect, useCallback } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import FilterButtons from "./FilterButtons";
import LoadingSpinner from "./LoadingSpinner";
import { taskService } from "../../services/TaskService";
import type { Task, TaskFormData } from "../../types/TaskInterface";
import "./Task.css";

//Declaração de estado de dados e condições da tela.
const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<
    "all" | "pendente" | "prosseguindo" | "concluido"
  >("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //carregamento inicial para busca tarefas na API
  useEffect(() => {
    loadTasks();
  }, []);

  const filterTasks = useCallback(() => {
    let filtered = tasks;

    if (filter !== "all") {
      filtered = tasks.filter((task) => task.status === filter);
    }

    setFilteredTasks(filtered);
  }, [tasks, filter]);

  //Sempre que as tarefas mudam atualizar o filtro
  useEffect(() => {
    filterTasks();
  }, [filterTasks]);

  //Função que busca e atualizar as tarefas na API
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasksData = await taskService.getAllTarefas();
      setTasks(tasksData);
    } catch {
      setError("Erro ao carregar tarefas");
      console.error("Error loading tasks:");
    } finally {
      setLoading(false);
    }
  };

  //filtra as tarefas conforme o filtro ativo
  // function filterTasks() {
  //   let filtered = tasks;

  //   if (filter !== "all") {
  //     filtered = tasks.filter((task) => task.status === filter);
  //   }

  //   setFilteredTasks(filtered);
  // }

  //função que cria nova tarefa
  const handleCreateTask = async (taskData: TaskFormData) => {
    try {
      setError(null);
      const newTask = await taskService.createTarefa(taskData);
      setTasks((prev) => [...prev, newTask]);
    } catch {
      setError("Erro ao criar tarefa");
      console.error("Error creating task:");
    }
  };

  //função que atualizar o status da tarefa
  const handleUpdateStatus = async (id: number, status: Task["status"]) => {
    try {
      setError(null);
      //USAR updateTarefaStatus ao invés de updateTarefa
      const updatedTask = await taskService.updateTarefaStatus(id, status);

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task)),
      );
    } catch {
      setError("Erro ao atualizar status da tarefa");
      console.error("Error updating task status:");
    }
  };

  //função que deleta a tarefa
  const handleDeleteTask = async (id: number) => {
    try {
      setError(null);
      await taskService.deleteTarefa(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch {
      setError("Erro ao excluir tarefa");
      console.error("Error deleting task:");
    }
  };

  //função que edita o conteudo da tarefa.
  const handleUpdateTask = async (id: number, taskData: TaskFormData) => {
    try {
      setError(null);
      const updatedTask = await taskService.updateTarefa(id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task)),
      );
      setEditingTask(null);
    } catch {
      setError("Erro ao atualizar tarefa");
      console.error("Erro ao atualizar tarefa:");
    }
  };

  //controla o modo de edição, quando clica no editar
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div
        className="
        max-w-4xl mx-auto
        bg-white/95 dark:bg-slate-900/90
        rounded-2xl shadow-xl
        overflow-hidden
        border border-slate-200 dark:border-slate-800
        backdrop-blur
      "
      >
        {/* HEADER */}
        <header
          className="
          bg-gradient-to-r from-sky-400 to-cyan-400
          dark:from-sky-600 dark:to-cyan-600
          text-white
          p-8
          text-center
        "
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            Gerenciador de Tarefas
          </h1>
        </header>

        {/* MAIN */}
        <main className="p-6 md:p-8">
          {/* 🔴 BLOCO DE ERRO */}
          {error && (
            <div
              className="
              mb-4 rounded-md border px-3 py-2 text-sm
              border-red-200 bg-red-50 text-red-700
              dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200
              flex items-center justify-between gap-3
            "
              role="alert"
            >
              <span>{error}</span>

              <button
                type="button"
                onClick={() => setError(null)}
                className="
                rounded-md px-2 py-1 text-xs font-medium
                hover:bg-red-100 dark:hover:bg-red-900/30
              "
                aria-label="Fechar erro"
              >
                Fechar
              </button>
            </div>
          )}

          {/* FORM */}
          <div className="mb-8">
            <TaskForm
              onSubmit={
                editingTask
                  ? (taskData) => {
                      if (editingTask.id) {
                        handleUpdateTask(editingTask.id, taskData);
                      }
                    }
                  : handleCreateTask
              }
              editingTask={editingTask}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {/* LISTA */}
          <div>
            <div
              className="
              flex flex-wrap items-center justify-between
              gap-4 mb-6
            "
            >
              <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                Suas Tarefas
              </h2>

              <FilterButtons
                currentFilter={filter}
                onFilterChange={setFilter}
              />
            </div>

            <TaskList
              tasks={filteredTasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        </main>

        {/* FOOTER */}
        <footer
          className="
          bg-slate-50 dark:bg-slate-900
          border-t border-slate-200 dark:border-slate-800
          text-slate-600 dark:text-slate-300
          text-sm
          px-6 py-4
          text-center
        "
        >
          <p>
            Total: {tasks.length} tarefas | Pendentes:{" "}
            {tasks.filter((t) => t.status === "pendente").length} |
            Prosseguindo:{" "}
            {tasks.filter((t) => t.status === "prosseguindo").length} |
            Concluídas: {tasks.filter((t) => t.status === "concluido").length}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
