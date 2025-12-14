import { AppShell, NavLink, Group, Title, Burger } from '@mantine/core'
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

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [opened, { toggle }] = useDisclosure()

  // Initialize data cache on app startup
  useEffect(() => {
    DataCache.initialize()
    
    // Cleanup on unmount
    return () => {
      DataCache.cleanup()
    }
  }, [])

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
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={2}>Captain's Log</Title>
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
