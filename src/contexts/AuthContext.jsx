import { createContext, useContext, useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(pb.authStore.model);
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
  const login = async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      return { success: true, user: authData.record };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Echec de la connexion. Verifiez vos identifiants.'
      };
    }
  };

  // Deconnexion
  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    setToken(null);
  };

  // Verifier si l'utilisateur est authentifie
  const isAuthenticated = !!token && !!user;

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    pb, // Exposer l'instance pb pour les operations sur les collections
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
