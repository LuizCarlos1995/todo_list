import { api } from "./api";
import type { UserData } from '../types/UserInterface';

export const UserService = {
    
    cadastrar: async (userData: UserData) => {
        try {
            const response = await api.post("/users", userData);
            return response.data;
        } catch (error: unknown) {
            console.error("Erro ao cadastrar usuário:", error);
            
            if (error instanceof Error) {
                throw new Error(error.message);
            }

            throw new Error("Erro ao cadastrar");
        }
    },
};