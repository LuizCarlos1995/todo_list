import db from "../config/database";
import type { Tarefa, TarefaQuery, CreateTarefaDto, UpdateTarefaDto, UpdateStatusDto } from "../types/taskInterfaces";

// Buscar todas as tarefas com filtro opcional
export const findAllTarefas = (userId: number): Promise<Tarefa[]> => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM tarefas WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
      (err: any, rows: any[]) => {
        if (err) return reject(err);
        resolve(rows as Tarefa[]);
      }
    );
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
export const createTarefa = (userId: number, data: CreateTarefaDto): Promise<Tarefa> => {
  return new Promise((resolve, reject) => {
    const { titulo, descricao, status = "pendente" } = data;

    db.query(
      "INSERT INTO tarefas (titulo, descricao, status, user_id) VALUES (?, ?, ?, ?)",
      [titulo, descricao, status, userId],
      (err: any, result: any) => {
        if (err) return reject(err);

        const insertId = result.insertId;

        db.query(
          "SELECT * FROM tarefas WHERE id = ? AND user_id = ?",
          [insertId, userId],
          (err2: any, rows: any[]) => {
            if (err2) return reject(err2);
            resolve(rows[0]);
          }
        );
      }
    );
  });
};

// Deletar tarefa
export const deleteTarefa = (userId: number, id: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM tarefas WHERE id = ? AND user_id = ?",
      [id, userId],
      (err: any, results: any) => {
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      }
    );
  });
};

// Atualizar tarefa completa e retornar a tarefa atualizada
export const updateTarefa = (
  userId: number,
  id: string,
  tarefaData: UpdateTarefaDto
): Promise<Tarefa | null> => {
  return new Promise((resolve, reject) => {
    const { titulo, descricao } = tarefaData;

    db.query(
      "UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ? AND user_id = ?",
      [titulo, descricao, id, userId],
      (err: any, results: any) => {
        if (err) return reject(err);

        if (results.affectedRows === 0) {
          resolve(null); // não existe OU não pertence ao usuário
          return;
        }

        db.query(
          "SELECT * FROM tarefas WHERE id = ? AND user_id = ?",
          [id, userId],
          (err2: any, rows: any[]) => {
            if (err2) return reject(err2);
            resolve(rows[0] || null);
          }
        );
      }
    );
  });
};


// Atualizar apenas o status da tarefa e retornar a tarefa atualizada
export const updateTarefaStatus = (id: string, statusData: UpdateStatusDto): Promise<Tarefa | null> => {
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
        if (results.affectedRows === 0) {
          resolve(null);
          return;
        }

        //Buscar a tarefa atualizada e retornar
        db.query(
          "SELECT * FROM tarefas WHERE id = ?",
          [id],
          (err2: any, rows: any[]) => {
            if (err2) {
              reject(err2);
              return;
            }

            resolve(rows[0]); // Retorna a tarefa atualizada
          }
        );
      }
    );
  });
};