import { 
  Container, 
  Title, 
  Text, 
  Grid, 
  Card, 
  Stack, 
  Group, 
  Badge, 
  Loader, 
  Alert,
  Checkbox,
  Progress,
  Tabs,
  ActionIcon,
  Tooltip
} from '@mantine/core'
import { 
  IconChecklist, 
  IconInfoCircle, 
  IconCalendar, 
  IconClock,
  IconCheck,
  IconX,
  IconFileText
} from '@tabler/icons-react'
import { useState } from 'react'
import { format, isToday, isYesterday, isThisWeek } from 'date-fns'
import { useTodos } from '../hooks/useTodos'
import type { TodoItem } from '../types'

export default function TodoList() {
  const { 
    todos, 
    incompleteTodos, 
    completedTodos, 
    loading, 
    totalCount,
    completedCount,
    incompleteCount 
  } = useTodos()
  
  const [activeTab, setActiveTab] = useState<string>('incomplete')

  if (loading) {
    return (
      <Container size="xl">
        <Stack align="center" gap="md" py="xl">
          <Loader size="lg" />
          <Text>Extracting todos from log entries...</Text>
        </Stack>
      </Container>
    )
  }

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isYesterday(date)) return 'Yesterday'
    if (isThisWeek(date)) return format(date, 'EEEE')
    return format(date, 'MMM d, yyyy')
  }

  const getDateColor = (date: Date) => {
    if (isToday(date)) return 'blue'
    if (isYesterday(date)) return 'orange'
    if (isThisWeek(date)) return 'green'
    return 'gray'
  }

  const renderTodoItem = (todo: TodoItem) => (
    <Card key={todo.id} shadow="sm" p="lg" radius="md" mb="sm">
      <Group align="center" gap="lg" wrap="nowrap">
        <Checkbox
          checked={todo.completed}
          readOnly
          color={todo.completed ? 'green' : 'blue'}
          style={{ alignSelf: 'flex-start' }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text
            size="sm"
            fw={500}
            td={todo.completed ? 'line-through' : undefined}
            c={todo.completed ? 'dimmed' : undefined}
          >
            {todo.content}
          </Text>
          <Group gap="xs" mt={8} wrap="wrap">
            <Badge
              size="sm"
              variant="light"
              color={getDateColor(todo.date)}
              leftSection={<IconCalendar size={12} />}
            >
              {getDateLabel(todo.date)}
            </Badge>
            <Badge size="sm" variant="dot" color="gray">
              {todo.source.split(' - ')[0]}
            </Badge>
          </Group>
        </div>
      </Group>
    </Card>
  )

  const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <Container size="xl">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={1}>Todo Dashboard</Title>
          <Badge size="lg" variant="light" color="blue">
            {totalCount} items
          </Badge>
        </Group>

        {/* Summary Cards */}
        <Grid>
          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg" radius="md" withBorder ta="center">
              <Stack gap="xs">
                <IconClock size={32} color="var(--mantine-color-orange-6)" style={{ margin: '0 auto' }} />
                <Text size="xl" fw={700} c="orange">{incompleteCount}</Text>
                <Text size="sm" c="dimmed">Pending</Text>
              </Stack>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg" radius="md" withBorder ta="center">
              <Stack gap="xs">
                <IconCheck size={32} color="var(--mantine-color-green-6)" style={{ margin: '0 auto' }} />
                <Text size="xl" fw={700} c="green">{completedCount}</Text>
                <Text size="sm" c="dimmed">Completed</Text>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg" radius="md" withBorder ta="center">
              <Stack gap="xs">
                <IconChecklist size={32} color="var(--mantine-color-blue-6)" style={{ margin: '0 auto' }} />
                <Text size="xl" fw={700} c="blue">{totalCount}</Text>
                <Text size="sm" c="dimmed">Total Items</Text>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" fw={500}>Completion Rate</Text>
                  <Text size="sm" fw={700}>{Math.round(completionRate)}%</Text>
                </Group>
                <Progress value={completionRate} color="green" size="lg" />
                <Text size="xs" c="dimmed" ta="center">
                  {completedCount} of {totalCount} completed
                </Text>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Todo Lists */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab 
                value="incomplete" 
                leftSection={<IconClock size={16} />}
                rightSection={
                  <Badge size="xs" variant="light" color="orange">
                    {incompleteCount}
                  </Badge>
                }
              >
                Pending
              </Tabs.Tab>
              <Tabs.Tab 
                value="completed" 
                leftSection={<IconCheck size={16} />}
                rightSection={
                  <Badge size="xs" variant="light" color="green">
                    {completedCount}
                  </Badge>
                }
              >
                Completed
              </Tabs.Tab>
              <Tabs.Tab 
                value="all" 
                leftSection={<IconChecklist size={16} />}
                rightSection={
                  <Badge size="xs" variant="light" color="blue">
                    {totalCount}
                  </Badge>
                }
              >
                All Items
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="incomplete" pt="md">
              <Stack gap="sm" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {incompleteTodos.length > 0 ? (
                  incompleteTodos.map(renderTodoItem)
                ) : (
                  <Stack justify="center" align="center" py="xl">
                    <IconCheck size={48} color="var(--mantine-color-green-4)" />
                    <Text ta="center" c="dimmed">
                      All caught up! No pending todos.
                    </Text>
                  </Stack>
                )}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="completed" pt="md">
              <Stack gap="sm" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {completedTodos.length > 0 ? (
                  completedTodos.map(renderTodoItem)
                ) : (
                  <Stack justify="center" align="center" py="xl">
                    <IconX size={48} color="var(--mantine-color-gray-4)" />
                    <Text ta="center" c="dimmed">
                      No completed todos found.
                    </Text>
                  </Stack>
                )}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="all" pt="md">
              <Stack gap="sm" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {todos.length > 0 ? (
                  todos.map(renderTodoItem)
                ) : (
                  <Stack justify="center" align="center" py="xl">
                    <IconChecklist size={48} color="var(--mantine-color-gray-4)" />
                    <Text ta="center" c="dimmed">
                      No todos found in log entries.
                    </Text>
                  </Stack>
                )}
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Card>

        <Alert icon={<IconInfoCircle size="1rem" />} title="Todo Extraction" color="blue">
          <Text size="sm">
            • Todos are automatically extracted from daily log entries
            <br />
            • Supports markdown checkboxes: <code>- [ ] Todo item</code> and <code>- [x] Done item</code>
            <br />
            • Detects "TODO:" items and "Follow ups Tomorrow" sections
            <br />
            • Items are grouped by completion status and sorted by date
          </Text>
        </Alert>
      </Stack>
    </Container>
  )
}