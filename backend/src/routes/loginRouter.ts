import express from "express";
import * as loginController from "../controllers/loginController";

const router = express.Router();

// rota para login
router.post('/login', loginController.loginUser);

export default router;
