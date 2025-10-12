import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onUpdateStatus: (id: number, status: 'pendente' | 'prosseguindo' | 'concluido') => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onUpdateStatus }) => {
   const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateStatus(task.id!, e.target.value as 'pendente' | 'prosseguindo' | 'concluido');
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'pendente': 'Pendente',
      'prosseguindo': 'prosseguindo',
      'concluido': 'Concluída'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className={`task-item ${task.status === 'concluido' ? 'concluido' : ''}`}>
      <div className="task-content">
        <h4 className="task-titulo">{task.titulo}</h4>
        {task.descricao && (
          <p className="task-descricao">{task.descricao}</p>
        )}
        <div className="task-meta">
          <span className={`task-status status-${task.status}`}>
            {getStatusLabel(task.status)}
          </span>
          <span className="task-date">
            {new Date(task.created_at!).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>
      
      <div className="task-actions">      
        <select 
          value={task.status} 
          onChange={handleStatusChange}
          className={`status-select select-${task.status}`}
        >
          <option value="pendente">📋 Pendente</option>
          <option value="prosseguindo">⚙️ prosseguindo</option>
          <option value="concluido">✅ Concluída</option>
        </select>
        
        <button
          onClick={() => onEdit(task)}
          className="btn btn-secondary"
          disabled={task.status === 'concluido'}
        >
          Editar
        </button>
        
        <button
          onClick={() => onDelete(task.id!)}
          className="btn btn-danger"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default TaskItem;