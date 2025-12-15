import { AppShell, NavLink, Group, Title, Burger, Switch, Badge } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendar, IconSearch, IconUsers, IconChecklist, IconHome } from '@tabler/icons-react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

// Import components
import Dashboard from './components/Dashboard'
import Calendar from './components/Calendar'
import Search from './components/Search'
import People from './components/People'
import TodoList from './components/TodoList'
import { DataCache } from './utils/dataCache'
import { useDemoMode } from './contexts/DemoModeContext'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [opened, { toggle }] = useDisclosure()
  const { isDemoMode, toggleDemoMode } = useDemoMode()

  // Initialize data cache on app startup
  useEffect(() => {
    DataCache.initialize()

    // Cleanup on unmount
    return () => {
      DataCache.cleanup()
    }
  }, [])

  // Sync demo mode with DataCache
  useEffect(() => {
    DataCache.setDemoMode(isDemoMode)
  }, [isDemoMode])

  const navItems = [
    { icon: IconHome, label: 'Dashboard', path: '/' },
    { icon: IconCalendar, label: 'Calendar', path: '/calendar' },
    { icon: IconSearch, label: 'Search', path: '/search' },
    { icon: IconUsers, label: 'People', path: '/people' },
    { icon: IconChecklist, label: 'Todo List', path: '/todos' },
  ]

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <img
              src="/images/picard-logo.jpg"
              alt="Captain Picard"
              style={{
                height: '45px',
                width: '45px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #228be6'
              }}
            />
            <Title order={2}>Captain's Log</Title>
          </Group>
          <Group gap="xs">
            {isDemoMode && (
              <Badge color="blue" variant="light">Demo Mode</Badge>
            )}
            <Switch
              checked={isDemoMode}
              onChange={toggleDemoMode}
              label="Demo Mode"
              size="md"
            />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            active={location.pathname === item.path}
            label={item.label}
            leftSection={<item.icon size="1rem" />}
            onClick={() => {
              navigate(item.path)
              if (opened) toggle() // Close mobile menu after navigation
            }}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/search" element={<Search />} />
          <Route path="/people" element={<People />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
