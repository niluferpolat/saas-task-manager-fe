import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchProjectById } from '../services/ProjectService';
import type { Project } from '../types/Project';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '../components/PageHeader';
import {  Card, Text, Title, RingProgress, Stack, Group, Button, Table } from '@mantine/core';
import ProjectDetailCard from '../components/ProjectDetailCard';
import { IconArrowRight, IconCalendarEvent, IconTools } from '@tabler/icons-react';

function ProjectDetail() {
  const {id} = useParams();
  const {data} = useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => fetchProjectById(Number(id)),
  });
  console.log(data)

 return (
  <Stack gap="lg">
    
    <PageHeader
      title={data?.name || 'Project Detail'}
      text={data?.description || 'Detailed view of your project'}
    />
     <Group>
         <Card shadow="sm" padding="lg" w={400} radius="md" withBorder>
            <Group mt="md">
            <RingProgress
              size={140}
              thickness={12}
              roundCaps
              sections={[
                { value: data?.progress ?? 0, color: 'blue' },
              ]}
              label={<>
                 <Text fw={700} ta="center">
                  {data?.progress ?? 0}%
                </Text>
                 <Text ta="center" size='xs' c={"dimmed"}>
                  DONE
                </Text>
              </>
             
              }
            />
            <Title order={4}>{data?.progress ?? 0}% Complete</Title>
            </Group>
        </Card>
        <ProjectDetailCard  icon={<IconTools size={24} />} color='blue' title='Current Phase' description={data?.phase}/>
        <ProjectDetailCard icon={<IconCalendarEvent size={24} />} color="pink" title="Due Date" description={data?.dueDate} />
     </Group>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
     <Card.Section withBorder inheritPadding py="xs">
       <Group justify='space-between'>
           <Stack>
          <Title order={4}>
        Active Tasks
    </Title>
    <Text size="xs" c="dimmed">
      Tracking priority items for current sprint
    </Text>
           </Stack>
        <Button variant="subtle" color="blue" rightSection={<IconArrowRight size={16} />} >
          View All Tasks
        </Button>

       </Group>
      </Card.Section>  
      <Card.Section inheritPadding mt="md">
        <Table verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Task Description</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Priority</Table.Th>
                    <Table.Th>Owner</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {data?.tasks.map((task) => (
                    <Table.Tr key={task.title}>
                        <Table.Td fw={700}>{task.description}</Table.Td>
                        <Table.Td>{task.status}</Table.Td>
                    
                        <Table.Td>John Doe</Table.Td>
                    </Table.Tr>
                ))

                }
            </Table.Tbody>    
            </Table>
      </Card.Section>
    </Card>    
  </Stack>
);
}

export default ProjectDetail