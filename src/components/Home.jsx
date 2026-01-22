import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="neo-box">
      <h1>Bienvenue</h1>
      <p>Vous etes connecte en tant que: <strong>{user?.email}</strong></p>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        Commencez a developper votre application !
      </p>
    </div>
  );
}
