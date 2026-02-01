import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Configurar token de autenticação para todas as requisições
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}