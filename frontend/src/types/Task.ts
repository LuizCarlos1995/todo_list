export interface Task {
  id?: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'prosseguindo' | 'concluido';
  created_at?: string;
}

export interface TaskFormData {
  titulo: string;
  descricao: string;
}