import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistDomainType, TodolistResponseType} from "features/todolists/todolistsTypes";
import {AppDispatch} from "store/store";
import {todolistsAPI} from "features/todolists/todolistsAPI";

const initialState = [] as TodolistDomainType[]

export const fetchTodosTC = createAsyncThunk('fetchTodolists', async (_, {dispatch}) => {
    const res = await todolistsAPI.fetchTodos()
    dispatch(setTodolists(res.data))
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