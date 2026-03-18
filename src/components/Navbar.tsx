import { Image, NavLink } from '@mantine/core'
import {
  IconLayoutDashboard,
  IconFolder,
  IconChecklist,
  IconUser,
} from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from "../assets/dashly-logo.png"


const menuItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: IconLayoutDashboard,
  },
  {
    label: 'Projects',
    to: '/projects',
    icon: IconFolder,
  },
  {
    label: 'Tasks',
    to: '/tasks',
    icon: IconChecklist,
  },
  {
    label: 'Profile',
    to: '/profile',
    icon: IconUser,
  },
]

function AppNavbarLinks() {
  const location = useLocation()

  return (
    <div style={{padding:"1rem"}}>
    <div>
        <Image w={120} src={Logo}/>
    </div>
    <div
    style={{marginTop:"3rem"}}>
    {menuItems.map((item) => {
        return (
          <NavLink
            style={{borderRadius:"8px"}}
            key={item.to}
            label={item.label}
            leftSection={<item.icon size={20} />}
            component={Link}
            to={item.to}
            active={location.pathname.startsWith(item.to)}
            variant="light"
          />
        )
      })}
    </div>
    </div>
  )
}

export default AppNavbarLinks