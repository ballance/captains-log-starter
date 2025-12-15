import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface DemoModeContextType {
  isDemoMode: boolean
  toggleDemoMode: () => void
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined)

const DEMO_MODE_STORAGE_KEY = 'captains-log-demo-mode'

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    // Initialize from localStorage or default to true for first-time users
    const stored = localStorage.getItem(DEMO_MODE_STORAGE_KEY)
    return stored !== null ? stored === 'true' : true
  })

  useEffect(() => {
    // Persist to localStorage whenever it changes
    localStorage.setItem(DEMO_MODE_STORAGE_KEY, isDemoMode.toString())
  }, [isDemoMode])

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev)
  }

  return (
    <DemoModeContext.Provider value={{ isDemoMode, toggleDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  )
}

export function useDemoMode() {
  const context = useContext(DemoModeContext)
  if (context === undefined) {
    throw new Error('useDemoMode must be used within a DemoModeProvider')
  }
  return context
}
