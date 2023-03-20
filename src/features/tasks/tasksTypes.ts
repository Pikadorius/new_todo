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
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export type UpdateTaskType = {
    title: string,
    description: string,
    status: TASK_STATUSES,
    priority: number,
    startDate: Date,
    deadline: Date
}
