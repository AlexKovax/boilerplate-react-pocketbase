import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import PocketBase, { type RecordModel } from 'pocketbase';
import { pb } from '../lib/pocketbase';

type AuthRecord = RecordModel | null;

interface LoginResult {
  success: boolean;
  user?: RecordModel;
  error?: string;
}

interface AuthContextType {
  user: AuthRecord;
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  pb: PocketBase;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthRecord>(pb.authStore.record);
  const [token, setToken] = useState(pb.authStore.token);
  const isLoading = false;

  // Ecouter les changements du authStore
  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((newToken, model) => {
      setToken(newToken);
      setUser(model);
    });

    return unsubscribe;
  }, []);

  // Connexion avec email/mot de passe
  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      return { success: true, user: authData.record };
    } catch (error) {
      console.error('Login error:', error);
      const message = error instanceof Error ? error.message : 'Echec de la connexion. Verifiez vos identifiants.';
      return { success: false, error: message };
    }
  };

  // Deconnexion
  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    setToken('');
  };

  // Verifier si l'utilisateur est authentifie
  const isAuthenticated = !!token && !!user;

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    pb,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personnalise pour utiliser le contexte d'authentification
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit etre utilise a l\'interieur d\'un AuthProvider');
  }
  return context;
}
