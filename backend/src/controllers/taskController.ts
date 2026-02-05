import type { Request, Response } from "express";
import * as tarefaService from "../services/taskService";
import type { TarefaQuery, CreateTarefaDto, UpdateTarefaDto, UpdateStatusDto } from "../types/taskInterfaces";

// Buscar todas as tarefas
export const getAllTarefas = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Usuário não autenticado" });

    const tarefas = await tarefaService.findAllTarefas(userId);
    return res.json(tarefas);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erro ao listar tarefas" });
  }
};

// export const getAllTarefas = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const tarefas = await tarefaService.findAllTarefas({});
//     res.json(tarefas);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Buscar tarefa por ID
export const getTarefaById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const tarefa = await tarefaService.findTarefaById(id);
    
    if (!tarefa) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }
    
    res.json(tarefa);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Criar nova tarefa
export const createTarefa = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Usuário não autenticado" });

    const data: CreateTarefaDto = req.body;

    const tarefa = await tarefaService.createTarefa(userId, data);
    return res.status(201).json(tarefa);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erro ao criar tarefa" });
  }
};

// Deletar tarefa
export const deleteTarefa = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Usuário não autenticado" });
      return;
    }

    const { id } = req.params;
    const deletada = await tarefaService.deleteTarefa(userId, id);

    if (!deletada) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


// Atualizar tarefa
export const updateTarefa = async (
  req: Request<{ id: string }, any, UpdateTarefaDto>,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Usuário não autenticado" });
      return;
    }

    const { id } = req.params;
    const tarefaData = req.body;

    const tarefaAtualizada = await tarefaService.updateTarefa(userId, id, tarefaData);

    if (!tarefaAtualizada) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    res.json(tarefaAtualizada);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


// Atualizar status da tarefa
export const updateTarefaStatus = async (
  req: Request<{ id: string }, any, UpdateStatusDto>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const statusData = req.body;
    const tarefaAtualizada = await tarefaService.updateTarefaStatus(id, statusData);
    
    if (!tarefaAtualizada) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }
    
    res.json(tarefaAtualizada);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};