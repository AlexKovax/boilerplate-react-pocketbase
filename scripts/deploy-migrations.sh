#!/bin/bash
# Deploie les migrations vers PocketHost via FTP
# Usage: npm run migrations:deploy

set -e

# Configuration - A PERSONNALISER
FTP_HOST="ftp.pockethost.io"
FTP_USER="votre-email@example.com"
INSTANCE_NAME="votre-instance"

LOCAL_DIR="pocketbase/pb_migrations"
REMOTE_DIR="/${INSTANCE_NAME}/pb_migrations"

if [ ! -d "$LOCAL_DIR" ]; then
    echo "Erreur: Dossier $LOCAL_DIR introuvable"
    exit 1
fi

echo "================================================"
echo "  Deploiement des migrations vers PocketHost"
echo "================================================"
echo ""
echo "Utilisateur: $FTP_USER"
echo "Serveur: $FTP_HOST"
echo "Instance: $INSTANCE_NAME"
echo "Dossier distant: $REMOTE_DIR"
echo ""

# Demander le mot de passe
read -s -p "Mot de passe FTP: " FTP_PASS
echo ""
echo ""

# Compter les fichiers
FILES=$(find "$LOCAL_DIR" -name "*.js" -type f 2>/dev/null || true)
COUNT=$(echo "$FILES" | grep -c "." 2>/dev/null || echo 0)

if [ "$COUNT" -eq 0 ]; then
    echo "Aucun fichier de migration a deployer."
    exit 0
fi

echo "Fichiers a deployer: $COUNT"
echo ""

# Upload chaque fichier avec curl
for file in $FILES; do
    filename=$(basename "$file")
    echo "Upload: $filename"
    curl -s -T "$file" -u "$FTP_USER:$FTP_PASS" "ftp://$FTP_HOST$REMOTE_DIR/$filename"
    echo "  -> OK"
done

echo ""
echo "================================================"
echo "  $COUNT migration(s) deployee(s) avec succes!"
echo "================================================"
