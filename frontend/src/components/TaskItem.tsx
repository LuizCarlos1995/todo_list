import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onUpdateStatus: (id: number, status: Task['status']) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className={`task-item ${task.status === 'concluido' ? 'concluido' : ''}`}>
      <div className="task-content">
        <h4 className="task-titulo">{task.titulo}</h4>
        {task.descricao && (
          <p className="task-descricao">{task.descricao}</p>
        )}
        <div className="task-meta">
          <span className={`task-status ${task.status === 'concluido' ? 'concluido' : 'pending'}`}>
            {task.status === 'concluido' ? 'Concluída' : 'Pendente'}
          </span>
          <span className="task-date">
            {new Date(task.created_at!).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>
      
      <div className="task-actions">
        <button
          onClick={() => onToggleComplete(task.id!)}
          className={`btn ${task.status === 'concluido' ? 'btn-warning' : 'btn-success'}`}
        >
          {task.status === 'concluido' ? 'Desfazer' : 'Concluir'}
        </button>
        
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