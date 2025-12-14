import { useState, useEffect } from 'react'
import type { Person } from '../types'
import { FileReader } from '../utils/fileReader'

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadPeople() {
      try {
        setLoading(true)
        const allPeople = await FileReader.loadAllPeople()
        
        if (mounted) {
          setPeople(allPeople)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load people')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadPeople()

    return () => {
      mounted = false
    }
  }, [])

  return { people, loading, error }
}