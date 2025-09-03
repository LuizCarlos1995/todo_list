import db from "../config/database";
import type { Tarefa, TarefaQuery, CreateTarefaDto, UpdateTarefaDto, UpdateStatusDto } from "../types/interfaces";

// Buscar todas as tarefas com filtro opcional
export const findAllTarefas = (filters: TarefaQuery): Promise<Tarefa[]> => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM tarefas";
    
    if (filters.status) {
      query += ` WHERE status = '${filters.status}'`;
    }
    
    query += " ORDER BY created_at DESC";

    db.query(query, (err: any, results: Tarefa[]) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

// Buscar tarefa por ID
export const findTarefaById = (id: string): Promise<Tarefa | null> => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM tarefas WHERE id = ?",
      [id],
      (err: any, results: any) => {
        if (err) {
          reject(err);
          return;
        }
        if (results.length === 0) {
          resolve(null);
          return;
        }
        resolve(results[0]);
      }
    );
  });
};

// Criar nova tarefa
export const createTarefa = (tarefaData: CreateTarefaDto): Promise<Tarefa> => {
  return new Promise((resolve, reject) => {
    const { titulo, descricao } = tarefaData;
    
    db.query(
      "INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)",
      [titulo, descricao],
      (err: any, results: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          id: results.insertId,
          titulo,
          descricao,
          status: "pendente"
        });
      }
    );
  });
};

// Atualizar tarefa completa
export const updateTarefa = (id: string, tarefaData: UpdateTarefaDto): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const { titulo, descricao, status } = tarefaData;
    
    db.query(
      "UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?",
      [titulo, descricao, status, id],
      (err: any, results: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows > 0);
      }
    );
  });
};

// Deletar tarefa
export const deleteTarefa = (id: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM tarefas WHERE id = ?",
      [id],
      (err: any, results: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows > 0);
      }
    );
  });
};

// Atualizar apenas o status da tarefa
export const updateTarefaStatus = (id: string, statusData: UpdateStatusDto): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const { status } = statusData;
    
    db.query(
      "UPDATE tarefas SET status = ? WHERE id = ?",
      [status, id],
      (err: any, results: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows > 0);
      }
    );
  });
};