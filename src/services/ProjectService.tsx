import axios from "axios";
import type { Project } from "../types/Project";

const API_BASE_URL ="http://localhost:8080/api";

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await axios.get<Project[]>(`${API_BASE_URL}/projects`);
  return response.data;
};