import { api } from './api';
import { LoginCredentials, LoginResponse } from '../types/LoginInterface';

export const LoginService = {

    //fazer um login
    fazerLogin: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        try {
            const response = await api.post<LoginResponse>('/login', credentials);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return response.data;
        } catch (error: any) {
            console.error('erro ao fazer login', error);
            throw new Error(
                error.response?.data?.message
            )
        }
    }
}