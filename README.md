# Captain's Log

A personal journal system designed for tracking daily progress, weekly reflections, and ongoing projects through structured markdown entries with an optional modern web interface.

**Originally designed for engineering leaders**, but useful for anyone who wants to:
- Track daily work and decisions (students, researchers, developers, managers)
- Reflect on weekly progress and patterns
- Document interactions with colleagues or team members
- Maintain a searchable record of technical decisions
- Build a habit of reflection and continuous improvement

## 🚀 Quick Start

**New to Captain's Log?** Check out [QUICKSTART.md](QUICKSTART.md) for a beginner-friendly guide.

**Get started immediately:**
```bash
./scripts/quickstart.sh
```

This interactive menu will guide you through:
- Creating your first daily log
- Adding quick notes throughout the day
- Creating weekly summaries
- Managing people profiles
- Starting the web viewer

## 🛠️ Tech Stack

- **Core**: Markdown files (plain text, portable, future-proof)
- **Scripts**: Bash (cross-platform shell scripts)
- **Web UI** (optional):
  - **Frontend**: React 19 + TypeScript
  - **Build Tool**: Vite 5
  - **UI Library**: Mantine 8
  - **Markdown Processing**: gray-matter, react-markdown
  - **Search**: MiniSearch
  - **Routing**: React Router 7

## Project Structure

```
captains-log/
├── daily/           # Daily log entries (YYYY-MM-DD.md)
├── weekly/          # Weekly summaries (YYYY-WNN.md)
├── monthly/         # Monthly overviews (YYYY-MM.md)
├── yearly/          # Yearly retrospectives (YYYY.md)
├── topics/          # Long-running topic notes
├── people/          # Individual people profiles and interaction tracking
├── templates/       # Markdown templates for consistency
├── scripts/         # Helper scripts for automation
└── README.md        # This file
```

## Getting Started

### Quick Start - Interactive Menu
```bash
# Launch the interactive quick start menu
./scripts/quickstart.sh
```

This will show you options to:
1. Create/edit daily logs
2. Add quick notes
3. Create weekly summaries
4. Manage people profiles
5. View recent entries
6. Start the web viewer

### Quick Start - Direct Commands
```bash
# Create today's daily log
./scripts/new_daily.sh

# Add a quick note to today's log (interactive)
./scripts/add_to_daily.sh

# Create daily log for specific date
./scripts/new_daily.sh 2025-12-10

# View recent entries
ls -la daily/
ls -la weekly/
```

### Daily Workflow
1. **Morning**: Run `./scripts/quickstart.sh` or `./scripts/new_daily.sh` to create today's entry
2. **Throughout day**: Use `./scripts/add_to_daily.sh` to quickly add notes, or keep the file open and update as you go
3. **Evening**: Complete follow-up items and note longer-term threads
4. **End of week**: Create weekly summary using the quickstart menu

## Entry Types

### Daily Logs (`daily/YYYY-MM-DD.md`)
Structured daily entries covering:
- **Context**: Day, location, current focus areas
- **Deliverables**: Completed work and key outputs
- **Blockers/Issues**: Current obstacles and challenges
- **Leadership Actions**: 1:1s, feedback, coaching, team alignment
- **People Interactions**: Individual conversations with working style observations
- **Architecture/Infra Notes**: Technical decisions and infrastructure changes
- **Product/Stakeholder Interactions**: Key conversations and alignment
- **Follow ups Tomorrow**: Next day priorities
- **Longer Term Threads**: Ongoing initiatives to track

### Weekly Summaries (`weekly/YYYY-WNN.md`)
High-level weekly retrospectives including:
- **Week In One Paragraph**: Overall narrative and team mood
- **Top 3 Outcomes**: Key achievements and wins
- **Top Risks/Concerns**: Current challenges and blockers
- **Key Decisions**: Important choices with context and rationale
- **People and Team Notes**: HR, performance, and team dynamics
- **Process and SDLC**: Improvements to ceremonies and workflows
- **Technical Highlights**: Architecture and infrastructure changes
- **Next Week Focus**: Upcoming priorities and goals

### Monthly Overviews (`monthly/YYYY-MM.md`)
Monthly retrospectives including:
- **Month In One Paragraph**: High-level summary
- **Top Achievements**: Key wins and milestones
- **Key Themes**: Patterns and recurring topics
- **People and Team**: Team growth and dynamics
- **Technical Progress**: Major technical advancements
- **Process Improvements**: SDLC and workflow enhancements
- **Looking Ahead**: Next month priorities

### Yearly Retrospectives (`yearly/YYYY.md`)
Annual reviews including:
- **Year Overview**: High-level narrative
- **Major Achievements**: Significant accomplishments
- **Leadership Growth**: Personal development
- **Team Evolution**: How the team changed
- **Technical Milestones**: Major technical achievements
- **Lessons Learned**: Key insights from the year
- **Next Year Goals**: Focus areas for the coming year

### Topic Notes (`topics/<topic-name>.md`)
Long-running themes that span multiple weeks:
- **Overview**: Purpose and importance of the topic
- **Timeline**: Key events in chronological order
- **Current Status**: Present state and progress
- **Open Questions**: Unresolved items requiring attention
- **Options and Tradeoffs**: Decision analysis frameworks
- **Decisions Made**: Historical choices with full context
- **Next Actions**: Required follow-up activities

### People Profiles (`people/firstname-lastname.md`)
Individual relationship tracking:
- **Basic Info**: Role, team, reporting structure, location
- **Working Style & Preferences**: Communication and decision-making patterns
- **Strengths & Expertise**: Skills and domain knowledge
- **Development Areas & Growth**: Career goals and support needed
- **Interaction Patterns & Themes**: Recent conversations and recurring themes
- **Project History & Context**: Current and past projects
- **Relationship Building**: Personal interests and background
- **Follow-Up Actions**: Short, medium, and long-term action items

## Web Viewer

Captain's Log includes a modern web interface for browsing your entries:

### Starting the Web Viewer
```bash
# Easy way - use the quickstart menu
./scripts/quickstart.sh
# Then choose option 6

# Or manually
npm install              # First time only
./scripts/sync_to_web.sh # Sync your markdown files
npm run dev              # Start the server
```

Then open http://localhost:5175/ in your browser.

### Web Viewer Features
- **Dashboard**: Overview with recent entries and quick stats
- **Calendar**: Date-based navigation of log entries
- **Search**: Full-text search across all entries
- **People**: Browse and manage people profiles
- **Todo Dashboard**: Automatically extracts and tracks todos from your log entries
  - Parses markdown checkboxes (`- [ ]` and `- [x]`)
  - Detects TODO: items in your notes
  - Tracks items from "Follow ups Tomorrow" sections
  - Shows completion rate and progress stats
  - Filters by pending, completed, or all items
- **Demo Mode**: Toggle to view sample data and explore features

### Demo Mode

The web viewer includes a demo mode that lets you explore features with sample data before creating your own entries:

1. **Access Demo Mode**: Click the "Demo Mode" toggle in the top-right corner of the web interface
2. **Sample Data**: Includes realistic daily logs, people profiles, and weekly summaries
3. **Try Features**: Test the Todo Dashboard, search, and other features with populated data
4. **Your Data**: Toggle demo mode off to return to your personal entries

Demo data is located in `public/data/demo/` and is served alongside your real data.

## Templates

All templates are located in `templates/` and provide consistent structure:

- **`daily-note-template.md`**: Standard daily log format
- **`weekly-summary-template.md`**: Weekly retrospective structure
- **`monthly-overview-template.md`**: Monthly overview format
- **`yearly-overview-template.md`**: Yearly retrospective structure
- **`topic-note-template.md`**: Long-term topic tracking format
- **`people-profile-template.md`**: Individual relationship tracking format

To use a template:
1. The scripts automatically use templates (recommended)
2. Or manually: Copy from `templates/` to appropriate directory
3. Rename with proper date/topic format
4. Fill in sections as needed

## Scripts

### `./scripts/quickstart.sh`
Interactive menu for all common tasks - **recommended for beginners!**

### `./scripts/new_daily.sh`
Automated daily log creation script.

**Usage:**
```bash
# Create today's entry
./scripts/new_daily.sh

# Create entry for specific date
./scripts/new_daily.sh 2025-12-10
```

### `./scripts/add_to_daily.sh`
Quickly add notes to today's log without opening an editor.

**Usage:**
```bash
# Add to today's log
./scripts/add_to_daily.sh

# Add to a specific date's log
./scripts/add_to_daily.sh 2025-12-10
```

**Features:**
- Interactive prompts for different entry types
- Automatically creates the daily log if it doesn't exist
- Supports adding multiple entries in one session

### `./scripts/sync_to_web.sh`
Syncs markdown files to the web viewer.

**Usage:**
```bash
./scripts/sync_to_web.sh
```

## Git Workflow

Regular commits maintain historical context of decisions and thought processes:

```bash
# Add and commit daily progress
git add daily/2025-12-14.md
git commit -m "Add daily log for 2025-12-14"

# Weekly summary commits
git add weekly/2025-W50.md
git commit -m "Add weekly summary W50"

# Bulk updates
git add .
git commit -m "Update logs and summaries"
git push
```

## Best Practices

### Content Guidelines
- **Be specific**: Include names, dates, and concrete outcomes
- **Track decisions**: Document rationale and people involved
- **Note follow-ups**: Ensure action items don't get lost
- **Maintain privacy**: This is a personal leadership journal
- **Focus on learning**: Capture what worked, what didn't, and why
- **Track relationships**: Document interaction patterns and working styles

### Organizational Tips
- Use consistent date formats (YYYY-MM-DD for daily, YYYY-WNN for weekly)
- Keep entries factual and decision-focused
- Reference other entries when topics span multiple days
- Use templates to maintain structural consistency
- Commit regularly to preserve decision context
- Link daily interactions to people profiles for longitudinal tracking

### Weekly Reviews
- Summarize key themes and patterns
- Identify risks that need ongoing attention
- Document important decisions with full context
- Plan focus areas for the upcoming week
- Track progress on longer-term initiatives

## Example Usage

### Creating Your First Entry
```bash
# Easy way - interactive menu
./scripts/quickstart.sh

# Or direct command
./scripts/new_daily.sh

# Edit in your preferred editor
code daily/$(date +%F).md  # VS Code
vim daily/$(date +%F).md   # Vim
nano daily/$(date +%F).md  # Nano
```

### Adding Notes Throughout the Day
```bash
# Quick add without opening editor
./scripts/add_to_daily.sh

# Follow the interactive prompts
```

### End of Week Summary
```bash
# Use the quickstart menu
./scripts/quickstart.sh
# Choose option 3

# Or manually
cp templates/weekly-summary-template.md weekly/2025-W$(date +%U).md

# Fill in retrospective details
# Commit when complete
git add weekly/2025-W$(date +%U).md
git commit -m "Add weekly summary W$(date +%U)"
```

### Creating a Topic Note
```bash
# Copy template
cp templates/topic-note-template.md topics/architecture-migration.md

# Edit and track long-running initiative
# Commit when ready
git add topics/architecture-migration.md
git commit -m "Add topic note for architecture migration"
```

### Creating a People Profile
```bash
# Use the quickstart menu
./scripts/quickstart.sh
# Choose option 4

# Or manually
cp templates/people-profile-template.md people/jane-smith.md

# Document working style and interaction patterns
# Commit when ready
git add people/jane-smith.md
git commit -m "Add profile for Jane Smith"
```

## 📝 Use Cases

### For Students
- Track daily coursework and assignment progress
- Document research findings and experiments
- Maintain notes on professors and courses
- Reflect on internship experiences
- Build a portfolio of learning

### For Developers
- Log daily development work and decisions
- Track bug fixes and their context
- Document architecture decisions
- Maintain sprint retrospectives
- Keep notes on code reviews and pair programming sessions

### For Researchers
- Daily lab notes and experiment tracking
- Weekly research progress summaries
- Collaboration notes with advisors and peers
- Literature review tracking
- Conference and paper planning

### For Engineering Leaders
- Track team progress and blockers
- Document 1:1 conversations and coaching
- Maintain decision logs with context
- Weekly team retrospectives
- People development tracking

## 🤝 Contributing

Contributions are welcome! This project is designed to be simple and focused. If you have ideas for improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the practice of engineering leadership journals
- Built with modern web technologies for an enhanced user experience
- Designed to be simple, portable, and future-proof

## Support

- For quick guidance, see `QUICKSTART.md` for a beginner-friendly guide
- For AI assistant guidance and automation support, see `agents.md`
- For issues or questions, refer to the troubleshooting section in `QUICKSTART.md`
