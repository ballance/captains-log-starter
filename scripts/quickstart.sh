#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}         Captain's Log - Quick Start${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "What would you like to do?"
echo ""
echo "  1. Start a new daily log (or continue today's log)"
echo "  2. Add a quick note to today's log"
echo "  3. Create a weekly summary"
echo "  4. Create a people profile"
echo "  5. View recent entries"
echo "  6. Start the web viewer"
echo "  7. Exit"
echo ""

read -p "Choose (1-7): " choice

case $choice in
  1)
    # Start new daily log
    echo ""
    echo -e "${GREEN}Creating/opening today's daily log...${NC}"
    echo ""

    # Create if doesn't exist
    "$ROOT_DIR/scripts/new_daily.sh"

    TODAY=$(date +%F)
    TARGET_FILE="$ROOT_DIR/daily/${TODAY}.md"

    echo ""
    echo "Daily log location: $TARGET_FILE"
    echo ""
    echo "Opening in your editor..."
    echo ""

    # Try to open in user's preferred editor
    if command -v code &> /dev/null; then
      code "$TARGET_FILE"
      echo "✓ Opened in VS Code"
    elif [ -n "${EDITOR:-}" ]; then
      $EDITOR "$TARGET_FILE"
    elif command -v vim &> /dev/null; then
      vim "$TARGET_FILE"
    elif command -v nano &> /dev/null; then
      nano "$TARGET_FILE"
    else
      open "$TARGET_FILE"
      echo "✓ Opened in default application"
    fi
    ;;

  2)
    # Add quick note
    echo ""
    "$ROOT_DIR/scripts/add_to_daily.sh"
    ;;

  3)
    # Create weekly summary
    echo ""
    echo -e "${GREEN}Creating weekly summary...${NC}"
    echo ""

    # Calculate current week number
    WEEK_NUM=$(date +%W)
    YEAR=$(date +%Y)
    WEEK_FILE="$ROOT_DIR/weekly/${YEAR}-W${WEEK_NUM}.md"

    if [ -f "$WEEK_FILE" ]; then
      echo "Weekly summary for Week $WEEK_NUM already exists."
      echo "Location: $WEEK_FILE"
    else
      cp "$ROOT_DIR/templates/weekly-summary-template.md" "$WEEK_FILE"
      echo "✓ Created $WEEK_FILE"
    fi

    echo ""
    echo "Opening in your editor..."

    if command -v code &> /dev/null; then
      code "$WEEK_FILE"
    elif [ -n "${EDITOR:-}" ]; then
      $EDITOR "$WEEK_FILE"
    elif command -v vim &> /dev/null; then
      vim "$WEEK_FILE"
    elif command -v nano &> /dev/null; then
      nano "$WEEK_FILE"
    else
      open "$WEEK_FILE"
    fi
    ;;

  4)
    # Create people profile
    echo ""
    echo -e "${GREEN}Creating a people profile...${NC}"
    echo ""
    echo "Enter the person's name (e.g., 'Jane Smith'):"
    read -p "Name: " person_name

    # Convert to filename format (jane-smith.md)
    filename=$(echo "$person_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
    PEOPLE_FILE="$ROOT_DIR/people/${filename}.md"

    if [ -f "$PEOPLE_FILE" ]; then
      echo ""
      echo "Profile for $person_name already exists."
      echo "Location: $PEOPLE_FILE"
    else
      cp "$ROOT_DIR/templates/people-profile-template.md" "$PEOPLE_FILE"

      # Replace the placeholder name in the template
      if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/\[First Name Last Name\]/$person_name/g" "$PEOPLE_FILE"
      else
        sed -i "s/\[First Name Last Name\]/$person_name/g" "$PEOPLE_FILE"
      fi

      echo "✓ Created profile: $PEOPLE_FILE"
    fi

    echo ""
    echo "Opening in your editor..."

    if command -v code &> /dev/null; then
      code "$PEOPLE_FILE"
    elif [ -n "${EDITOR:-}" ]; then
      $EDITOR "$PEOPLE_FILE"
    elif command -v vim &> /dev/null; then
      vim "$PEOPLE_FILE"
    elif command -v nano &> /dev/null; then
      nano "$PEOPLE_FILE"
    else
      open "$PEOPLE_FILE"
    fi
    ;;

  5)
    # View recent entries
    echo ""
    echo -e "${GREEN}Recent Daily Entries:${NC}"
    echo ""

    if ls "$ROOT_DIR/daily"/*.md &> /dev/null; then
      ls -lt "$ROOT_DIR/daily"/*.md | head -5 | while read -r line; do
        filename=$(echo "$line" | awk '{print $NF}')
        basename=$(basename "$filename" .md)
        echo "  • $basename"
      done
    else
      echo "  No daily entries yet. Create one with option 1!"
    fi

    echo ""
    echo -e "${GREEN}Recent Weekly Summaries:${NC}"
    echo ""

    if ls "$ROOT_DIR/weekly"/*.md &> /dev/null; then
      ls -lt "$ROOT_DIR/weekly"/*.md | head -3 | while read -r line; do
        filename=$(echo "$line" | awk '{print $NF}')
        basename=$(basename "$filename" .md)
        echo "  • $basename"
      done
    else
      echo "  No weekly summaries yet. Create one with option 3!"
    fi

    echo ""
    echo -e "${GREEN}People Profiles:${NC}"
    echo ""

    if ls "$ROOT_DIR/people"/*.md &> /dev/null; then
      ls "$ROOT_DIR/people"/*.md | while read -r file; do
        basename=$(basename "$file" .md)
        # Convert filename back to readable name
        name=$(echo "$basename" | tr '-' ' ' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')
        echo "  • $name"
      done
    else
      echo "  No people profiles yet. Create one with option 4!"
    fi

    echo ""
    ;;

  6)
    # Start web viewer
    echo ""
    echo -e "${GREEN}Starting the web viewer...${NC}"
    echo ""

    # Check if node_modules exists
    if [ ! -d "$ROOT_DIR/node_modules" ]; then
      echo -e "${YELLOW}First time setup: Installing dependencies...${NC}"
      echo "This may take a minute..."
      echo ""
      cd "$ROOT_DIR" && npm install
      echo ""
      echo -e "${GREEN}✓ Dependencies installed${NC}"
      echo ""
    fi

    # Sync data
    echo "Syncing your journal entries to the web viewer..."
    "$ROOT_DIR/scripts/sync_to_web.sh"
    echo ""

    echo -e "${GREEN}Starting web server...${NC}"
    echo ""
    echo "The web viewer will open at: http://localhost:5175/"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop the server when you're done.${NC}"
    echo ""

    cd "$ROOT_DIR" && npm run dev
    ;;

  7)
    # Exit
    echo ""
    echo "Happy journaling! 📝"
    echo ""
    exit 0
    ;;

  *)
    echo ""
    echo "Invalid choice. Please run the script again."
    exit 1
    ;;
esac

echo ""
