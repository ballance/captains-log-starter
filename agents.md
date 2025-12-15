# Captain's Log - Claude AI Assistant Guide

## Project Overview

This is a personal leadership journal system for engineering leaders. The project helps track daily progress, weekly summaries, and ongoing leadership topics through a structured markdown-based approach.

The project includes both command-line scripts and a modern web interface built with React, TypeScript, and Mantine UI components.

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
├── src/             # Web UI source code (React + TypeScript)
│   ├── components/  # React components (Dashboard, TodoList, Calendar, etc.)
│   ├── hooks/       # Custom React hooks (useTodos, useLogEntries, etc.)
│   ├── contexts/    # React contexts (DemoModeContext)
│   ├── utils/       # Utility functions (dataCache.ts)
│   └── types/       # TypeScript type definitions
├── public/          # Static assets served by the web viewer
│   └── data/        # Data files for the web viewer
│       └── demo/    # Sample data for demo mode
└── README.md        # Project documentation
```

## Key Commands and Workflows

### Creating New Entries

**Daily Log Creation:**
```bash
# Create today's daily log
./scripts/new_daily.sh

# Create log for specific date
./scripts/new_daily.sh 2025-11-18
```

**Manual Creation:**
- Daily logs: Copy `templates/daily-note-template.md` to `daily/YYYY-MM-DD.md`
- Weekly summaries: Copy `templates/weekly-summary-template.md` to `weekly/YYYY-WNN.md`
- Monthly overviews: Copy `templates/monthly-overview-template.md` to `monthly/YYYY-MM.md`
- Yearly retrospectives: Copy `templates/yearly-overview-template.md` to `yearly/YYYY.md`
- Topic notes: Copy `templates/topic-note-template.md` to `topics/<topic-name>.md`
- People profiles: Copy `templates/people-profile-template.md` to `people/firstname-lastname.md`

### Git Workflow
```bash
# Regular commits to maintain historical record
git add .
git commit -m "Add daily log for YYYY-MM-DD"
git push
```

### Web Viewer
```bash
# Start the web viewer
npm run dev

# Sync markdown files to web viewer (manual approach)
./scripts/sync_to_web.sh
```

The web viewer runs on `http://localhost:5175/` and includes:
- Dashboard with recent entries
- Calendar view for date-based navigation
- Full-text search across entries
- People profile browser
- Todo Dashboard with automatic extraction

## Templates and Structure

### Daily Log Template
- **Context**: Day, location, current focus areas
- **Deliverables**: Completed work and outputs
- **Blockers/Issues**: Current obstacles
- **Leadership Actions**: 1:1s, feedback, coaching, alignment
- **People Interactions**: Individual conversations with working style observations and themes
- **Architecture/Infra Notes**: Technical decisions and changes
- **Product/Stakeholder Interactions**: Key conversations
- **Follow ups Tomorrow**: Next day priorities
- **Longer Term Threads**: Ongoing initiatives to track

### Weekly Summary Template
- **Week In One Paragraph**: High-level narrative
- **Top 3 Outcomes**: Key achievements
- **Top Risks/Concerns**: Current challenges
- **Key Decisions**: Important choices made with context
- **People and Team Notes**: HR and team dynamics
- **Process and SDLC**: Process improvements
- **Technical Highlights**: Architecture and infrastructure
- **Next Week Focus**: Upcoming priorities

### Monthly Overview Template
- **Month In One Paragraph**: High-level summary
- **Top Achievements**: Key wins and milestones
- **Key Themes**: Patterns and recurring topics
- **People and Team**: Team growth and dynamics
- **Technical Progress**: Major technical advancements
- **Process Improvements**: SDLC and workflow enhancements
- **Looking Ahead**: Next month priorities

### Yearly Retrospective Template
- **Year Overview**: High-level narrative
- **Major Achievements**: Significant accomplishments
- **Leadership Growth**: Personal development journey
- **Team Evolution**: How the team changed and grew
- **Technical Milestones**: Major technical achievements
- **Lessons Learned**: Key insights from the year
- **Next Year Goals**: Focus areas for the coming year

### Topic Note Template
- **Overview**: Purpose and importance
- **Timeline**: Key events chronologically
- **Current Status**: Present state
- **Open Questions**: Unresolved items
- **Options and Tradeoffs**: Decision analysis
- **Decisions Made**: Historical choices with rationale
- **Next Actions**: Required follow-ups

### People Profile Template
- **Basic Info**: Role, team, reporting structure, location
- **Working Style & Preferences**: Communication style, meeting preferences, decision making
- **Strengths & Expertise**: Technical skills, domain knowledge, leadership strengths
- **Development Areas & Growth**: Career goals, skills to develop, support needed
- **Interaction Patterns & Themes**: Recent conversations, recurring themes, what works well
- **Project History & Context**: Current and past projects, key contributions
- **Relationship Building**: Personal interests, background, professional network
- **Follow-Up Actions**: Immediate, medium-term, and long-term action items

## Todo Extraction System

The web viewer automatically extracts todos from markdown log entries using the `useTodos` hook.

### Supported Todo Formats
- Markdown checkboxes: `- [ ]` (incomplete) and `- [x]` (completed)
- TODO items: `TODO: Task description`
- Items in "Follow ups Tomorrow" sections

### Implementation Details
- **Hook**: `src/hooks/useTodos.ts` - Extracts todos from log entries
- **Component**: `src/components/TodoList.tsx` - Displays todo dashboard
- **Deduplication**: Matches todos by content and date to prevent duplicates
- **Sorting**: Displays todos with newest entries first
- **Filtering**: Shows pending, completed, or all items

### Todo Metadata
Each extracted todo includes:
- `id`: Unique identifier
- `content`: Todo text
- `completed`: Boolean status
- `date`: Date from source log entry
- `source`: Source log entry title

## Demo Mode

The web viewer includes a demo mode for exploring features with sample data.

### How It Works
- **Toggle**: Located in the app header (top-right)
- **Data Source**: Switches between `public/data/` (real) and `public/data/demo/` (sample)
- **Context**: Managed by `src/contexts/DemoModeContext.tsx`
- **Cache**: `src/utils/dataCache.ts` handles data loading and switching
- **Persistence**: Demo mode state is saved to localStorage

### Demo Data Location
```
public/data/demo/
├── daily/       # Sample daily logs (2025-12-09 to 2025-12-14)
├── weekly/      # Sample weekly summary (2025-W50)
└── people/      # Sample people profiles
```

## Common Tasks for Claude

### Creating Log Entries
- When asked to "create today's log entry", use the daily template and today's date
- For weekly summaries, use ISO week format (YYYY-WNN)
- For monthly overviews, use YYYY-MM format
- For yearly retrospectives, use YYYY format
- For topic notes, use descriptive filenames in kebab-case
- For people profiles, use firstname-lastname.md format in the people/ directory

### File Management
- Always use the existing templates as the foundation
- Maintain consistent formatting and structure
- Follow the established naming conventions

### Content Guidelines
- Keep entries factual and decision-focused
- Include context for future reference
- Track follow-up actions and decisions
- Note people involved in key decisions
- **People Tracking**: Record interaction themes, working styles, and relationship patterns
- Link daily interactions to individual people profiles for longitudinal tracking

### Working with Web UI Code
When modifying the React web interface:

**Key Files:**
- `src/App.tsx` - Main app component with routing and navigation
- `src/components/TodoList.tsx` - Todo Dashboard component
- `src/hooks/useTodos.ts` - Todo extraction logic
- `src/utils/dataCache.ts` - Data loading and caching
- `src/contexts/DemoModeContext.tsx` - Demo mode state management

**UI Library:**
- Uses Mantine v8 components (`@mantine/core`)
- Icons from `@tabler/icons-react`
- Styling via Mantine's sx prop and inline styles

**Data Flow:**
1. `dataCache.ts` fetches markdown files from `/data/` or `/data/demo/`
2. Custom hooks (e.g., `useTodos`, `useLogEntries`) process the data
3. Components render the processed data using Mantine components
4. Demo mode toggle switches data source via context

**Common Patterns:**
- Read components before editing to understand structure
- Use Mantine components for consistency (Card, Group, Stack, Badge, etc.)
- Test changes with demo mode enabled
- Ensure responsive design with Mantine's Grid system

## Testing and Validation

- Verify script execution: `./scripts/new_daily.sh`
- Check template integrity by comparing against existing entries
- Ensure proper markdown formatting and structure
- Validate date formats match project conventions

## Important Notes

- This is a personal leadership journal - maintain appropriate privacy
- Focus on decisions, outcomes, and learning rather than daily tasks
- Use consistent date formatting throughout (YYYY-MM-DD)
- Commit regularly to maintain historical context
- Templates should not be modified without careful consideration

## Troubleshooting

**Script Issues:**
- Ensure scripts have execute permissions: `chmod +x scripts/new_daily.sh`
- Verify template files exist in `templates/` directory
- Check that target directories exist before running scripts

**File Organization:**
- Use proper date formats for consistency
- Follow naming conventions for different entry types
- Maintain template structure when creating new entries
