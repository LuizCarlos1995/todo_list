import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../../types/TaskInterface';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onUpdateStatus: (id: number, status: 'pendente' | 'prosseguindo' | 'concluido') => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onEditTask, 
  onDeleteTask, 
  onUpdateStatus 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhuma tarefa encontrada.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;