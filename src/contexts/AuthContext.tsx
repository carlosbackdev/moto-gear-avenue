import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginRequest, RegisterRequest, FirebaseLoginRequest } from '@/types/models';
import { authService } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  firebaseLogin: (data: FirebaseLoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al cargar, verificar si hay un token y obtener el usuario
    const initAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Error getting current user:', error);
          authService.logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: LoginRequest) => {
    const response = await authService.login(data);
    setUser(response.user);
  };

  const register = async (data: RegisterRequest) => {
    const response = await authService.register(data);
    setUser(response.user);
  };

  const firebaseLogin = async (data: FirebaseLoginRequest) => {
    const response = await authService.firebaseLogin(data);
    // El backend puede retornar los datos en diferentes formatos
    const userData: User = response.user || {
      id: response.userId || 0,
      email: response.email || data.email,
      name: response.fullName || data.fullName,
      fullName: response.fullName || data.fullName,
      role: response.role,
      photoUrl: response.photoUrl || data.photoUrl,
      authProvider: 'GOOGLE',
      createdAt: new Date().toISOString(),
    };
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        firebaseLogin,
        logout,
        isAuthenticated: authService.isAuthenticated(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
