import { useState, useEffect } from 'react'
import type { TodoItem } from '../types'
import { useLogEntries } from './useLogEntries'

export function useTodos() {
  const { entries } = useLogEntries()
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    
    // Extract todos from log entries
    const extractedTodos: TodoItem[] = []
    
    entries.forEach(entry => {
      // Look for todo items in various formats
      const lines = entry.content.split('\n')
      
      lines.forEach((line, index) => {
        // Match various todo formats:
        // - [ ] Todo item
        // - [x] Completed todo
        // - TODO: Something
        // - Follow ups Tomorrow:
        const todoMatches = [
          line.match(/^[\s-]*\[([ x])\]\s+(.+)$/), // Markdown checkbox format
          line.match(/^[\s-]*TODO:\s*(.+)$/i),    // TODO: format
          line.match(/^[\s-]*-\s+(.+)$/) && line.includes('Follow ups Tomorrow') ? null : line.match(/^[\s-]*-\s+(.+)$/), // List items under certain sections
        ].filter(Boolean)

        todoMatches.forEach(match => {
          if (match) {
            const isCompleted = match[1] === 'x' || line.toLowerCase().includes('completed') || line.toLowerCase().includes('done')
            const content = match[2] || match[1]
            
            if (content && content.trim().length > 3) { // Filter out very short items
              extractedTodos.push({
                id: `${entry.id}-${index}`,
                content: content.trim(),
                completed: isCompleted,
                date: entry.date,
                source: entry.title
              })
            }
          }
        })

        // Also extract items from "Follow ups Tomorrow" sections
        if (line.toLowerCase().includes('follow ups tomorrow') || line.toLowerCase().includes('follow up')) {
          // Look for items in the next few lines
          for (let i = index + 1; i < Math.min(index + 10, lines.length); i++) {
            const nextLine = lines[i]
            const listMatch = nextLine.match(/^[\s-]*-\s+(.+)$/)
            if (listMatch && nextLine.trim() && !nextLine.startsWith('#')) {
              extractedTodos.push({
                id: `${entry.id}-followup-${i}`,
                content: listMatch[1].trim(),
                completed: false,
                date: entry.date,
                source: `${entry.title} - Follow ups`
              })
            } else if (nextLine.startsWith('#') || nextLine.trim() === '') {
              break // Stop at next section or empty line
            }
          }
        }
      })
    })

    // Sort by date (newest first) and remove duplicates
    const uniqueTodos = extractedTodos
      .filter((todo, index, self) => 
        index === self.findIndex(t => t.content === todo.content && t.source === todo.source)
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime())

    setTodos(uniqueTodos)
    setLoading(false)
  }, [entries])

  const incompleteTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)

  return { 
    todos, 
    incompleteTodos, 
    completedTodos, 
    loading,
    totalCount: todos.length,
    completedCount: completedTodos.length,
    incompleteCount: incompleteTodos.length
  }
}