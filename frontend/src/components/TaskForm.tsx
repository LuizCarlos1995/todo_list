import React, { useState } from 'react';
import { TaskFormData } from '../types/Task';

interface TaskFormProps {
  onSubmit: (taskData: TaskFormData) => void;
  editingTask?: any;
  onCancelEdit?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, editingTask, onCancelEdit }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    titulo: editingTask?.titulo || '',
    descricao: editingTask?.descricao || ''
  });

React.useEffect(() => {
  if (editingTask) {
    setFormData({
      titulo: editingTask.titulo,
      descricao: editingTask.descricao || ''
    });
  } else {
    setFormData({ titulo: '', descricao: '' });
  }
}, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.titulo.trim()) {
      onSubmit(formData);
      setFormData({ titulo: '', descricao: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>
      
      <div className="form-group">
        <input
          type="text"
          name="titulo"
          placeholder="Título da tarefa"
          value={formData.titulo}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <textarea
          name="descricao"
          placeholder="Descrição (opcional)"
          value={formData.descricao}
          onChange={handleChange}
          rows={3}
          className="form-textarea"
        />
      </div>

      <div className="form-actions">
        {editingTask && (
          <button type="button" onClick={onCancelEdit} className="btn btn-cancel">
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Atualizar' : 'Adicionar'} Tarefa
        </button>
      </div>
    </form>
  );
};

export default TaskForm;