import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import './App.css';

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <Router>
      <div className="container">
        {/* Navigation - uniquement visible si authentifie */}
        {isAuthenticated && (
          <nav className="header">
            <Link to="/" className="header-title">
              My App
            </Link>

            <div className="header-nav">
              <Link to="/">Accueil</Link>
              {/* Ajoutez vos liens ici */}
            </div>

            <div className="user-info">
              <span>{user?.email}</span>
              <button onClick={logout} className="btn btn-danger">
                Deconnexion
              </button>
            </div>
          </nav>
        )}

        <Routes>
          {/* Route publique */}
          <Route path="/login" element={<Login />} />

          {/* Routes protegees */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          {/* Ajoutez vos routes ici */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
