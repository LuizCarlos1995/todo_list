import React from "react";

const Filter = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter">
      <h2>Filtrar Tarefas</h2>

      <div className="filter-options">
        <button
          className={currentFilter === "all" ? "active" : ""}
          onClick={() => onFilterChange("all")}
        >
          Todas
        </button>

        <button
          className={currentFilter === "pending" ? "active" : ""}
          onClick={() => onFilterChange("pending")}
        >
          Pendentes
        </button>

        <button
          className={currentFilter === "completed" ? "active" : ""}
          onClick={() => onFilterChange("completed")}
        >
          Concluídas
        </button>
      </div>
    </div>
  );
};

export default Filter;
