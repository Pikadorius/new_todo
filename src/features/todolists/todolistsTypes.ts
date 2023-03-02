import {StatusType} from "app/appSlice";

export type TodolistResponseType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistResponseType & { status: StatusType, filter: FilterType }