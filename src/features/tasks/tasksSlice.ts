import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TaskType, UpdateTaskType} from "features/tasks/tasksTypes";
import {tasksAPI} from "features/tasks/tasksAPI";
import {setAppError, setAppStatus} from "app/appSlice";
import {RootState} from 'store/store';
import {fetchTodosTasksCountTC} from 'features/todolists/todolistsSlice';

const initialState = [] as TaskType[]


export const fetchTasksTC = createAsyncThunk('fetchTasks', async (id: string, {dispatch}) => {
    dispatch(setAppStatus('loading'))
    const res = await tasksAPI.fetchTasks(id)

    dispatch(setTasks(res.data.items))
    dispatch(setAppStatus('success'))
})

export const createTaskTC = createAsyncThunk('createTask', async (data: { id: string, title: string }, {dispatch}) => {
        dispatch(setAppStatus('loading'))
        const res = await tasksAPI.createTask(data.id, data.title)
        if (res.data.resultCode === 0) {
            dispatch(addTask(res.data.data.item))
            dispatch(fetchTodosTasksCountTC(data.id))
            dispatch(setAppStatus('success'))
            dispatch(setAppError('Task created'))
        } else {
            dispatch(setAppError(res.data.messages[0]))
            dispatch(setAppStatus('failed'))
        }
    }
)

export const deleteTaskTC = createAsyncThunk('deleteTask', async (data: { todoId: string, taskId: string }, {dispatch}) => {
        dispatch(setAppStatus('loading'))
        const res = await tasksAPI.deleteTask(data.todoId, data.taskId)
        if (res.data.resultCode === 0) {
            dispatch(deleteTask(data.taskId))
            dispatch(fetchTodosTasksCountTC(data.todoId))
            dispatch(setAppStatus('success'))
            dispatch(setAppError('Task deleted'))
        } else {
            dispatch(setAppError(res.data.messages[0]))
            dispatch(setAppStatus('failed'))
        }
    }
)

export const updateTaskTC = createAsyncThunk(
    'updateTask',
    async (data: { todoId: string, taskId: string, newTask: Partial<UpdateTaskType> }, {dispatch, getState}) => {
        dispatch(setAppStatus('loading'))
        const state = getState() as RootState
        const task = state.tasks.find(t => t.id === data.taskId) as UpdateTaskType
        const res = await tasksAPI.updateTask(data.todoId, data.taskId, {...task, ...data.newTask, status: 2})
        if (res.data.resultCode === 0) {
            dispatch(updateTask(res.data.data.item))
            dispatch(setAppStatus('success'))
            dispatch(setAppError('Task updated'))
        } else {
            dispatch(setAppError(res.data.messages[0]))
            dispatch(setAppStatus('failed'))
        }
    }
)

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<TaskType[]>) => {
            return action.payload.map(t => ({...t, filter: 'all'}))
        },
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.unshift(action.payload)
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            const index = state.findIndex(t => t.id === action.payload)
            state.splice(index, 1)
        },
        updateTask: (state, action: PayloadAction<TaskType>) => {
            return state.map(t => t.id === action.payload.id ? {...t, ...action.payload} : t)
        },
    },
})

export const {setTasks, addTask, deleteTask, updateTask} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer