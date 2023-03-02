export enum TASK_STATUSES {
    ACTIVE=0,
    COMPLETED=1,
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type FilterType = 'all' | 'active' | 'completed'

export type  TaskDomainType = TaskType & { filter: FilterType }