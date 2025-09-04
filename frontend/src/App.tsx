import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import LoadingSpinner from './components/LoadingSpinner';
import { taskService } from './services/api';
import { Task, TaskFormData } from './types/Task';
import './styles/App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, filter]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = tasks;
    
    if (filter === 'completed') {
      filtered = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
      filtered = tasks.filter(task => !task.completed);
    }
    
    setFilteredTasks(filtered);
  };

  const handleCreateTask = async (taskData: TaskFormData) => {
    try {
      setError(null);
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Erro ao criar tarefa');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (!editingTask) return;

    try {
      setError(null);
      const updatedTask = await taskService.updateTask(editingTask._id!, {
        ...taskData,
        completed: editingTask.completed
      });
      
      setTasks(prev => prev.map(task => 
        task._id === editingTask._id ? updatedTask : task
      ));
      setEditingTask(null);
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setError(null);
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      setError('Erro ao excluir tarefa');
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      setError(null);
      const task = tasks.find(t => t._id === id);
      if (!task) return;

      const updatedTask = await taskService.updateTask(id, {
        completed: !task.completed
      });
      
      setTasks(prev => prev.map(t => 
        t._id === id ? updatedTask : t
      ));
    } catch (err) {
      setError('Erro ao atualizar status da tarefa');
      console.error('Error toggling task completion:', err);
    }
  };

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
          <p>Organize suas tarefas de forma simples e eficiente</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="close-error">×</button>
          </div>
        )}

        <main className="app-main">
          <div className="task-form-section">
            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
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
              onToggleComplete={handleToggleComplete}
            />
          </div>
        </main>

        <footer className="app-footer">
          <p>Total: {tasks.length} tarefas | 
            Concluídas: {tasks.filter(t => t.completed).length} | 
            Pendentes: {tasks.filter(t => !t.completed).length}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;