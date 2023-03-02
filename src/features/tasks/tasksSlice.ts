import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskType} from "features/tasks/tasksTypes";
import {tasksAPI} from "features/tasks/tasksAPI";
import {setAppStatus} from "app/appSlice";

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
        debugger
        dispatch(addTask(res.data.data.item))
        dispatch(setAppStatus('success'))
        // dispatch(fetchTasksTC(data.id))
    }
)

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<TaskType[]>) => {
            return action.payload
        },
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.unshift(action.payload)
        }
    }
})

export const {setTasks, addTask} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer