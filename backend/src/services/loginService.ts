import db from "../config/database";
import jwt from "jsonwebtoken";
import { User } from "../types/userInterface";

const JWT_SECRET = "SUA_CHAVE_SECRETA"; // coloque em .env depois

export const verifyUser = (email: string, password: string): Promise<{ token: string, data: User }> => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE email = ?";

        db.query(sql, [email], (err: any, results: any[]) => {
            if (err) {
                reject(new Error("Erro ao consultar o banco de dados"));
                return;
            }

            if (results.length === 0) {
                reject(new Error("Usuário não encontrado"));
                return;
            }

            const user = results[0];

            // Aqui você deve usar bcrypt.compare em vez de comparar direto:
            if (user.password !== password) {
                reject(new Error("Senha incorreta"));
                return;
            }

            // Cria um token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: "2h" }
            );

            resolve({ token, data: user });
        });
    });
};
