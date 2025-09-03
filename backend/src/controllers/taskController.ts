
import type { Request, Response } from "express";
import db from "../config/database";

// Interface para tipagem da tarefa
interface tarefa {
  id?: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  created_at?: Date;
}

// Interface para query parameters
interface TarefaQuery {
  status?: string;
}

// Buscar todas as tarefas
export const getAllTarefas = (
  req: Request<{}, any, any, TarefaQuery>,
  res: Response
): void => {
  const { status } = req.query;
  let query = "SELECT * FROM tarefas";

  if (status) {
    query += ` WHERE status = '${status}'`;
  }

  query += " ORDER BY created_at DESC";

  db.query(query, (err: any, results: tarefa[]) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

// Buscar tarefa por ID
export const getTarefaById = (
  req: Request<{ id: string }>,
  res: Response
): void => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM tarefas WHERE id = ?",
    [id],
    (err: any, results: any) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ message: "Tarefa não encontrada" });
        return;
      }
      res.json(results[0]);
    }
  );
};

// Criar nova tarefa
export const createTarefa = (
  req: Request<{}, any, Pick<tarefa, "title" | "description">>,
  res: Response
): void => {
  const { title, description } = req.body;
  db.query(
    "INSERT INTO tarefas (title, description) VALUES (?, ?)",
    [title, description],
    (err: any, results: any) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res
        .status(201)
        .json({ id: results.insertId, title, description, status: "pending" });
    }
  );
};

// Atualizar tarefa
export const updateTarefa = (
  req: Request<{ id: string }, any, Partial<tarefa>>,
  res: Response
): void => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  db.query(
    "UPDATE tarefas SET title = ?, description = ?, status = ? WHERE id = ?",
    [title, description, status, id],
    (err: any, results: any) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: "Tarefa não encontrada" });
        return;
      }
      res.json({ message: "Tarefa atualizada com sucesso" });
    }
  );
};

// Deletar tarefa
export const deleteTarefa = (
  req: Request<{ id: string }>,
  res: Response
): void => {
  const { id } = req.params;
  db.query("DELETE FROM tarefas WHERE id = ?", [id], (err: any, results: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }
    res.json({ message: "Tarefa deletada com sucesso" });
  });
};

// Atualizar status da tarefa
export const updateTarefaStatus = (
  req: Request<{ id: string }, any, Pick<tarefa, "status">>,
  res: Response
): void => {
  const { id } = req.params;
  const { status } = req.body;
  db.query(
    "UPDATE tarefas SET status = ? WHERE id = ?",
    [status, id],
    (err: any, results: any) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: "Tarefa não encontrada" });
        return;
      }
      res.json({ message: "Status da tarefa atualizado com sucesso" });
    }
  );
};
