import { api } from './api';
import type { LoginCredentials, LoginResponse } from '../types/LoginInterface.ts';

export const LoginService = {

    //fazer um login
    fazerLogin: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        try {
            const response = await api.post<LoginResponse>('/login', credentials);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            // setar o token novo nas configurações do axios
            api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

            return response.data;
        } catch (error: unknown) {
            console.error('erro ao fazer login', error);

            if (error instanceof Error) {
                throw new Error(error.message);
            }

            throw new Error('Erro ao realizar login');
        }
    }
}