# CLAUDE.md

Ce fichier fournit des informations a Claude Code pour travailler avec ce projet.

## Apercu du Projet

Boilerplate React + PocketBase avec:
- Authentification pre-configuree
- Routes protegees
- Environnements dev/prod separes
- Scripts de deploiement

## Commandes de Developpement

```bash
# Premiere installation
npm run setup

# Demarrer PocketBase (terminal 1)
npm run pb:start

# Demarrer React dev server (terminal 2)
npm run dev

# Build production
npm run build

# Lint
npm run lint
```

## Environnements

| Environnement | PocketBase URL |
|---------------|----------------|
| Local/Dev | http://localhost:8090 |
| Production | Configure dans .env.production |

## Architecture

### Authentification

- `src/contexts/AuthContext.jsx` - Contexte d'auth avec login/logout
- `src/components/ProtectedRoute.jsx` - HOC pour proteger les routes
- `src/components/Login.jsx` - Page de connexion

### Client PocketBase

```javascript
// src/lib/pocketbase.js
import { pb } from './lib/pocketbase';

// Utilisation
const records = await pb.collection('ma_collection').getList();
```

### Routing

Routes definies dans `src/App.jsx`:
- `/login` - Page publique
- `/` - Page protegee (Home)

## Style

Design minimal avec classes utilitaires:
- `.card` - Conteneur avec fond blanc et bordure
- `.btn` - Bouton primaire (`.btn-danger` pour les actions destructives)
- `.input` - Champ de formulaire

Variables CSS dans `src/index.css`:
- `--primary-color` - Couleur principale (#3b82f6)
- `--text-color` - Couleur du texte (#1f2937)
- `--text-muted` - Texte secondaire (#6b7280)
