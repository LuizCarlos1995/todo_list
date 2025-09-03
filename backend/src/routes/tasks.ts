import express from "express";
import * as taskController from "../controllers/taskController";

const router = express.Router();

// Rotas para tarefas
router.get("/", taskController.getAllTarefas);
router.get("/:id", taskController.getTarefaById);
router.post("/", taskController.createTarefa);
router.put("/:id", taskController.updateTarefa);
router.delete("/:id", taskController.deleteTarefa);
router.patch("/:id/status", taskController.updateTarefaStatus);

export default router;
