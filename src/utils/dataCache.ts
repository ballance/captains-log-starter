import matter from 'gray-matter'
import type { LogEntry, Person } from '../types'
import { parse } from 'date-fns'

interface CacheData {
  people: Person[]
  dailyLogs: LogEntry[]
  weeklyLogs: LogEntry[]
  monthlyLogs: LogEntry[]
  yearlyLogs: LogEntry[]
  lastUpdated: number
}

export class DataCache {
  private static cache: CacheData = {
    people: [],
    dailyLogs: [],
    weeklyLogs: [],
    monthlyLogs: [],
    yearlyLogs: [],
    lastUpdated: 0
  }
  
  private static refreshInterval: number | null = null
  private static readonly REFRESH_INTERVAL_MS = 60 * 1000 // 60 seconds
  private static isLoading = false

  static async initialize() {
    if (this.isLoading) return
    
    this.isLoading = true
    try {
      await this.refreshCache()
      
      // Set up periodic refresh
      if (this.refreshInterval) {
        window.clearInterval(this.refreshInterval)
      }
      
      this.refreshInterval = window.setInterval(() => {
        this.refreshCache().catch(console.error)
      }, this.REFRESH_INTERVAL_MS)
    } finally {
      this.isLoading = false
    }
  }

  static async refreshCache() {
    console.log('Refreshing data cache...')
    
    try {
      const [people, dailyLogs, weeklyLogs, monthlyLogs, yearlyLogs] = await Promise.all([
        this.loadPeopleFromFiles(),
        this.loadDailyLogsFromFiles(),
        this.loadWeeklyLogsFromFiles(),
        this.loadMonthlyLogsFromFiles(),
        this.loadYearlyLogsFromFiles()
      ])

      this.cache = {
        people,
        dailyLogs,
        weeklyLogs,
        monthlyLogs,
        yearlyLogs,
        lastUpdated: Date.now()
      }
      
      console.log(`Cache refreshed: ${people.length} people, ${dailyLogs.length} daily logs, ${weeklyLogs.length} weekly logs, ${monthlyLogs.length} monthly logs, ${yearlyLogs.length} yearly logs`)
      console.log('People loaded:', people.map(p => p.name))
    } catch (error) {
      console.error('Failed to refresh cache:', error)
    }
  }

  static getPeople(): Person[] {
    return [...this.cache.people]
  }

  static getDailyLogs(): LogEntry[] {
    return [...this.cache.dailyLogs]
  }

  static getWeeklyLogs(): LogEntry[] {
    return [...this.cache.weeklyLogs]
  }

  static getMonthlyLogs(): LogEntry[] {
    return [...this.cache.monthlyLogs]
  }

  static getYearlyLogs(): LogEntry[] {
    return [...this.cache.yearlyLogs]
  }

  static getAllLogs(): LogEntry[] {
    return [
      ...this.cache.dailyLogs,
      ...this.cache.weeklyLogs,
      ...this.cache.monthlyLogs,
      ...this.cache.yearlyLogs
    ].sort((a, b) => b.date.getTime() - a.date.getTime())
  }

  static getLastUpdated(): number {
    return this.cache.lastUpdated
  }

  static cleanup() {
    if (this.refreshInterval) {
      window.clearInterval(this.refreshInterval)
      this.refreshInterval = null
    }
  }

  private static async loadPeopleFromFiles(): Promise<Person[]> {
    const knownFiles: string[] = [
      // Add your people profile files here
      // Example: 'firstname-lastname.md'
    ]

    const people: Person[] = []

    for (const fileName of knownFiles) {
      try {
        const filePath = `/data/people/${fileName}`
        console.log(`Attempting to fetch: ${filePath}`)
        const response = await fetch(filePath)
        console.log(`Fetch response for ${fileName}:`, response.ok, response.status)
        if (!response.ok) {
          console.warn(`Failed to fetch ${fileName}: ${response.status} ${response.statusText}`)
          continue
        }
        
        const content = await response.text()
        const parsed = matter(content)
        
        const id = fileName.replace('.md', '')
        const name = parsed.data.name || this.formatNameFromFilename(id)
        const role = this.extractRoleFromContent(content)
        
        console.log(`Loaded person: ${name} (${role})`)
        
        people.push({
          id,
          name,
          role,
          filePath,
          content: parsed.content
        })
      } catch (error) {
        console.error(`Failed to load person file ${fileName}:`, error)
      }
    }

    return people.sort((a, b) => a.name.localeCompare(b.name))
  }

  private static async loadDailyLogsFromFiles(): Promise<LogEntry[]> {
    const dailyFiles: string[] = [
      // Add your daily log files here
      // Example: '2025-12-14.md'
    ]

    return this.loadLogEntries(dailyFiles, '/data/daily/', 'daily')
  }

  private static async loadWeeklyLogsFromFiles(): Promise<LogEntry[]> {
    const weeklyFiles: string[] = [
      // Add your weekly summary files here
      // Example: '2025-W50.md'
    ]
    return this.loadLogEntries(weeklyFiles, '/data/weekly/', 'weekly')
  }

  private static async loadMonthlyLogsFromFiles(): Promise<LogEntry[]> {
    const monthlyFiles: string[] = [
      // Add your monthly overview files here
      // Example: '2025-12.md'
    ]
    return this.loadLogEntries(monthlyFiles, '/data/monthly/', 'monthly')
  }

  private static async loadYearlyLogsFromFiles(): Promise<LogEntry[]> {
    const yearlyFiles: string[] = [
      // Add your yearly retrospective files here
      // Example: '2025.md'
    ]
    return this.loadLogEntries(yearlyFiles, '/data/yearly/', 'yearly')
  }

  private static async loadLogEntries(
    fileNames: string[], 
    dirPath: string, 
    type: 'daily' | 'weekly' | 'monthly' | 'yearly'
  ): Promise<LogEntry[]> {
    const entries: LogEntry[] = []

    for (const fileName of fileNames) {
      try {
        const filePath = `${dirPath}${fileName}`
        const response = await fetch(filePath)
        if (!response.ok) continue
        
        const content = await response.text()
        const parsed = matter(content)
        
        const id = fileName.replace('.md', '')
        const date = this.parseDateFromFilename(fileName, type)
        const title = this.extractTitleFromContent(content) || `${type.charAt(0).toUpperCase() + type.slice(1)} Log - ${id}`
        
        entries.push({
          id,
          type,
          date,
          title,
          content: parsed.content,
          filePath,
          frontMatter: parsed.data
        })
      } catch (error) {
        console.warn(`Failed to load ${type} file ${fileName}:`, error)
      }
    }

    return entries.sort((a, b) => b.date.getTime() - a.date.getTime())
  }

  private static parseDateFromFilename(filename: string, type: string): Date {
    switch (type) {
      case 'daily':
        // Format: 2025-12-09.md
        const dailyMatch = filename.match(/(\d{4}-\d{2}-\d{2})/)
        if (dailyMatch) {
          return parse(dailyMatch[1], 'yyyy-MM-dd', new Date())
        }
        break
      case 'weekly':
        // Format: 2025-W47.md
        const weeklyMatch = filename.match(/(\d{4})-W(\d{1,2})/)
        if (weeklyMatch) {
          const year = parseInt(weeklyMatch[1])
          const week = parseInt(weeklyMatch[2])
          // Approximate date - first day of the week
          return new Date(year, 0, (week - 1) * 7 + 1)
        }
        break
      case 'monthly':
        // Format: 2025-12.md
        const monthlyMatch = filename.match(/(\d{4}-\d{2})/)
        if (monthlyMatch) {
          return parse(monthlyMatch[1], 'yyyy-MM', new Date())
        }
        break
      case 'yearly':
        // Format: 2025.md
        const yearlyMatch = filename.match(/(\d{4})/)
        if (yearlyMatch) {
          return parse(yearlyMatch[1], 'yyyy', new Date())
        }
        break
    }
    return new Date()
  }

  private static extractTitleFromContent(content: string): string | null {
    const titleMatch = content.match(/^#\s+(.+)$/m)
    return titleMatch ? titleMatch[1].trim() : null
  }

  private static formatNameFromFilename(filename: string): string {
    return filename
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }

  private static extractRoleFromContent(content: string): string {
    const roleMatch = content.match(/\*\*Role\/Title\*\*:?\s*(.+)/i)
    if (roleMatch) return roleMatch[1].trim()
    
    const titleMatch = content.match(/\*\*Title\*\*:?\s*(.+)/i)
    if (titleMatch) return titleMatch[1].trim()
    
    return 'Team Member'
  }
}