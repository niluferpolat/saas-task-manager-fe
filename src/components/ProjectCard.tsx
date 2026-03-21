import { IconSparklesFilled } from '@tabler/icons-react';
import { Badge, Card, Group, Progress, Stack, Text } from '@mantine/core';
import { statusColor, type Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';

type ProjectCardProps = {
  project: Project;
};

const cardStyles = {
  transition: 'transform 0.2s ease',
  cursor: 'pointer',
} as const;

function formatStatusLabel(status: Project['status']) {
  return status.replaceAll('_', ' ');
}

function ProjectCard({ project }: ProjectCardProps) {
  const { name, description, dueDate, phase, progress, status } = project;
  const badgeColor = statusColor[status];
   const navigate = useNavigate();
  return (
    <Card
      shadow="md"
      padding="xl"
      radius="md"
      withBorder
      onClick={() => navigate(`/projects/${project.id}`)}
      style={cardStyles}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <Group justify="flex-end">
        <Badge color={badgeColor}>
          <IconSparklesFilled size={12} />
          {formatStatusLabel(project.status)}
        </Badge>
      </Group>

      <Stack gap={4} mt="md">
        <Text fw={700}>{name}</Text>
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      </Stack>

      <Stack gap={4} mt="md">
        <Text size="xs" c="dimmed">
          PHASE: {phase}
        </Text>
        <Progress size="md" radius={"xl"} color={badgeColor} value={progress} />
      </Stack>

      <Group justify="space-between" mt="md">
        <Text size="xs">SOLO</Text>
        <Text size="xs">{dueDate}</Text>
      </Group>
    </Card>
  );
}

export default ProjectCard;
