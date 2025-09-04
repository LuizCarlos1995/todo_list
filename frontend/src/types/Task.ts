export interface Task {
  completed: boolean;
  id?: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'prosseguindo' | 'concluido';
  created_at?: string;
  updated_at?: string;
}

export interface TaskFormData {
  titulo: string;
  descricao: string;
}