import { useState, useEffect, useMemo } from 'react'
import type { SearchResult } from '../types'
import { SearchEngine } from '../utils/searchEngine'
import { useLogEntries } from './useLogEntries'

export function useSearch() {
  const { entries, loading: entriesLoading } = useLogEntries()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)

  // Initialize search engine with entries
  const searchEngine = useMemo(() => {
    const engine = new SearchEngine()
    if (entries.length > 0) {
      engine.indexEntries(entries)
    }
    return engine
  }, [entries])

  // Perform search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSearching(false)
      return
    }

    setSearching(true)
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      const searchResults = searchEngine.search(query)
      setResults(searchResults)
      setSearching(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, searchEngine])

  const getSuggestions = (partialQuery: string): string[] => {
    return searchEngine.getSuggestions(partialQuery)
  }

  return {
    query,
    setQuery,
    results,
    searching,
    loading: entriesLoading,
    getSuggestions
  }
}