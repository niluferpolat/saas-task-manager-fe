import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ProjectPage from './pages/ProjectPage'
import ProjectDetail from './pages/ProjectDetail'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout  />}>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/projects" element={<ProjectPage/>} />
        <Route path="/tasks" element={<div>Tasks</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path='/projects/:id' element={<ProjectDetail />} />
      </Route>
    </Routes>
  )
}

export default App