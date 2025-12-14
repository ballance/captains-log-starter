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
  ActionIcon,
  Tooltip
} from '@mantine/core'
import { Calendar as MantineCalendar } from '@mantine/dates'
import { IconCalendar, IconChevronLeft, IconChevronRight, IconInfoCircle, IconFileText } from '@tabler/icons-react'
import { useState } from 'react'
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { useLogEntries } from '../hooks/useLogEntries'
import type { LogEntry } from '../types'

export default function Calendar() {
  const { entries, loading, error } = useLogEntries()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewDate, setViewDate] = useState<Date>(new Date())

  if (loading) {
    return (
      <Container size="xl">
        <Stack align="center" gap="md" py="xl">
          <Loader size="lg" />
          <Text>Loading calendar entries...</Text>
        </Stack>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="xl">
        <Alert icon={<IconInfoCircle size="1rem" />} title="Error loading entries" color="red">
          {error}
        </Alert>
      </Container>
    )
  }

  // Get daily entries only for calendar view
  const dailyEntries = entries.filter(e => e.type === 'daily')
  
  // Find entry for selected date
  const selectedEntry = dailyEntries.find(entry => 
    isSameDay(entry.date, selectedDate)
  )

  // Get dates that have entries in current month view
  const monthStart = startOfMonth(viewDate)
  const monthEnd = endOfMonth(viewDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  const datesWithEntries = new Set(
    dailyEntries
      .filter(entry => entry.date >= monthStart && entry.date <= monthEnd)
      .map(entry => format(entry.date, 'yyyy-MM-dd'))
  )

  const dayRenderer = (date: Date) => {
    // Ensure date is a proper Date object
    const dateObj = date instanceof Date ? date : new Date(date)
    
    const hasEntry = datesWithEntries.has(format(dateObj, 'yyyy-MM-dd'))
    const isSelected = isSameDay(dateObj, selectedDate)
    
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ 
          fontSize: '0.875rem',
          fontWeight: isSelected ? 600 : 400,
          color: hasEntry ? 'var(--mantine-color-blue-6)' : undefined
        }}>
          {dateObj.getDate()}
        </div>
        {hasEntry && (
          <div style={{
            position: 'absolute',
            bottom: 2,
            right: 2,
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'var(--mantine-color-blue-6)'
          }} />
        )}
      </div>
    )
  }

  return (
    <Container size="xl">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={1}>Calendar View</Title>
          <Group gap="xs">
            <ActionIcon
              variant="light"
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))}
            >
              <IconChevronLeft size={16} />
            </ActionIcon>
            <Text fw={500} size="lg">
              {format(viewDate, 'MMMM yyyy')}
            </Text>
            <ActionIcon
              variant="light"
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))}
            >
              <IconChevronRight size={16} />
            </ActionIcon>
          </Group>
        </Group>

        <Grid>
          <Grid.Col span={8}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <MantineCalendar
                value={selectedDate}
                onChange={(date) => date && setSelectedDate(date)}
                date={viewDate}
                onDateChange={setViewDate}
                renderDay={dayRenderer}
                size="lg"
                firstDayOfWeek={0}
              />
              <Text size="xs" c="dimmed" mt="md">
                <IconFileText size={12} style={{ marginRight: 4 }} />
                Blue dots indicate days with log entries
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="400px">
              <Stack gap="md" h="100%">
                <Group justify="space-between" align="center">
                  <Title order={3}>
                    {format(selectedDate, 'MMM d, yyyy')}
                  </Title>
                  {selectedEntry && (
                    <Badge size="sm" variant="light" color="blue">
                      daily
                    </Badge>
                  )}
                </Group>

                {selectedEntry ? (
                  <div style={{ 
                    flex: 1, 
                    overflowY: 'auto',
                    fontSize: '0.875rem',
                    lineHeight: 1.5
                  }}>
                    <ReactMarkdown>
                      {selectedEntry.content.slice(0, 1000) + (selectedEntry.content.length > 1000 ? '\n\n...' : '')}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <Stack justify="center" align="center" h="100%" gap="md">
                    <IconCalendar size={48} color="var(--mantine-color-gray-4)" />
                    <Text ta="center" c="dimmed" size="sm">
                      No log entry for this date
                    </Text>
                  </Stack>
                )}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" align="center" mb="md">
            <Title order={3}>
              {format(viewDate, 'MMMM yyyy')} Summary
            </Title>
            <Badge size="lg" variant="light" color="green">
              {datesWithEntries.size} entries
            </Badge>
          </Group>
          <Grid>
            <Grid.Col span={6}>
              <Text size="sm" fw={500} mb="xs">Recent Activity</Text>
              <Stack gap="xs">
                {dailyEntries
                  .filter(entry => entry.date >= monthStart && entry.date <= monthEnd)
                  .slice(0, 5)
                  .map(entry => (
                    <Group key={entry.id} justify="space-between">
                      <Text size="sm">{format(entry.date, 'MMM d')}</Text>
                      <Text size="xs" c="dimmed" lineClamp={1}>
                        {entry.content.split('\n').find(line => line.trim() && !line.startsWith('#'))?.slice(0, 50)}...
                      </Text>
                    </Group>
                  ))}
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" fw={500} mb="xs">Streak Info</Text>
              <Text size="sm" c="dimmed">
                Days with entries: {datesWithEntries.size} / {daysInMonth.length}
              </Text>
              <Text size="sm" c="dimmed">
                Completion rate: {Math.round((datesWithEntries.size / daysInMonth.length) * 100)}%
              </Text>
            </Grid.Col>
          </Grid>
        </Card>
      </Stack>
    </Container>
  )
}