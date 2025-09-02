import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
    });

    // Limpar formulário
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Adicionar Nova Tarefa</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
      </div>

      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TaskForm;
