import React, { createContext, useContext, useState } from 'react';
import * as api from '../../services/api';
import { router } from 'expo-router';

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const login = async (username: string, password: string) => {
    const userData = await api.loginUser(username, password);
    setUser(userData);
    router.replace('/home');
  };

  const signup = async (username: string, password: string,fullName: string) => {
    const existingUsers = await api.getUsers();
    if (existingUsers.some((u: any) => u.username === username)) {
      throw new Error('Username đã tồn tại');
    }

    const newUser = { username, password,fullName};
    const response = await api.signupUser(newUser);
    setUser(response);
  };

  const logout = () => {
    setUser(null);
    router.replace('/SigninScreen');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};