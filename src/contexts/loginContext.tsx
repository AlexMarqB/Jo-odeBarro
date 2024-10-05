import React, { createContext, useState, useContext, ReactNode } from 'react';
import { api } from '../api';
import { User } from '../@types';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    user: User | null;
    login: ({email, password}: LoginRequest) => void;
    logout: () => void;
    navigate: (path: string) => void;
}

interface LoginRequest {
    email: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate()

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
        navigate("/")
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, navigate }}>
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