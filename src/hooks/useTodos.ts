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
        // Match specific todo formats only:
        // - [ ] Todo item
        // - [x] Completed todo
        // - TODO: Something
        const checkboxMatch = line.match(/^[\s-]*\[([ xX])\]\s+(.+)$/)
        const todoMatch = line.match(/^[\s-]*TODO:\s*(.+)$/i)

        if (checkboxMatch) {
          const isCompleted = checkboxMatch[1].toLowerCase() === 'x'
          const content = checkboxMatch[2]

          if (content && content.trim().length > 3) {
            extractedTodos.push({
              id: `${entry.id}-${index}`,
              content: content.trim(),
              completed: isCompleted,
              date: entry.date,
              source: entry.title
            })
          }
        } else if (todoMatch) {
          const content = todoMatch[1]

          if (content && content.trim().length > 3) {
            extractedTodos.push({
              id: `${entry.id}-todo-${index}`,
              content: content.trim(),
              completed: false,
              date: entry.date,
              source: entry.title
            })
          }
        }

        // Also extract items from "Follow ups Tomorrow" sections
        if (line.toLowerCase().includes('follow ups tomorrow')) {
          // Look for checkbox items in the next few lines
          for (let i = index + 1; i < Math.min(index + 10, lines.length); i++) {
            const nextLine = lines[i]

            // Stop at next section heading or empty line
            if (nextLine.startsWith('#') || nextLine.trim() === '') {
              break
            }

            // Only extract checkbox items from follow-up sections
            const checkboxMatch = nextLine.match(/^[\s-]*\[([ xX])\]\s+(.+)$/)
            if (checkboxMatch) {
              const isCompleted = checkboxMatch[1].toLowerCase() === 'x'
              const content = checkboxMatch[2]

              if (content && content.trim().length > 3) {
                extractedTodos.push({
                  id: `${entry.id}-followup-${i}`,
                  content: content.trim(),
                  completed: isCompleted,
                  date: entry.date,
                  source: `${entry.title} - Follow ups`
                })
              }
            }
          }
        }
      })
    })

    // Sort by date (newest first) and remove duplicates
    const uniqueTodos = extractedTodos
      .filter((todo, index, self) =>
        index === self.findIndex(t =>
          t.content.toLowerCase() === todo.content.toLowerCase() &&
          t.date.toDateString() === todo.date.toDateString()
        )
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