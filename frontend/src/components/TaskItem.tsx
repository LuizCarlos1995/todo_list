import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <h4 className="task-title">{task.title}</h4>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
            {task.completed ? 'Concluída' : 'Pendente'}
          </span>
          <span className="task-date">
            {new Date(task.createdAt!).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>
      
      <div className="task-actions">
        <button
          onClick={() => onToggleComplete(task._id!)}
          className={`btn ${task.completed ? 'btn-warning' : 'btn-success'}`}
        >
          {task.completed ? 'Desfazer' : 'Concluir'}
        </button>
        
        <button
          onClick={() => onEdit(task)}
          className="btn btn-secondary"
          disabled={task.completed}
        >
          Editar
        </button>
        
        <button
          onClick={() => onDelete(task._id!)}
          className="btn btn-danger"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default TaskItem;