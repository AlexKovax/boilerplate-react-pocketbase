import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="card">
      <h1>Bienvenue</h1>
      <p>Vous etes connecte en tant que: <strong>{user?.email}</strong></p>
      <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
        Commencez a developper votre application !
      </p>
    </div>
  );
}
