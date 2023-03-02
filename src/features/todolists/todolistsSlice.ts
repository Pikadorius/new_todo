import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistDomainType, TodolistResponseType} from "features/todolists/todolistsTypes";
import {todolistsAPI} from "features/todolists/todolistsAPI";
import {setAppStatus} from "app/appSlice";

const initialState = [] as TodolistDomainType[]

export const fetchTodosTC = createAsyncThunk('fetchTodolists', async (_, {dispatch}) => {
    dispatch(setAppStatus('loading'))
    const res = await todolistsAPI.fetchTodos()
    dispatch(setTodolists(res.data))
    dispatch(setAppStatus('success'))

})

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        setTodolists: (state, action: PayloadAction<TodolistResponseType[]>) => {
            return action.payload.map(t => ({...t, filter: 'all', status: 'idle'}))
        }
    }
})

export const {setTodolists} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer