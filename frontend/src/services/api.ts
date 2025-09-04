import { Task, TaskFormData } from '../types/Task';

const API_BASE_URL = 'http://localhost:5000/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const taskService = {
  // Listar todas as tarefas
  getTasks: async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return handleResponse(response);
  },

  // Adicionar nova tarefa
  createTask: async (taskData: TaskFormData): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  // Editar tarefa
  updateTask: async (id: string, taskData: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  // Excluir tarefa
  deleteTask: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  // Marcar como concluída
  completeTask: async (id: string): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: true }),
    });
    return handleResponse(response);
  },

  // Filtrar por status
  filterTasksByStatus: async (completed: boolean): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks?completed=${completed}`);
    return handleResponse(response);
  }
};