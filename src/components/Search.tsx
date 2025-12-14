import { 
  Container, 
  Title, 
  TextInput, 
  Text, 
  Stack, 
  Card, 
  Badge, 
  Loader, 
  Alert,
  Group,
  Highlight,
  Divider
} from '@mantine/core'
import { IconSearch, IconCalendar, IconInfoCircle } from '@tabler/icons-react'
import { useSearch } from '../hooks/useSearch'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'

export default function Search() {
  const { query, setQuery, results, searching, loading } = useSearch()

  if (loading) {
    return (
      <Container size="xl">
        <Stack align="center" gap="md" py="xl">
          <Loader size="lg" />
          <Text>Loading search index...</Text>
        </Stack>
      </Container>
    )
  }

  return (
    <Container size="xl">
      <Stack gap="md">
        <Title order={1}>Search Captain's Log</Title>
        
        <TextInput
          placeholder="Search across all entries..."
          leftSection={<IconSearch size={16} />}
          size="lg"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />

        {searching && (
          <Group>
            <Loader size="sm" />
            <Text size="sm" c="dimmed">Searching...</Text>
          </Group>
        )}

        {query && !searching && (
          <Text size="sm" c="dimmed">
            {results.length > 0 
              ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
              : `No results found for "${query}"`
            }
          </Text>
        )}

        <Stack gap="md">
          {results.map((result, index) => (
            <Card key={`${result.entry.id}-${index}`} shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Group justify="space-between">
                  <div>
                    <Highlight highlight={query} fw={500} size="lg">
                      {result.entry.title}
                    </Highlight>
                    <Group gap="xs" mt="xs">
                      <Badge 
                        size="sm" 
                        variant="light" 
                        color={
                          result.entry.type === 'daily' ? 'blue' : 
                          result.entry.type === 'weekly' ? 'green' : 
                          result.entry.type === 'monthly' ? 'orange' : 'purple'
                        }
                      >
                        {result.entry.type}
                      </Badge>
                      <Text size="sm" c="dimmed">
                        <IconCalendar size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {format(result.entry.date, 'PPP')}
                      </Text>
                      <Text size="sm" c="dimmed">
                        Score: {result.score.toFixed(2)}
                      </Text>
                    </Group>
                  </div>
                </Group>

                <Divider />

                <div>
                  <Text size="sm" fw={500} mb="xs">Preview:</Text>
                  <div style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                    <ReactMarkdown>{result.snippet || ''}</ReactMarkdown>
                  </div>
                </div>
              </Stack>
            </Card>
          ))}
        </Stack>

        {!query && (
          <Alert icon={<IconInfoCircle size="1rem" />} title="Search Tips" color="blue">
            <Text size="sm">
              • Search for keywords across all your daily logs, weekly summaries, monthly and yearly overviews
              <br />
              • Use multiple words to narrow down results
              <br />
              • Search supports partial word matching and handles typos
            </Text>
          </Alert>
        )}
      </Stack>
    </Container>
  )
}