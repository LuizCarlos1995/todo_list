// Interface de usuario
export interface User {
    id: number
    name: string
    email: string
    password: string
}

export interface SafeUser {
    id: string;
    name: string;
    email: string;
}