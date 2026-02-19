import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Afficher un indicateur de chargement pendant la verification de l'authentification
  if (isLoading) {
    return (
      <div className="neo-box" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Chargement...</h2>
      </div>
    );
  }

  // Rediriger vers la page de connexion si non authentifie
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Afficher le contenu protege
  return children;
}
