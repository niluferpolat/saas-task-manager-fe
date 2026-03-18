export interface Project {
    id:number;
    name: string;
    description: string;
    progress: number;
    projectStatus: ProjectStatus;
    phase:string;
    dueDate: string;
}

export const ProjectStatus= {
    ON_TRACK : "ON_TRACK",
    DONE: "DONE",
    PRIORITY : "PRIORITY"
} as const;

export type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus]

export const statusColor = {
  ON_TRACK: "green",
  PRIORITY: "orange",
  DONE: "gray"
};