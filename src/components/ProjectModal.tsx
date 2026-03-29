import { Button, Group, Modal, Select, Stack, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import type { UseFormReturnType } from '@mantine/form';
import type { FormEvent } from 'react';
import { projectStatusOptions, type ProjectModalValues} from '../types/Project';


type ProjectModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (event?: FormEvent<HTMLFormElement>) => void;
  form: UseFormReturnType<ProjectModalValues>;
};

function ProjectModal({ opened, onClose, onSubmit, form }: ProjectModalProps) {
  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Edit Project"
      zIndex={2000}
      overlayProps={{ backgroundOpacity: 0.55, blur: 1 }}
    >
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            label="Project Name"
            placeholder="Enter project name"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Project Description"
            placeholder="Enter project description"
            {...form.getInputProps('description')}
          />
          <DatePickerInput
            label="Due Date"
            placeholder="Select due date"
            valueFormat="DD/MM/YYYY"
            popoverProps={{ withinPortal: true, zIndex: 2100 }}
            {...form.getInputProps('dueDate')}
          />
          <TextInput
            label="Progress (%)"
            placeholder="Enter progress"
            type="number"
            {...form.getInputProps('progress')}
          />
          <TextInput
            label="Phase"
            placeholder="Enter current phase"
            {...form.getInputProps('phase')}
          />
          <Select
            label="Status"
            placeholder="Select project status"
            data={projectStatusOptions}
            comboboxProps={{ withinPortal: true, zIndex: 2100 }}
            {...form.getInputProps('status')}
          />
          <Group justify="flex-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" color="indigo">
              Save
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export default ProjectModal;
