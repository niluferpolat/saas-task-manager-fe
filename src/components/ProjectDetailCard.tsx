import { Avatar, Card, Stack, Text, Title } from '@mantine/core'


interface ProjectDetailCardProps {
    icon: React.ReactNode;
    color: string;
    title: string;
    description: string | undefined;
}
function ProjectDetailCard({ icon, color, title, description }: ProjectDetailCardProps) {
  return (
    <>
      <Card shadow="sm" h={200} w={200} padding="lg" radius="md" withBorder>
             <Stack gap="sm">
                <Avatar size={50} radius={"md"} color={color} variant='light'>
                    {icon}
                </Avatar>
                 <Text size="xs" c="dimmed" fw={600} tt="uppercase">
            {title}
    </Text>

    <Title order={4}>
      {description}
    </Title>
             </Stack>   
           </Card>
    </>
  )
}

export default ProjectDetailCard