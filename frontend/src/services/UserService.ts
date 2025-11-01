import { api } from "./api";
import { UserData } from '../types/UserInterface';

export const UserService = {
    
    cadastrar: async (userData: UserData) => {
        try {
            const response = await api.post("/users", userData);
            return response.data;
        } catch (error: any) {
            console.error("Erro ao cadastrar usuário:", error);
            throw new Error(error.response?.data?.message || "Erro ao cadastrar");
        }
    },
};