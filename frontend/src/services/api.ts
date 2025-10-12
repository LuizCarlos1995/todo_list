import axios from 'axios';
import { Task, TaskFormData } from '../types/Task';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const taskService = {
  // Listar todas as tarefas
  getAllTarefas: async (): Promise<Task[]> => {
    const response = await api.get('/tarefas');
    return response.data;
  },

  //busca tarefa por ID
  getTarefaById: async (id: number): Promise<Task[]> => {
    const response = await api.get(`/tarefas/${id}`);
    return response.data;
  },

  // Adicionar nova tarefa
  createTarefa: async (taskData: TaskFormData): Promise<Task> => {
    const response = await api.post('/tarefa/create', {
      ...taskData,
      status: 'pendente' // Status padrão para novas tarefas
    });
    return response.data;
  },

  // Atualizar por Id
  updateTarefa: async (id: number, taskData: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/update/${id}`, taskData);
    return response.data;
  },

  // Excluir tarefa por ID
  deleteTarefa: async (id: number): Promise<void> => {
    await api.delete(`/delete/${id}`);
  },

  // Marcar como concluída
  updateTarefaStatus: async (id: number, status: string): Promise<Task> => {
    const response = await api.patch(`/${id}/status`, { 
      status
    });
    return response.data;
  },

  // Filtrar por status
  filterTasksByStatus: async (status: string): Promise<Task[]> => {
    const response = await api.get(`/tasks?status=${status}`);
    return response.data;
  }
};