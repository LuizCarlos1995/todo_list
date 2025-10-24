import { rejects } from "assert";
import db from "../config/database";
import { User } from "../types/userInterface";

export const createUserService = (userData: User): Promise<User> => {
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
                    id: results.insertId,
                    name,
                    email,
                    password,
                })
            }
        )
    })
}