import axios from 'axios';
import { Task, TaskFormData } from '../types/Task';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const taskService = {
  // Listar todas as tarefas
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Adicionar nova tarefa
  createTask: async (taskData: TaskFormData): Promise<Task> => {
    const response = await api.post('/tasks', {
      ...taskData,
      status: 'pendente' // Status padrão para novas tarefas
    });
    return response.data;
  },

  // Editar tarefa
  updateTask: async (id: number, taskData: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Excluir tarefa
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  // Marcar como concluída
  completeTask: async (id: number): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}`, { 
      status: 'concluido' 
    });
    return response.data;
  },

  // Filtrar por status
  filterTasksByStatus: async (status: string): Promise<Task[]> => {
    const response = await api.get(`/tasks?status=${status}`);
    return response.data;
  }
};