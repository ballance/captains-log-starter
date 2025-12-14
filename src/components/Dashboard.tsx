import { Container, Title, Grid, Card, Text, Stack, Loader, Alert, List, Badge } from '@mantine/core'
import { IconInfoCircle, IconCalendar } from '@tabler/icons-react'
import { useLogEntries } from '../hooks/useLogEntries'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'

export default function Dashboard() {
  const { entries, loading, error } = useLogEntries()

  if (loading) {
    return (
      <Container size="xl">
        <Stack align="center" gap="md" py="xl">
          <Loader size="lg" />
          <Text>Loading Captain's Log entries...</Text>
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

  const recentEntries = entries.slice(0, 5)
  const dailyEntries = entries.filter(e => e.type === 'daily')
  const weeklyEntries = entries.filter(e => e.type === 'weekly')

  return (
    <Container size="xl">
      <Stack gap="md">
        <Title order={1}>Dashboard</Title>
        
        <Grid>
          <Grid.Col span={8}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="400px">
              <Title order={3} mb="md">Recent Entries ({entries.length} total)</Title>
              <Stack gap="sm" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {recentEntries.map((entry) => (
                  <Card key={entry.id} padding="sm" radius="sm" withBorder>
                    <Stack gap="xs">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text fw={500} size="sm">{entry.title}</Text>
                        <Badge size="xs" variant="light" color={
                          entry.type === 'daily' ? 'blue' : 
                          entry.type === 'weekly' ? 'green' : 
                          entry.type === 'monthly' ? 'orange' : 'purple'
                        }>
                          {entry.type}
                        </Badge>
                      </div>
                      <Text size="xs" c="dimmed">
                        <IconCalendar size={12} style={{ marginRight: 4 }} />
                        {format(entry.date, 'PPP')}
                      </Text>
                      <Text size="xs" lineClamp={2} c="dimmed">
                        {entry.content.slice(0, 150)}...
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="400px">
              <Title order={3} mb="md">Quick Stats</Title>
              <Stack gap="md">
                <div>
                  <Text size="sm" fw={500}>Daily Logs</Text>
                  <Text size="xl" fw={700} c="blue">{dailyEntries.length}</Text>
                </div>
                <div>
                  <Text size="sm" fw={500}>Weekly Summaries</Text>
                  <Text size="xl" fw={700} c="green">{weeklyEntries.length}</Text>
                </div>
                <div>
                  <Text size="sm" fw={500}>Last Entry</Text>
                  <Text size="sm" c="dimmed">
                    {recentEntries.length > 0 ? format(recentEntries[0].date, 'PPP') : 'No entries'}
                  </Text>
                </div>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {weeklyEntries.length > 0 && weeklyEntries[0]?.content && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">Latest Weekly Summary</Title>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <ReactMarkdown>
                {String(weeklyEntries[0].content).slice(0, 500) + (weeklyEntries[0].content.length > 500 ? '...' : '')}
              </ReactMarkdown>
            </div>
          </Card>
        )}
      </Stack>
    </Container>
  )
}