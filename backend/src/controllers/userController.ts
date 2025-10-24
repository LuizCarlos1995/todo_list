import type { Request, Response } from "express";
import { User } from "../types/userInterface";
import * as loginService   from "../services/userService"


// Criar novo Usuario
export const createUser = async (
    req: Request<User>,
    res: Response
): Promise<void> => {
    try {
        const userData = req.body;
        const novoUser = await loginService.createUserService(userData);
        res.status(201).json(novoUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}