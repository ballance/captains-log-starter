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
  Avatar,
  TextInput,
  ActionIcon,
  Divider
} from '@mantine/core'
import { IconUsers, IconSearch, IconInfoCircle, IconUser, IconBriefcase } from '@tabler/icons-react'
import { useState, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { usePeople } from '../hooks/usePeople'
import { useLogEntries } from '../hooks/useLogEntries'
import type { Person } from '../types'

export default function People() {
  const { people, loading: peopleLoading, error: peopleError } = usePeople()
  const { entries } = useLogEntries()
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPeople = useMemo(() => {
    if (!searchQuery) return people
    return people.filter(person => 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (person.role && person.role.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [people, searchQuery])

  // Get interactions for selected person from log entries
  const getPersonInteractions = (person: Person) => {
    if (!person) return []
    
    return entries
      .filter(entry => 
        entry.content.toLowerCase().includes(person.name.toLowerCase()) ||
        entry.content.toLowerCase().includes(person.id.toLowerCase())
      )
      .slice(0, 10) // Show last 10 interactions
  }

  if (peopleLoading) {
    return (
      <Container size="xl">
        <Stack align="center" gap="md" py="xl">
          <Loader size="lg" />
          <Text>Loading people profiles...</Text>
        </Stack>
      </Container>
    )
  }

  if (peopleError) {
    return (
      <Container size="xl">
        <Alert icon={<IconInfoCircle size="1rem" />} title="Error loading people" color="red">
          {peopleError}
        </Alert>
      </Container>
    )
  }

  return (
    <Container size="xl">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={1}>People & Interactions</Title>
          <Badge size="lg" variant="light" color="blue">
            {people.length} people
          </Badge>
        </Group>

        <TextInput
          placeholder="Search people by name or role..."
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          size="md"
        />

        <Grid>
          <Grid.Col span={selectedPerson ? 4 : 12}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="600px">
              <Stack gap="md" h="100%">
                <Group justify="space-between">
                  <Text fw={500} size="lg">Team Directory</Text>
                  <ActionIcon
                    variant="light"
                    onClick={() => setSelectedPerson(null)}
                    disabled={!selectedPerson}
                  >
                    <IconUsers size={16} />
                  </ActionIcon>
                </Group>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <Stack gap="sm">
                    {filteredPeople.map((person) => (
                      <Card
                        key={person.id}
                        shadow="xs"
                        padding="md"
                        radius="sm"
                        withBorder
                        style={{ 
                          cursor: 'pointer',
                          backgroundColor: selectedPerson?.id === person.id ? 'var(--mantine-color-blue-0)' : undefined
                        }}
                        onClick={() => setSelectedPerson(person)}
                      >
                        <Group>
                          <Avatar 
                            color="blue" 
                            radius="xl"
                            size="md"
                          >
                            <IconUser size={20} />
                          </Avatar>
                          <div style={{ flex: 1 }}>
                            <Text fw={500} size="sm">{person.name}</Text>
                            {person.role && (
                              <Group gap="xs" mt={2}>
                                <IconBriefcase size={12} color="var(--mantine-color-gray-6)" />
                                <Text size="xs" c="dimmed" lineClamp={1}>
                                  {person.role}
                                </Text>
                              </Group>
                            )}
                          </div>
                        </Group>
                      </Card>
                    ))}
                  </Stack>
                </div>

                {filteredPeople.length === 0 && (
                  <Stack justify="center" align="center" h="100%" gap="md">
                    <IconUsers size={48} color="var(--mantine-color-gray-4)" />
                    <Text ta="center" c="dimmed" size="sm">
                      No people match your search
                    </Text>
                  </Stack>
                )}
              </Stack>
            </Card>
          </Grid.Col>

          {selectedPerson && (
            <Grid.Col span={8}>
              <Card shadow="sm" padding="lg" radius="md" withBorder h="600px">
                <Stack gap="md" h="100%">
                  <Group>
                    <Avatar 
                      color="blue" 
                      radius="xl"
                      size="lg"
                    >
                      <IconUser size={24} />
                    </Avatar>
                    <div>
                      <Title order={2}>{selectedPerson.name}</Title>
                      {selectedPerson.role && (
                        <Text c="dimmed" size="sm">{selectedPerson.role}</Text>
                      )}
                    </div>
                  </Group>

                  <Divider />

                  <div style={{ flex: 1, overflowY: 'auto' }}>
                    <Stack gap="md">
                      <div>
                        <Text fw={500} mb="xs">Profile Information</Text>
                        <div style={{ 
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          maxHeight: '200px',
                          overflowY: 'auto'
                        }}>
                          <ReactMarkdown>
                            {selectedPerson.content || 'No additional information available.'}
                          </ReactMarkdown>
                        </div>
                      </div>

                      <div>
                        <Group justify="space-between" align="center" mb="xs">
                          <Text fw={500}>Recent Interactions</Text>
                          <Badge size="sm" variant="light" color="green">
                            {getPersonInteractions(selectedPerson).length} entries
                          </Badge>
                        </Group>
                        
                        <Stack gap="xs" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                          {getPersonInteractions(selectedPerson).map((entry) => (
                            <Card key={entry.id} padding="sm" radius="sm" withBorder>
                              <Group justify="space-between" mb="xs">
                                <Text fw={500} size="sm">{entry.title}</Text>
                                <Badge size="xs" variant="light" color={
                                  entry.type === 'daily' ? 'blue' : 
                                  entry.type === 'weekly' ? 'green' : 'orange'
                                }>
                                  {entry.type}
                                </Badge>
                              </Group>
                              <Text size="xs" c="dimmed" lineClamp={2}>
                                {entry.content
                                  .split('\n')
                                  .find(line => 
                                    line.toLowerCase().includes(selectedPerson.name.toLowerCase()) &&
                                    line.trim().length > 10
                                  )
                                  ?.slice(0, 150) || 'Mentioned in this entry...'}...
                              </Text>
                            </Card>
                          ))}
                          
                          {getPersonInteractions(selectedPerson).length === 0 && (
                            <Text ta="center" c="dimmed" size="sm" py="xl">
                              No interactions found in recent entries
                            </Text>
                          )}
                        </Stack>
                      </div>
                    </Stack>
                  </div>
                </Stack>
              </Card>
            </Grid.Col>
          )}
        </Grid>

        {!selectedPerson && (
          <Alert icon={<IconInfoCircle size="1rem" />} title="People Tracking" color="blue">
            <Text size="sm">
              • Click on any person to view their profile and recent interactions
              <br />
              • People profiles are automatically linked from daily log entries
              <br />
              • Use search to quickly find team members by name or role
            </Text>
          </Alert>
        )}
      </Stack>
    </Container>
  )
}