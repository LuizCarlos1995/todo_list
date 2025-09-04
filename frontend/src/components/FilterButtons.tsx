import React from 'react';

interface FilterButtonsProps {
  currentFilter: 'all' | 'completed' | 'pending';
  onFilterChange: (filter: 'all' | 'completed' | 'pending') => void;
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
        onClick={() => onFilterChange('pending')}
        className={`btn ${currentFilter === 'pending' ? 'btn-active' : 'btn-outline'}`}
      >
        Pendentes
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={`btn ${currentFilter === 'completed' ? 'btn-active' : 'btn-outline'}`}
      >
        Concluídas
      </button>
    </div>
  );
};

export default FilterButtons;