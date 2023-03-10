import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistDomainType} from 'features/todolists/todolistsTypes';
import {TaskType} from 'features/tasks/tasksTypes';

export type StatusType = 'idle' | 'loading' | 'success' | 'failed'
export type ModalType = 'createTodo' | 'deleteTodo' | 'createTask' | 'deleteTask' | 'idle' | 'updateTodo' | 'updateTask'

const initialState = {
    status: 'idle' as StatusType,
    error: '',
    isInitialized: false,
    modal: 'idle' as ModalType,
    modalTodo: {} as TodolistDomainType,
    modalTask: {} as TaskType
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload
        },
        setAppError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        setAppStatus: (state, action: PayloadAction<StatusType>) => {
            state.status = action.payload
        },
        setModalType: (state, action: PayloadAction<ModalType>) => {
            state.modal = action.payload
        },
        setModalTodo: (state, action: PayloadAction<TodolistDomainType>) => {
            state.modalTodo = action.payload
        },
        setModalTask: (state, action: PayloadAction<TaskType>) => {
            state.modalTask = action.payload
        }
    }
})

export const {
    setAppInitialized,
    setAppStatus,
    setAppError,
    setModalType,
    setModalTodo,
    setModalTask,
} = appSlice.actions

export const appReducer = appSlice.reducer