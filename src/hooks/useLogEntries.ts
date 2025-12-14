import { useState, useEffect } from 'react'
import type { LogEntry } from '../types'
import { FileReader } from '../utils/fileReader'

export function useLogEntries() {
  const [entries, setEntries] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadEntries() {
      try {
        setLoading(true)
        const allEntries = await FileReader.loadAllEntries()
        
        if (mounted) {
          setEntries(allEntries)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load entries')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadEntries()

    return () => {
      mounted = false
    }
  }, [])

  return { entries, loading, error }
}