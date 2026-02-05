import express from "express";
import * as taskController from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Rotas para tarefas
router.get("/tarefas", authMiddleware, taskController.getAllTarefas);
/* 
  #swagger.tags = ['tarefas']
  #swagger.description = 'Buscar todas as tarefas'
  #swagger.responses[200] = {
    description: 'Lista de tarefas retornada com sucesso',
    schema: { 
      type: 'array',
      items: { $ref: '#/definitions/Task' }
    }
  }
*/
router.get("/:id", authMiddleware, taskController.getTarefaById);
/* 
  #swagger.tags = ['Tasks']
  #swagger.description = 'Buscar tarefa por ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da tarefa',
    required: true,
    type: 'integer'
  }
  #swagger.responses[200] = {
    description: 'Tarefa encontrada',
    schema: { $ref: '#/definitions/Task' }
  }
  #swagger.responses[404] = {
    description: 'Tarefa não encontrada'
  }
*/
router.post("/tarefa/create", authMiddleware, taskController.createTarefa);
/* 
  #swagger.tags = ['Tasks']
  #swagger.description = 'Criar nova tarefa'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Dados da nova tarefa',
    required: true,
    schema: { $ref: '#/definitions/Task' }
  }
  #swagger.responses[201] = {
    description: 'Tarefa criada com sucesso',
    schema: { $ref: '#/definitions/Task' }
  }
*/
router.put("/update/:id", authMiddleware, taskController.updateTarefa);
/* 
  #swagger.tags = ['Tasks']
  #swagger.description = 'Atualizar tarefa completa'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da tarefa',
    required: true,
    type: 'integer'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Dados atualizados da tarefa',
    required: true,
    schema: { $ref: '#/definitions/Task' }
  }
*/
router.delete("/delete/:id", authMiddleware, taskController.deleteTarefa);
/* 
  #swagger.tags = ['Tasks']
  #swagger.description = 'Deletar tarefa'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da tarefa',
    required: true,
    type: 'integer'
  }
  #swagger.responses[200] = {
    description: 'Tarefa deletada com sucesso'
  }
*/
router.patch("/:id/status", authMiddleware, taskController.updateTarefaStatus);
/* 
  #swagger.tags = ['Tasks']
  #swagger.description = 'Atualizar apenas o status da tarefa'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da tarefa',
    required: true,
    type: 'integer'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Novo status',
    required: true,
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['pending', 'completed', 'in_progress']
        }
      }
    }
  }
*/

export default router;
