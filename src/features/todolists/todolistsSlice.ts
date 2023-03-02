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

export const createTodoTC = createAsyncThunk('createTodo', async (title: string, {dispatch}) => {
        dispatch(setAppStatus('loading'))
        const res = await todolistsAPI.createTodo(title)
        dispatch(addTodo({...res.data.data.item, status: 'idle'}))
        dispatch(setAppStatus('success'))
    }
)

export const deleteTodoTC = createAsyncThunk('deleteTodo', async (todoId: string, {dispatch}) => {
        dispatch(setAppStatus('loading'))
        const res = await todolistsAPI.deleteTodo(todoId)
        dispatch(deleteTodo(todoId))
        dispatch(setAppStatus('success'))
    }
)

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        setTodolists: (state, action: PayloadAction<TodolistResponseType[]>) => {
            return action.payload.map(t => ({...t, filter: 'all', status: 'idle'}))
        },
        addTodo: (state, action: PayloadAction<TodolistDomainType>) => {
            state.unshift(action.payload)
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            const index = state.findIndex(t=>t.id===action.payload)
            state.splice(index,1)
        }
    }
})

export const {setTodolists,addTodo,deleteTodo} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer