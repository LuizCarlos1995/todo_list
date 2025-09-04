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
  const [filter, setFilter] = useState<'all' | 'pendente' | 'prosseguindo' | 'concluido'>('all');
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
    
    if (filter !== 'all') {
      filtered = tasks.filter(task => task.status === filter);
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

  const handleUpdateStatus = async (id: number, status: Task['status']) => {
    try {
      setError(null);
      const updatedTask = await taskService.updateTask(id, { status });
      
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError('Erro ao atualizar status da tarefa');
      console.error('Error updating task status:', err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      setError(null);
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Erro ao excluir tarefa');
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleComplete = async (id: number) => {
    try {
      setError(null);
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const updatedTask = await taskService.updateTask(id, {
        completed: !task.completed
      });
      
      setTasks(prev => prev.map(t => 
        t.id === id ? updatedTask : t
      ));
    } catch (err) {
      setError('Erro ao atualizar status da tarefa');
      console.error('Error toggling task completion:', err);
    }
  };

  const handleUpdateTask = async (id: number, taskData: TaskFormData) => {
  try {
    setError(null);
    const updatedTask = await taskService.updateTask(id, taskData);
    setTasks(prev => prev.map(task => 
      task.id === id ? updatedTask : task
    ));
    setEditingTask(null);
  } catch (err) {
    setError('Erro ao atualizar tarefa');
    console.error('Error updating task:', err);
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
        {/* ... header e error message ... */}

        <main className="app-main">
          <div className="task-form-section">
            <TaskForm
            onSubmit={editingTask ? (taskData) => {
              if (editingTask.id) {   // Para edição, você precisa definir como vai atualizar
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
              onToggleComplete={handleToggleComplete}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        </main>

        <footer className="app-footer">
          <p>Total: {tasks.length} tarefas | 
            Pendentes: {tasks.filter(t => t.status === 'pendente').length} | 
            Em Progresso: {tasks.filter(t => t.status === 'prosseguindo').length} |
            Concluídas: {tasks.filter(t => t.status === 'concluido').length}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;