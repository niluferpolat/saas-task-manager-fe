import { useDisclosure } from '@mantine/hooks'
import { AppShell, Burger, Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import AppNavbarLinks from '../components/Navbar';

function MainLayout() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
    layout='alt'
    header={{height:60}}
    navbar={{width:300,breakpoint: 'sm',collapsed:{mobile:!opened}}}
    padding='md'
    >
   <AppShell.Header>
    <Group h="100%" px="md">
     <Burger
     hiddenFrom='sm'
     size="sm"
      opened={opened}
      onClick={toggle}
     />
    </Group>
    </AppShell.Header>    
    <AppShell.Navbar>
     <AppNavbarLinks/>
    </AppShell.Navbar>
    <AppShell.Main style={{backgroundColor:'#f8f9fb'}}>
    <Outlet/>
    </AppShell.Main>
    </AppShell>
  )
}

export default MainLayout
