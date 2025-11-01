import React from 'react';
import './Task.css';

interface FilterButtonsProps {
  currentFilter: 'all' | 'pendente' | 'prosseguindo' | 'concluido';
  onFilterChange: (filter: 'all' | 'pendente' | 'prosseguindo' | 'concluido') => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-buttons">
      <button
        onClick={() => onFilterChange('all')}
        className={`btn ${currentFilter === 'all' ? 'btn-active' : 'btn-outline'}`}
      >
        Todas
      </button>
      <button
        onClick={() => onFilterChange('pendente')}
        className={`btn ${currentFilter === 'pendente' ? 'btn-active' : 'btn-outline'}`}
      >
        Pendentes
      </button>
      <button
        onClick={() => onFilterChange('prosseguindo')}
        className={`btn ${currentFilter === 'prosseguindo' ? 'btn-active' : 'btn-outline'}`}
      >
        Prosseguindo
      </button>
      <button
        onClick={() => onFilterChange('concluido')}
        className={`btn ${currentFilter === 'concluido' ? 'btn-active' : 'btn-outline'}`}
      >
        Concluídas
      </button>
    </div>
  );
};

export default FilterButtons;