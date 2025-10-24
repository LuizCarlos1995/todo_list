import type { Request, Response } from "express";
import * as loginService from "../services/loginService";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body; // pega dados do front

        const user = await loginService.verifyUser(email, password);

        res.status(200).json({
            message: "Login realizado com sucesso",
            token: user.token,
            user: user.data,
        });
    } catch (error: any) {
        res.status(401).json({ message: error.message || "Falha no login" });
    }
};
