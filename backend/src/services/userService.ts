import { rejects } from "assert";
import db from "../config/database";
import { SafeUser, User } from "../types/userInterface";
import { ApiResponse } from "../types/erroInterface";

export const createUserService = (userData: User): Promise<ApiResponse<SafeUser>> => {
    return new Promise((resolve, reject) => {
        const { id, name, email, password } = userData;

        db.query(
            "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
            [id, name, email, password],
            (err: any, results: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    success: true,
                    message: "Usuário criado com sucesso!",
                    data: {
                        id: results.insertId,
                        name,
                        email,
                    }
                })
            }
        )
    })
}