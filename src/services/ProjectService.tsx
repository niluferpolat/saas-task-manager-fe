import axios from "axios";
import type { Project, ProjectModalValues } from "../types/Project";

const API_BASE_URL ="http://localhost:8080/api";

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await axios.get<Project[]>(`${API_BASE_URL}/projects`);
  return response.data;
};

export const fetchProjectById = async (id: number): Promise<Project> => {
  const response = await axios.get<Project>(`${API_BASE_URL}/projects/${id}`);
  return response.data;
}

export const deleteProject = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/projects/${id}`);
}
export const fetchProjectStatuses = async () => {
  const res = await axios.get('/api/enums/project-status');
  return res.data;
};

export const updateProject = async (id: number, data: Partial<ProjectModalValues>): Promise<Project> => {
  const response = await axios.put<Project>(`${API_BASE_URL}/projects/${id}`, data);
  return response.data;
}

export const createProject = async (data: ProjectModalValues): Promise<Project> => {
  const response = await axios.post<Project>(`${API_BASE_URL}/projects`, data);
  return response.data;
}