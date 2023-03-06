export type TodolistResponseType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type TodolistDomainType = TodolistResponseType & { tasksCount: number}