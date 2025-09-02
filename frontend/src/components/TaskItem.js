import React, { useState } from "react";

const TaskItem = ({
  task,
  isEditing,
  onEditStart,
  onEditCancel,
  onEditTask,
  onDeleteTask,
  onToggleStatus,
}) => {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );

  const handleSave = () => {
    onEditTask({
      title: editTitle.trim(),
      description: editDescription.trim(),
      status: task.status,
    });
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    onEditCancel();
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="form-group">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows="3"
          />
        </div>

        <div className="task-actions">
          <button onClick={handleSave}>Salvar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`task-item ${task.status === "completed" ? "completed" : ""}`}
    >
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <span className={`status ${task.status}`}>
            {task.status === "completed" ? "Concluída" : "Pendente"}
          </span>
          <span className="date">
            Criada em: {new Date(task.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button className="toggle-btn" onClick={onToggleStatus}>
          {task.status === "completed"
            ? "Marcar como Pendente"
            : "Marcar como Concluída"}
        </button>

        <button className="edit-btn" onClick={onEditStart}>
          Editar
        </button>

        <button className="delete-btn" onClick={onDeleteTask}>
          Excluir
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
