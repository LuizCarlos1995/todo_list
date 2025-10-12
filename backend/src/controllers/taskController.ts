import type { Request, Response } from "express";
import * as tarefaService from "../services/taskService";
import type { TarefaQuery, CreateTarefaDto, UpdateTarefaDto, UpdateStatusDto } from "../types/interfaces";

// Buscar todas as tarefas
export const getAllTarefas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tarefas = await tarefaService.findAllTarefas({});
    res.json(tarefas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

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
export const createTarefa = async (
  req: Request<{}, any, CreateTarefaDto>,
  res: Response
): Promise<void> => {
  try {
    const tarefaData = req.body;
    const novaTarefa = await tarefaService.createTarefa(tarefaData);
    res.status(201).json(novaTarefa);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar tarefa
export const deleteTarefa = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletada = await tarefaService.deleteTarefa(id);
    
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
    const { id } = req.params;
    const tarefaData = req.body;
    const tarefaAtualizada = await tarefaService.updateTarefa(id, tarefaData);

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