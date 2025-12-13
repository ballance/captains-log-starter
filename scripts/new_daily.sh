#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE="$ROOT_DIR/templates/daily-note-template.md"
DAILY_DIR="$ROOT_DIR/daily"

DATE="${1:-$(date +%F)}"
TARGET_FILE="$DAILY_DIR/${DATE}.md"

if [ ! -f "$TEMPLATE" ]; then
  echo "Daily template not found at $TEMPLATE" >&2
  exit 1
fi

mkdir -p "$DAILY_DIR"

if [ -f "$TARGET_FILE" ]; then
  echo "Daily file already exists: $TARGET_FILE"
  exit 0
fi

cp "$TEMPLATE" "$TARGET_FILE"
echo "Created $TARGET_FILE from template."