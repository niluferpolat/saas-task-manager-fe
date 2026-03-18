import { Card, Text, Badge, Progress, Group, Stack } from '@mantine/core';
import { statusColor, type Project } from '../types/Project';

function ProjectCard({project}:{project:Project}) {
    console.log(project.projectStatus)
  return (
  <Card
  shadow="sm"
  padding="lg"
  radius="md"
  withBorder
  style={{ transition: "0.2s" }}
  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
>
    <Group justify='space-between'>
        <div>
        </div>
        <Badge color={statusColor[project.projectStatus]}>{project.projectStatus.replace("_", " ")}</Badge>
    </Group>
    <Stack gap={4} mt="md">
        <Text fw={600}>{project.name}</Text>
        <Text size="sm" color="dimmed">{project.description}</Text>
    </Stack>
    <Stack gap={4} mt="md">
    <Text size='xs' c="dimmed">
        PHASE: {project.phase}
    </Text>
    <Progress value={project.progress} />
    </Stack>
          <Group justify="space-between" mt="md">
        <Text size="xs">SOLO</Text>
        <Text size="xs">{project.dueDate}</Text>
      </Group>

    </Card>
  )
}

export default ProjectCard