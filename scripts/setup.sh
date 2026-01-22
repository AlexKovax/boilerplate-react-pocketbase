#!/bin/bash
# Script d'initialisation d'un nouveau projet
# Usage: npm run setup

set -e

echo "================================================"
echo "  Setup du projet React + PocketBase"
echo "================================================"
echo ""

# 1. Copier .env.example vers .env
if [ ! -f .env ]; then
    echo "[1/4] Creation du fichier .env..."
    cp .env.example .env
    echo "      -> .env cree (pensez a le configurer)"
else
    echo "[1/4] .env existe deja, skip"
fi

# 2. Installer les dependances
echo ""
echo "[2/4] Installation des dependances npm..."
npm install

# 3. Telecharger PocketBase
echo ""
echo "[3/4] Telechargement de PocketBase..."
if [ ! -f pocketbase/pocketbase ]; then
    npm run pb:download
else
    echo "      -> PocketBase deja installe, skip"
fi

# 4. Creer le dossier migrations
echo ""
echo "[4/4] Preparation du dossier migrations..."
mkdir -p pocketbase/pb_migrations

echo ""
echo "================================================"
echo "  Setup termine !"
echo "================================================"
echo ""
echo "Prochaines etapes:"
echo ""
echo "  1. Demarrer PocketBase (terminal 1):"
echo "     npm run pb:start"
echo ""
echo "  2. Configurer PocketBase Admin:"
echo "     Ouvrir http://localhost:8090/_/"
echo "     Creer un compte admin"
echo "     Creer la collection 'users' si necessaire"
echo ""
echo "  3. Demarrer le dev server (terminal 2):"
echo "     npm run dev"
echo ""
echo "  4. Ouvrir l'application:"
echo "     http://localhost:5173"
echo ""
