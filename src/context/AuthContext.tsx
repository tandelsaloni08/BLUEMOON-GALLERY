"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserPayload {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  user: UserPayload | null;
  isAdmin: boolean;
  login: (token: string, user: UserPayload) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    // Hydrate auth state from localStorage
    const savedToken = localStorage.getItem("bluemoon_token");
    const savedUser = localStorage.getItem("bluemoon_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (newToken: string, newUser: UserPayload) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("bluemoon_token", newToken);
    localStorage.setItem("bluemoon_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("bluemoon_token");
    localStorage.removeItem("bluemoon_user");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ token, user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
