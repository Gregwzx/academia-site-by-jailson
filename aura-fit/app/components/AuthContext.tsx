"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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

  const login = (email: string, password: string, plano: string) => {
    // Simulação de login - aceita qualquer credencial
    if (email && password) {
      setUser({
        name: email.split("@")[0],
        email,
        plano: plano as "Básico" | "Premium" | "VIP",
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

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