"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  name: string;
  email: string;
  plano: "Básico" | "Premium" | "VIP";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, plano: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("aurafit_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, password: string, plano: string) => {
    if (email && password) {
      const newUser = {
        name: email.split("@")[0],
        email,
        plano: plano as "Básico" | "Premium" | "VIP",
      };
      setUser(newUser);
      
      // Salvar no localStorage
      try {
        localStorage.setItem("aurafit_user", JSON.stringify(newUser));
      } catch (error) {
        console.error("Erro ao salvar usuário:", error);
      }
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("aurafit_user");
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
    }
  };

  // Não renderizar até carregar o estado
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}