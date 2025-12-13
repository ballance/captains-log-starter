# Captain's Log

A personal leadership journal system for engineering leaders to track daily progress, weekly summaries, and ongoing leadership topics through a structured markdown-based approach.

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

### Quick Start
```bash
# Create today's daily log
./scripts/new_daily.sh

# Create daily log for specific date
./scripts/new_daily.sh 2025-11-18

# View recent entries
ls -la daily/
ls -la weekly/
```

### Daily Workflow
1. **Morning**: Run `./scripts/new_daily.sh` to create today's entry
2. **Throughout day**: Update sections as work progresses
3. **Evening**: Complete follow-up items and longer-term threads
4. **End of week**: Create weekly summary using `templates/weekly-summary-template.md`

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

## Templates

All templates are located in `templates/` and provide consistent structure:

- **`daily-note-template.md`**: Standard daily log format
- **`weekly-summary-template.md`**: Weekly retrospective structure
- **`monthly-overview-template.md`**: Monthly overview format
- **`yearly-overview-template.md`**: Yearly retrospective structure
- **`topic-note-template.md`**: Long-term topic tracking format
- **`people-profile-template.md`**: Individual relationship tracking format

To use a template:
1. Copy from `templates/` to appropriate directory
2. Rename with proper date/topic format
3. Fill in sections as needed

## Scripts

### `./scripts/new_daily.sh`
Automated daily log creation script.

**Usage:**
```bash
# Create today's entry
./scripts/new_daily.sh

# Create entry for specific date
./scripts/new_daily.sh 2025-11-18
```

**Features:**
- Automatically uses current date if none specified
- Creates `daily/` directory if it doesn't exist
- Won't overwrite existing files
- Copies from daily template and confirms creation

## Git Workflow

Regular commits maintain historical context of decisions and thought processes:

```bash
# Add and commit daily progress
git add daily/2025-11-19.md
git commit -m "Add daily log for 2025-11-19"

# Weekly summary commits
git add weekly/2025-W47.md
git commit -m "Add weekly summary W47"

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
# Create today's log
./scripts/new_daily.sh

# Edit in your preferred editor
code daily/$(date +%F).md  # VS Code
vim daily/$(date +%F).md   # Vim
nano daily/$(date +%F).md  # Nano
```

### End of Week Summary
```bash
# Copy template (macOS/Linux)
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
# Copy template
cp templates/people-profile-template.md people/jane-smith.md

# Document working style and interaction patterns
# Commit when ready
git add people/jane-smith.md
git commit -m "Add profile for Jane Smith"
```

## Support

For questions about using this system effectively or integrating with tools, see `CLAUDE.md` for AI assistant guidance and automation support.
