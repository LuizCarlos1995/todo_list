import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterButtons from './FilterButtons';
import LoadingSpinner from './LoadingSpinner';
import { taskService } from '../../services/TaskService';
import { Task, TaskFormData } from '../../types/TaskInterface';
import './Task.css';

//Declaração de estado de dados e condições da tela.
const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'pendente' | 'prosseguindo' | 'concluido'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //carregamento inicial para busca tarefas na API
  useEffect(() => {
    loadTasks();
  }, []);

  //Sempre que as tarefas mudam atualizar o filtro
  useEffect(() => {
    filterTasks();
  }, [tasks, filter]);

  //Função que busca e atualizar as tarefas na API
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasksData = await taskService.getAllTarefas();
      setTasks(tasksData);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  //filtra as tarefas conforme o filtro ativo
  function filterTasks() {
    let filtered = tasks;

    if (filter !== 'all') {
      filtered = tasks.filter(task => task.status === filter);
    }

    setFilteredTasks(filtered);
  }

  //função que cria nova tarefa
  const handleCreateTask = async (taskData: TaskFormData) => {
    try {
      setError(null);
      const newTask = await taskService.createTarefa(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Erro ao criar tarefa');
      console.error('Error creating task:', err);
    }
  };

  //função que atualizar o status da tarefa
  const handleUpdateStatus = async (id: number, status: Task['status']) => {
    try {
      setError(null);
      //USAR updateTarefaStatus ao invés de updateTarefa
      const updatedTask = await taskService.updateTarefaStatus(id, status);

      setTasks(prev => prev.map(task =>
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError('Erro ao atualizar status da tarefa');
      console.error('Error updating task status:', err);
    }
  };

  //função que deleta a tarefa
  const handleDeleteTask = async (id: number) => {
    try {
      setError(null);
      await taskService.deleteTarefa(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Erro ao excluir tarefa');
      console.error('Error deleting task:', err);
    }
  };

  //função que edita o conteudo da tarefa.
  const handleUpdateTask = async (id: number, taskData: TaskFormData) => {
    try {
      setError(null);
      const updatedTask = await taskService.updateTarefa(id, taskData);
      setTasks(prev => prev.map(task =>
        task.id === id ? updatedTask : task
      ));
      setEditingTask(null);
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error('Erro ao atualizar tarefa:', err);
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
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Gerenciador de Tarefas</h1>

        </header>
        <main className="app-main">
          <div className="task-form-section">
            <TaskForm
              onSubmit={editingTask ? (taskData) => {
                if (editingTask.id) {
                  handleUpdateTask(editingTask.id, taskData);
                }
              } : handleCreateTask}
              editingTask={editingTask}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          <div className="task-list-section">
            <div className="section-header">
              <h2>Suas Tarefas</h2>
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

        <footer className="app-footer">
          <p>Total: {tasks.length} tarefas |
            Pendentes: {tasks.filter(t => t.status === 'pendente').length} |
            Prosseguindo: {tasks.filter(t => t.status === 'prosseguindo').length} |
            Concluídas: {tasks.filter(t => t.status === 'concluido').length}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;