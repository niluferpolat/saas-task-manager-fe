import { useQuery } from '@tanstack/react-query'
import type { Project } from './types/Project';
import { fetchProjects } from './services/ProjectService';

function App() {
const {data} = useQuery<Project[]>({
  queryKey: ['projects'],
  queryFn: fetchProjects
})
  return (
    <>
      <h1>Projects</h1>
      <ul>
        {data?.map((project: Project) => (
          <li key={project.name}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <small>Created at: {new Date(project.createdAt).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
