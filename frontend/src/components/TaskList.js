import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEditTask, onDeleteTask, onToggleStatus }) => {
  const [editingId, setEditingId] = useState(null);

  if (tasks.length === 0) {
    return <div className="no-tasks">Nenhuma tarefa encontrada.</div>;
  }

  return (
    <div className="task-list">
      <h2>Lista de Tarefas</h2>

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onEditStart={() => setEditingId(task.id)}
          onEditCancel={() => setEditingId(null)}
          onEditTask={(updatedTask) => {
            onEditTask(task.id, updatedTask);
            setEditingId(null);
          }}
          onDeleteTask={() => onDeleteTask(task.id)}
          onToggleStatus={() => onToggleStatus(task.id, task.status)}
        />
      ))}
    </div>
  );
};

export default TaskList;
