# React + PocketBase Boilerplate

Boilerplate pour demarrer rapidement un projet React avec PocketBase comme backend.

## Stack Technique

- **Frontend**: React 19 + Vite
- **Router**: React Router DOM v7
- **Backend**: PocketBase
- **Hebergement**: Netlify (frontend) + PocketHost (backend)

## Demarrage Rapide

### 1. Cloner/Copier le boilerplate

```bash
cp -r boilerplate-react-pocketbase mon-nouveau-projet
cd mon-nouveau-projet
```

### 2. Initialiser le projet

```bash
npm run setup
```

Ce script va:
- Creer le fichier `.env` a partir de `.env.example`
- Installer les dependances npm
- Telecharger PocketBase

### 3. Demarrer PocketBase (Terminal 1)

```bash
npm run pb:start
```

Ouvrir http://localhost:8090/_/ pour acceder a l'admin PocketBase et creer votre compte admin.

### 4. Demarrer le serveur de dev (Terminal 2)

```bash
npm run dev
```

L'application est accessible sur http://localhost:5173

## Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Demarre le serveur de dev Vite |
| `npm run build` | Build pour la production |
| `npm run preview` | Preview du build de production |
| `npm run lint` | Lint du code avec ESLint |
| `npm run setup` | Initialise le projet (premiere fois) |
| `npm run pb:download` | Telecharge PocketBase |
| `npm run pb:start` | Demarre le serveur PocketBase local |
| `npm run pb:migrate` | Execute les migrations PocketBase |
| `npm run migrations:deploy` | Deploie les migrations vers PocketHost |

## Structure du Projet

```
├── public/                  # Assets statiques
├── scripts/
│   ├── setup.sh            # Script d'initialisation
│   ├── pb-download.sh      # Telecharge PocketBase
│   └── deploy-migrations.sh # Deploie migrations vers PocketHost
├── pocketbase/
│   ├── pb_migrations/      # Fichiers de migration
│   └── pb_data/            # Donnees locales (gitignore)
├── src/
│   ├── components/
│   │   ├── Home.jsx        # Page d'accueil
│   │   ├── Login.jsx       # Page de connexion
│   │   └── ProtectedRoute.jsx # Protection des routes
│   ├── contexts/
│   │   └── AuthContext.jsx # Contexte d'authentification
│   ├── lib/
│   │   └── pocketbase.js   # Client PocketBase
│   ├── App.jsx             # Composant principal + Routes
│   ├── App.css             # Styles application
│   ├── index.css           # Styles globaux (neo-brutalist)
│   └── main.jsx            # Point d'entree
├── .env.example            # Template variables d'env
├── .env.production         # Variables d'env production
├── netlify.toml            # Configuration Netlify
├── vite.config.js          # Configuration Vite
└── package.json
```

## Environnements

| Environnement | Frontend | Backend |
|---------------|----------|---------|
| **Local/Dev** | http://localhost:5173 | http://localhost:8090 |
| **Production** | Netlify | PocketHost |

### Variables d'Environnement

- `.env` - Developpement local (non commite)
- `.env.production` - Production

```bash
# Exemple .env
VITE_POCKETBASE_URL=http://localhost:8090
```

## Authentification

L'authentification est geree via le contexte `AuthContext`:

```jsx
import { useAuth } from './contexts/AuthContext';

function MonComposant() {
  const { user, isAuthenticated, login, logout } = useAuth();

  // ...
}
```

### Routes Protegees

Utilisez le composant `ProtectedRoute` pour proteger vos routes:

```jsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

## Deploiement

### Frontend (Netlify)

1. Connecter le repo Git a Netlify
2. Configurer la variable d'environnement `VITE_POCKETBASE_URL` avec l'URL PocketHost
3. Netlify detecte automatiquement la config via `netlify.toml`

### Backend (PocketHost)

1. Creer une instance sur https://pockethost.io
2. Configurer `.env.production` avec l'URL de l'instance
3. Modifier `scripts/deploy-migrations.sh` avec vos identifiants
4. Deployer les migrations: `npm run migrations:deploy`

## Migrations PocketBase

Les migrations permettent de versionner le schema de la base de donnees.

### Creer une migration

```bash
# Dans l'admin PocketBase, effectuer vos modifications
# Puis exporter via l'interface ou creer manuellement dans:
# pocketbase/pb_migrations/
```

### Deployer vers PocketHost

1. Configurer `scripts/deploy-migrations.sh`:
   - `FTP_USER`: Votre email PocketHost
   - `INSTANCE_NAME`: Nom de votre instance

2. Executer:
```bash
npm run migrations:deploy
```

## Personnalisation

### Changer les couleurs

Modifier les variables CSS dans `src/index.css`:

```css
:root {
  --primary-color: #9062f0;  /* Couleur principale */
  --bg-color: #ffffff;
  --text-color: #000000;
  --border-color: #000000;
  --shadow-color: #000000;
}
```

### Ajouter des collections PocketBase

1. Demarrer PocketBase: `npm run pb:start`
2. Ouvrir l'admin: http://localhost:8090/_/
3. Creer vos collections
4. Exporter les migrations pour les deployer en production

### Ajouter des routes

Modifier `src/App.jsx`:

```jsx
import MaPage from './components/MaPage';

// Dans les Routes:
<Route path="/ma-page" element={
  <ProtectedRoute>
    <MaPage />
  </ProtectedRoute>
} />
```

## Notes Importantes

- **Collection users**: PocketBase cree automatiquement une collection `users`. L'authentification utilise cette collection.
- **CORS**: PocketBase accepte toutes les origines par defaut en dev. Configurez les origines autorisees en production.
- **Auto-cancellation**: Desactivee par defaut dans `lib/pocketbase.js` pour eviter les problemes avec React StrictMode.

## Licence

MIT
