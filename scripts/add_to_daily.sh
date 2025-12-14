#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DAILY_DIR="$ROOT_DIR/daily"

# Get date (today or specified date)
DATE="${1:-$(date +%F)}"
TARGET_FILE="$DAILY_DIR/${DATE}.md"

# If file doesn't exist, create it first
if [ ! -f "$TARGET_FILE" ]; then
  echo "Daily log for $DATE doesn't exist. Creating it first..."
  "$ROOT_DIR/scripts/new_daily.sh" "$DATE"
fi

# Function to add content to a section
add_to_section() {
  local section="$1"
  local content="$2"
  local file="$3"

  # Use awk to find the section and add content
  awk -v section="## $section" -v content="- $content" '
    # Print all lines
    { print }

    # When we find the target section
    $0 ~ section {
      # Read and print lines until we hit the next section or end
      in_section = 1
      while (getline > 0) {
        # If we hit another section, insert content before it
        if ($0 ~ /^## / && in_section) {
          print content
          print ""
          print $0
          in_section = 0
          next
        }
        print $0
      }
      # If we reached end of file while in section, add content
      if (in_section) {
        print content
      }
    }
  ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
}

# Interactive mode - ask what they want to add
echo ""
echo "Adding to daily log for: $DATE"
echo "What would you like to add?"
echo ""
echo "1. Deliverable (something you completed)"
echo "2. Blocker/Issue (something blocking progress)"
echo "3. Leadership Action (1:1, feedback, coaching)"
echo "4. People Interaction (conversation with team member)"
echo "5. Architecture/Infra Note (technical decision)"
echo "6. Product/Stakeholder Interaction"
echo "7. Follow up Tomorrow"
echo "8. Longer Term Thread"
echo "9. Open the file in your editor"
echo "0. Exit"
echo ""

read -p "Choose (0-9): " choice

case $choice in
  1)
    read -p "Deliverable: " content
    add_to_section "Deliverables" "$content" "$TARGET_FILE"
    echo "✓ Added to Deliverables"
    ;;
  2)
    read -p "Blocker/Issue: " content
    add_to_section "Blockers / Issues" "$content" "$TARGET_FILE"
    echo "✓ Added to Blockers / Issues"
    ;;
  3)
    read -p "Leadership Action: " content
    add_to_section "Leadership Actions" "$content" "$TARGET_FILE"
    echo "✓ Added to Leadership Actions"
    ;;
  4)
    echo "Example: **Jane Smith** - [Engineering Lead] - Discussed project timeline concerns"
    read -p "People Interaction: " content
    add_to_section "People Interactions" "$content" "$TARGET_FILE"
    echo "✓ Added to People Interactions"
    ;;
  5)
    read -p "Architecture/Infra Note: " content
    add_to_section "Architecture / Infra Notes" "$content" "$TARGET_FILE"
    echo "✓ Added to Architecture / Infra Notes"
    ;;
  6)
    read -p "Product/Stakeholder Interaction: " content
    add_to_section "Product / Stakeholder Interactions" "$content" "$TARGET_FILE"
    echo "✓ Added to Product / Stakeholder Interactions"
    ;;
  7)
    read -p "Follow up Tomorrow: " content
    add_to_section "Follow ups Tomorrow" "$content" "$TARGET_FILE"
    echo "✓ Added to Follow ups Tomorrow"
    ;;
  8)
    read -p "Longer Term Thread: " content
    add_to_section "Longer Term Threads To Watch" "$content" "$TARGET_FILE"
    echo "✓ Added to Longer Term Threads"
    ;;
  9)
    # Try to detect the user's preferred editor
    if command -v code &> /dev/null; then
      code "$TARGET_FILE"
    elif command -v vim &> /dev/null; then
      vim "$TARGET_FILE"
    elif command -v nano &> /dev/null; then
      nano "$TARGET_FILE"
    else
      open "$TARGET_FILE"
    fi
    echo "✓ Opened $TARGET_FILE"
    ;;
  0)
    echo "Goodbye!"
    exit 0
    ;;
  *)
    echo "Invalid choice. Please run the script again."
    exit 1
    ;;
esac

echo ""
echo "Current log file: $TARGET_FILE"
echo ""
read -p "Add another entry? (y/n): " again

if [ "$again" = "y" ] || [ "$again" = "Y" ]; then
  exec "$0" "$DATE"
fi

echo ""
echo "Done! Your daily log has been updated."
