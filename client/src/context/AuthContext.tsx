import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthAPI } from "../services/api";
import { AdminUser } from "../types";

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: any) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (token) {
          const data = await AuthAPI.getMe();
          if (data.success && data.admin) {
            setUser(data.admin);
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        localStorage.removeItem("admin_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials: any) => {
    try {
      const data = await AuthAPI.login(credentials);
      if (data.success && data.admin) {
        setUser(data.admin);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    AuthAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
