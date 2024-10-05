import React, { createContext, useState, useContext, ReactNode } from 'react';
import { api } from '../api';
import { User } from '../@types';

interface AuthContextType {
    user: User | null;
    login: ({email, password}: LoginRequest) => void;
    logout: () => void;
}

interface LoginRequest {
    email: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async ({email, password}: LoginRequest) => {
        try {
            const response = await api.get('/users', { params: { email, password } });
            const users = response.data;
            const user = users.find((u: User) => u.email === email && u.password === password);
            if (user) {
                setUser(user);
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};