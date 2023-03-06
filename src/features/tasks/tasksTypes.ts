export enum TASK_STATUSES {
    Active=0,
    InProgress=1,
    Completed =2
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TASK_STATUSES
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    title: string,
    description: string,
    status: number,
    priority: number,
    startDate: string,
    deadline: string
}
