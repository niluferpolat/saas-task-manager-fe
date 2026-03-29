import { IconDotsVertical, IconPencil, IconSparklesFilled, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Avatar, Button, Card, Group, Menu, Modal, Progress, Stack, Text } from '@mantine/core';
import { type Project, type ProjectModalValues } from '../types/Project';
import { useNavigate } from 'react-router-dom';
import type { MouseEvent } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { deleteProject, updateProject } from '../services/ProjectService';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import {useForm} from '@mantine/form';
import ProjectModal from './ProjectModal';


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

function getInitialEditValues(project: Project) {
  return {
    name: project.name,
    description: project.description,
    dueDate: project.dueDate ? new Date(project.dueDate) : null,
    phase: project.phase,
    progress: project.progress,
    status: project.status,
  };
}

function ProjectCard({ project }: ProjectCardProps) {
  const { name, description, dueDate, progress, status } = project;
  const navigate = useNavigate();
  const [deleteOpened, { close: closeDelete, open: openDelete }] = useDisclosure(false);
  const [editOpened, { close: closeEdit, open: openEdit }] = useDisclosure(false);
  const queryClient = useQueryClient();

const { mutate: deleteProjectMutate } = useMutation({
  mutationFn: deleteProject,

  onSuccess: (_, id) => {
    queryClient.setQueryData(['projects'], (old: Project[] | undefined) =>
      old?.filter((p: Project) => p.id !== id)
    );
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  },
});

const { mutate: editProjectMutate } = useMutation({
  mutationFn: ({ id, data }: { id: number; data: Partial<ProjectModalValues> }) =>
    updateProject(id, data),

  onSuccess: (updatedProject: Project) => {
    queryClient.setQueryData(['project', updatedProject.id], updatedProject);
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    resetEditForm();
  },
});
  const stopCardClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handleDeleteClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    openDelete();
  };

  const handleDeleteConfirm = () => {
    deleteProjectMutate(project.id);
    closeDelete();
  };

  const form = useForm<ProjectModalValues>({
    initialValues: getInitialEditValues(project),
    validate: {
      name: (value) => (value ? null : 'Project name is required'),
      description: (value) => (value ? null : 'Project description is required'),
      dueDate: (value) => (value ? null : 'Due date is required'),
      phase: (value) => (value ? null : 'Current phase is required'),
      progress: (value) => {
        if (value === undefined || value === null) {
          return 'Progress is required';
        }
        if (isNaN(value)) {
          return 'Progress must be a number';
        }
        if (value < 0 || value > 100) {
          return 'Progress must be between 0 and 100';
        }
        return null;
      },
      status: (value) => (value ? null : 'Status is required'),
    },

  });

  const resetEditForm = () => {
    const initialValues = getInitialEditValues(project);
    form.setInitialValues(initialValues);
    form.setValues(initialValues);
    form.clearErrors();
  };

  const handleEditClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    resetEditForm();
    openEdit();
    
  };

  const handleEditClose = () => {
    resetEditForm();
    closeEdit();
  };

  const handleEditSubmit = form.onSubmit((values) => {
    editProjectMutate({ id: project.id, data: values });
    closeEdit();
  });

  return (
    <>
     <ProjectModal
        form={form}
        onClose={handleEditClose}
        onSubmit={handleEditSubmit}
        opened={editOpened}
      />
    <Modal
      centered
      opened={deleteOpened}
      onClose={closeDelete}
      title="Project Actions"
      zIndex={2000}
      overlayProps={{ backgroundOpacity: 0.55, blur: 1 }}
    >
      <Text size="sm">Are you sure you want to delete this project?</Text>
      <Group justify='flex-end' mt="md">
        <Button variant="outline" onClick={closeDelete}>Cancel</Button>
        <Button color="red" onClick={handleDeleteConfirm}>
          Delete
        </Button>
      </Group>
    </Modal>
    
    <Card
      shadow="md"
      padding="xl"
    
      radius="md"
      withBorder
      onClick={() => navigate(`/projects/${project.id}`)}
      style={{ ...cardStyles, position: 'relative', overflow: 'hidden' }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <Menu withinPortal trigger='hover'>
        <Menu.Target>
          <ActionIcon
            aria-label="Project menu"
            variant="subtle"
            color="gray"
            size="md"
            onClick={stopCardClick}
            style={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}
          >
            <IconDotsVertical size={16} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconPencil size={14} />}
            onClick={handleEditClick}
          >
            Edit
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={14} />}
            onClick={handleDeleteClick}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Group align="center" gap="sm" wrap="nowrap">
        <Avatar size={40} radius="xl" color="indigo" variant="light">
          <IconSparklesFilled size={20} />
        </Avatar>
        <Stack gap={5}>
          <Text fw={600}>{name}</Text>
          <Text size="xs" c="indigo" fw={700}>
            {formatStatusLabel(status)}
          </Text>
        </Stack>
      </Group>
       
  

      <Stack gap={4} mt="md">
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      </Stack>

      <Stack gap={4} mt={40}>
        <Group justify="space-between">
          <Text size="xs" c="indigo" fw={700}>PROGRESS</Text>
          <Text size='xs' c="indigo" fw={700}>{progress}%</Text>
        </Group>
        <Progress size="md" radius={"xl"} color="indigo" value={progress} />
      </Stack>

      <Group justify="space-between" mt="md">
        <Text size="xs">SOLO</Text>
        <Text size="xs">{dueDate}</Text>
      </Group>
    </Card>
    </>
    
  );
}

export default ProjectCard;
