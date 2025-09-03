// Interface para tipagem da tarefa
export interface Tarefa {
  id?: number;
  titulo: string;
  descricao: string;
  status: "pendente" | "prosseguindo" | "concluido";
  created_at?: Date;
}

// Interface para query parameters
export interface TarefaQuery {
  status?: "pendente" | "prosseguindo" | "concluido";
}
// Interface para criação de tarefa (sem id e created_at)
export interface CreateTarefaDto {
  titulo: string;
  descricao: string;
}

// Interface para atualização de tarefa (campos opcionais)
export interface UpdateTarefaDto {
  titulo?: string;
  descricao?: string;
  status?: "pendente" | "prosseguindo" | "concluido";
}

// Interface para atualização apenas do status
export interface UpdateStatusDto {
  status: "pendente" | "prosseguindo" | "concluido";
}