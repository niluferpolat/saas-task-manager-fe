import type { Task } from "./Task";

export interface Project {
    id:number;
    name: string;
    description: string;
    progress: number;
    status: ProjectStatus;
    phase:string;
    dueDate: string;
    tasks: Task[];
}

export const ProjectStatus= {
    ON_TRACK : "ON_TRACK",
    DONE: "DONE",
    PRIORITY : "PRIORITY"
} as const;

export type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus]

export const statusLabel: Record<ProjectStatus, string> = {
  ON_TRACK: "On Track",
  DONE: "Completed",
  PRIORITY: "High Priority",
};

export const projectStatusOptions = Object.values(ProjectStatus).map(
  (status) => ({
    value: status,
    label: statusLabel[status],
  })
);
export type ProjectModalValues = {
  name: string;
  description: string;
  dueDate: Date | null;
  phase: string;
  progress: number;
  status: ProjectStatus;
};
