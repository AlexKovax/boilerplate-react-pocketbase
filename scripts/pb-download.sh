#!/bin/bash
# Telecharge PocketBase pour le developpement local
# Usage: npm run pb:download

set -e

# Configuration
PB_VERSION="0.34.2"
PB_DIR="pocketbase"

# Detecter l'OS et l'architecture
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case "$ARCH" in
  x86_64) ARCH="amd64" ;;
  aarch64|arm64) ARCH="arm64" ;;
  *) echo "Architecture non supportee: $ARCH"; exit 1 ;;
esac

case "$OS" in
  linux) OS="linux" ;;
  darwin) OS="darwin" ;;
  *) echo "OS non supporte: $OS"; exit 1 ;;
esac

DOWNLOAD_URL="https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_${OS}_${ARCH}.zip"

echo "================================================"
echo "  Telechargement de PocketBase v${PB_VERSION}"
echo "================================================"
echo ""
echo "OS: $OS"
echo "Architecture: $ARCH"
echo "URL: $DOWNLOAD_URL"
echo ""

# Creer le dossier si necessaire
mkdir -p "$PB_DIR"

# Telecharger
echo "Telechargement en cours..."
curl -L "$DOWNLOAD_URL" -o "$PB_DIR/pb.zip"

# Extraire
echo "Extraction..."
if command -v unzip &> /dev/null; then
  unzip -o "$PB_DIR/pb.zip" -d "$PB_DIR"
else
  python3 -c "import zipfile; zipfile.ZipFile('$PB_DIR/pb.zip').extractall('$PB_DIR')"
fi

# Nettoyer
rm "$PB_DIR/pb.zip"

# Rendre executable
chmod +x "$PB_DIR/pocketbase"

echo ""
echo "================================================"
echo "  PocketBase installe avec succes !"
echo "================================================"
echo ""
echo "Pour demarrer: npm run pb:start"
echo "Admin UI: http://localhost:8090/_/"
echo ""
