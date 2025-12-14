export interface LogEntry {
  id: string
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
  date: Date
  title: string
  content: string
  filePath: string
  frontMatter?: Record<string, any>
}

export interface Person {
  id: string
  name: string
  role?: string
  filePath: string
  content: string
}

export interface TodoItem {
  id: string
  content: string
  completed: boolean
  date: Date
  source: string // which log entry this came from
}

export interface SearchResult {
  entry: LogEntry
  snippet: string
  score: number
}