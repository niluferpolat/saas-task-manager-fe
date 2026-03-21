export const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE"
} as const

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus]

export interface Task {
  title: string
  description: string
  status: TaskStatus
  projectId: number
}

export interface CreateTaskRequest {
  title: string
  description: string
  projectId: number
}