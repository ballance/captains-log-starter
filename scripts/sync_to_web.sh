#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_DATA="$ROOT_DIR/public/data"

echo "Syncing markdown files to web UI..."

# Create public/data directory structure
mkdir -p "$PUBLIC_DATA"/{daily,weekly,monthly,yearly,people,topics}

# Sync all markdown files
rsync -av --delete "$ROOT_DIR/daily/" "$PUBLIC_DATA/daily/"
rsync -av --delete "$ROOT_DIR/weekly/" "$PUBLIC_DATA/weekly/"
rsync -av --delete "$ROOT_DIR/monthly/" "$PUBLIC_DATA/monthly/"
rsync -av --delete "$ROOT_DIR/yearly/" "$PUBLIC_DATA/yearly/"
rsync -av --delete "$ROOT_DIR/people/" "$PUBLIC_DATA/people/"
rsync -av --delete "$ROOT_DIR/topics/" "$PUBLIC_DATA/topics/"

echo "Sync complete!"
