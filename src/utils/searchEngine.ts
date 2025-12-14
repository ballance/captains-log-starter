import MiniSearch from 'minisearch'
import type { LogEntry, SearchResult } from '../types'

export class SearchEngine {
  private miniSearch: MiniSearch<LogEntry>

  constructor() {
    this.miniSearch = new MiniSearch({
      fields: ['title', 'content', 'type'], // fields to search
      storeFields: ['id', 'title', 'content', 'type', 'date', 'filePath'], // fields to return
      searchOptions: {
        boost: { title: 2 }, // boost title matches
        fuzzy: 0.2, // allow some typos
        prefix: true, // allow prefix matching
      }
    })
  }

  indexEntries(entries: LogEntry[]) {
    // Remove all previous documents and add new ones
    this.miniSearch.removeAll()
    this.miniSearch.addAll(entries.map(entry => ({
      ...entry,
      // Prepare content for better searching
      content: this.prepareContent(entry.content)
    })))
  }

  private prepareContent(content: string): string {
    // Remove markdown formatting for better search
    return content
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Extract link text
      .replace(/```[\s\S]*?```/g, ' ') // Remove code blocks
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim()
  }

  search(query: string): SearchResult[] {
    if (!query.trim()) {
      return []
    }

    const results = this.miniSearch.search(query, {
      limit: 20
    })

    return results.map(result => ({
      entry: result as LogEntry,
      snippet: this.extractSnippet(result.content, query),
      score: result.score || 0
    }))
  }

  private extractSnippet(content: string, query: string, snippetLength = 200): string {
    // Ensure content is a string
    const safeContent = String(content || '')
    const words = query.toLowerCase().split(' ').filter(w => w.length > 0)
    const contentLower = safeContent.toLowerCase()
    
    // Find the first occurrence of any search term
    let firstIndex = -1
    for (const word of words) {
      const index = contentLower.indexOf(word)
      if (index !== -1 && (firstIndex === -1 || index < firstIndex)) {
        firstIndex = index
      }
    }

    if (firstIndex === -1) {
      return safeContent.slice(0, snippetLength) + (safeContent.length > snippetLength ? '...' : '')
    }

    // Extract snippet around the found term
    const start = Math.max(0, firstIndex - snippetLength / 2)
    const end = Math.min(safeContent.length, start + snippetLength)
    
    let snippet = safeContent.slice(start, end)
    
    // Add ellipsis if we're not at the beginning/end
    if (start > 0) snippet = '...' + snippet
    if (end < safeContent.length) snippet = snippet + '...'

    // Highlight search terms
    for (const word of words) {
      const regex = new RegExp(`(${word})`, 'gi')
      snippet = snippet.replace(regex, '**$1**')
    }

    return snippet
  }

  // Get suggestions for autocomplete
  getSuggestions(query: string): string[] {
    if (!query.trim()) {
      return []
    }

    const results = this.miniSearch.search(query, {
      limit: 5,
      prefix: true
    })

    return results.map(result => result.title)
  }
}