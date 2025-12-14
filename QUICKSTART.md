# Captain's Log - Quick Start Guide

Welcome to Captain's Log! This guide will help you get started with your personal leadership journal in just a few minutes.

## What is Captain's Log?

Captain's Log is a simple, private journaling system designed for engineering leaders. It helps you:
- Track daily progress and decisions
- Remember important conversations with your team
- Document technical decisions and their rationale
- Reflect on your leadership journey through weekly and monthly summaries

Everything is stored as plain text files on your computer - no cloud, no complex setup, just you and your notes.

## Getting Started

### The Easy Way: Use the Quick Start Menu

The easiest way to get started is to use the interactive quick start script:

```bash
./scripts/quickstart.sh
```

This will show you a menu with all the common tasks:
- Start a new daily log
- Add quick notes to today's log
- Create weekly summaries
- Create people profiles
- View recent entries
- Start the web viewer

### The Direct Way: Create Your First Daily Log

If you prefer to work directly, open your Terminal application and navigate to this project folder. Then run:

```bash
./scripts/new_daily.sh
```

This creates today's journal entry. You'll see a message like:
```
Created /path/to/daily/2025-12-14.md from template.
```

### Step 2: Edit Your Journal Entry

Open the file that was just created in your favorite text editor:

```bash
# Using TextEdit (macOS default)
open daily/$(date +%F).md

# Or using VS Code
code daily/$(date +%F).md

# Or using any other editor you prefer
```

Fill in the sections that are relevant to your day. You don't need to fill in every section - just use what makes sense.

### Step 3: Save Your Work

After editing, save the file. That's it! Your entry is saved on your computer.

### Step 4 (Optional): View in the Web Interface

If you want to browse your entries in a nice web interface:

1. **First time only**: Install the required software
   ```bash
   npm install
   ```

2. **Start the web viewer**
   ```bash
   npm run dev
   ```

   You'll see a message like:
   ```
   ➜  Local:   http://localhost:5175/
   ```

3. **Sync your entries to the web viewer**
   ```bash
   ./scripts/sync_to_web.sh
   ```

4. **Open your browser** and go to `http://localhost:5175/`

5. **When you're done**, press `Ctrl+C` in the Terminal to stop the web server

## Daily Workflow

### Morning Routine

**Option 1: Interactive Menu (Recommended)**
```bash
# Start the quick start menu
./scripts/quickstart.sh

# Choose option 1 to create/open today's log
```

**Option 2: Direct Commands**
```bash
# Create today's entry
./scripts/new_daily.sh

# Open it in your editor
open daily/$(date +%F).md
```

### Throughout the Day

**Quick Add Notes (Easy!)**
```bash
# Add notes without opening your editor
./scripts/add_to_daily.sh
```

This interactive script lets you quickly add:
- Deliverables you completed
- Blockers or issues
- Leadership actions
- People interactions
- Technical notes
- Follow-ups for tomorrow

**Or Manual Editing**
- Keep the file open and update it as things happen
- Don't worry about perfect writing - this is just for you
- Focus on decisions, not tasks

### End of Day
- Complete any follow-up items
- Note what needs attention tomorrow
- Save and close the file

## Understanding the Journal Structure

Your journal is organized into folders:

```
captains-log/
├── daily/          # One file per day (2025-12-14.md)
├── weekly/         # Weekly summaries (2025-W50.md)
├── monthly/        # Monthly overviews (2025-12.md)
├── yearly/         # Yearly retrospectives (2025.md)
├── people/         # Notes about individuals (jane-smith.md)
└── topics/         # Long-running initiatives (migration-project.md)
```

### Daily Logs (Start Here!)

Daily logs are where you'll spend most of your time. Each entry has sections for:

- **Context**: What day is it, where are you, what's your focus?
- **Deliverables**: What got done today?
- **Blockers/Issues**: What's in the way?
- **Leadership Actions**: 1:1s, feedback, coaching conversations
- **People Interactions**: Important conversations with team members
- **Architecture/Infra Notes**: Technical decisions and changes
- **Product/Stakeholder Interactions**: Key conversations with stakeholders
- **Follow ups Tomorrow**: What needs attention tomorrow?
- **Longer Term Threads**: Ongoing initiatives to keep an eye on

### Weekly Summaries (Recommended)

At the end of each week, create a summary to see the bigger picture:

```bash
# Copy the template
cp templates/weekly-summary-template.md weekly/2025-W50.md

# Edit it
open weekly/2025-W50.md
```

Focus on:
- Top 3 outcomes from the week
- Key risks or concerns
- Important decisions you made
- What's coming next week

### People Profiles (Optional but Powerful)

Create a file for people you work with regularly:

```bash
# Copy the template
cp templates/people-profile-template.md people/jane-smith.md

# Edit it
open people/jane-smith.md
```

Track:
- Their working style and preferences
- Career goals and development areas
- Recent conversation themes
- Follow-up actions

## Tips for Success

### Keep It Simple
- You don't need to fill in every section every day
- Brief notes are better than nothing
- Focus on decisions and context, not task lists

### Be Consistent
- Set a reminder to update your log at the end of each day
- Even 5 minutes of reflection is valuable
- The habit matters more than perfection

### Make It Useful
- Reference past entries when making similar decisions
- Use your weekly summaries for performance reviews
- Review people profiles before 1:1 meetings

### Keep It Private
- This is YOUR journal - be honest
- Don't commit sensitive personal information
- Use it to process your thoughts and decisions

## Common Commands Cheat Sheet

### Quick Start (Recommended)
```bash
# Interactive menu for all common tasks
./scripts/quickstart.sh
```

### Daily Logging
```bash
# Create today's daily log
./scripts/new_daily.sh

# Create a daily log for a specific date
./scripts/new_daily.sh 2025-12-10

# Add a quick note to today's log (interactive)
./scripts/add_to_daily.sh

# Add a note to a specific date's log
./scripts/add_to_daily.sh 2025-12-10

# Open today's log in default editor
open daily/$(date +%F).md
```

### Web Viewer
```bash
# Start the web viewer (includes auto-sync)
./scripts/quickstart.sh
# Then choose option 6

# Or manually:
./scripts/sync_to_web.sh  # Sync your entries
npm run dev               # Start the server
```

### Viewing Entries
```bash
# View all your daily entries
ls -la daily/

# View recent entries (most recent first)
ls -lt daily/ | head -10

# Search for a specific term in all entries
grep -r "architecture" daily/ weekly/ monthly/
```

## Troubleshooting

### "Permission denied" when running scripts
Make the script executable:
```bash
chmod +x scripts/new_daily.sh
chmod +x scripts/sync_to_web.sh
```

### Can't find the file I just created
Check the `daily/` folder - the file is named with today's date in YYYY-MM-DD format.

### Web viewer shows "No entries"
1. Make sure you've run `./scripts/sync_to_web.sh`
2. Check that your markdown files exist in the `daily/`, `weekly/`, etc. folders
3. Refresh your browser

### npm command not found
You need to install Node.js first. Visit [nodejs.org](https://nodejs.org/) to download and install it. The command-line journal works without this, but the web viewer requires it.

## Getting Help

- Check the full documentation in `README.md`
- Review the templates in the `templates/` folder for examples
- Look at `agents.md` for guidance on using AI assistants with your journal

## Next Steps

Once you're comfortable with daily logging, consider:

1. **Weekly Reviews**: Create weekly summaries to see patterns
2. **People Tracking**: Start profiles for your direct reports
3. **Topic Notes**: Track long-running initiatives or decisions
4. **Monthly Reflections**: Review the month's achievements and lessons

Remember: The best journaling system is the one you'll actually use. Start simple, be consistent, and adjust as you learn what works for you.

Happy journaling! 🚀
