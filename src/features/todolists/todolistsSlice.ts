import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistDomainType, TodolistResponseType} from "features/todolists/todolistsTypes";
import {todolistsAPI} from "features/todolists/todolistsAPI";
import {setAppError, setAppStatus} from "app/appSlice";

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
        if (res.data.resultCode === 0) {
            dispatch(addTodo({...res.data.data.item, tasksCount: 0}))
            dispatch(setAppStatus('success'))
            dispatch(setAppError('Todolist created'))
        } else {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(res.data.messages[0]))
        }
    }
)

export const deleteTodoTC = createAsyncThunk('deleteTodo', async (todoId: string, {dispatch}) => {
        dispatch(setAppStatus('loading'))
        const res = await todolistsAPI.deleteTodo(todoId)
        if (res.data.resultCode === 0) {
            dispatch(deleteTodo(todoId))
            dispatch(setAppError('Todolist deleted'))
            dispatch(setAppStatus('success'))
        } else {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(res.data.messages[0]))
        }
    }
)

export const updateTodoTC = createAsyncThunk('updateTodo', async (data: { todoId: string, title: string }, {dispatch}) => {
        dispatch(setAppStatus('loading'))
        const res = await todolistsAPI.updateTodo(data.todoId, data.title)
        if (res.data.resultCode === 0) {
            dispatch(updateTodoTitle(data))
            dispatch(setAppStatus('success'))
            dispatch(setAppError('Todolist changed'))
        } else {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(res.data.messages[0]))
        }
    }
)

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        setTodolists: (state, action: PayloadAction<TodolistResponseType[]>) => {
            return action.payload.map(t => ({...t, tasksCount: 0}))
        },
        addTodo: (state, action: PayloadAction<TodolistDomainType>) => {
            state.unshift(action.payload)
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            const index = state.findIndex(t => t.id === action.payload)
            state.splice(index, 1)
        },
        updateTodoTitle: (state, action: PayloadAction<{ todoId: string, title: string }>) => {
            return state.map(t => t.id === action.payload.todoId ? {...t, title: action.payload.title} : t)
        },
    }
})

export const {setTodolists, addTodo, deleteTodo, updateTodoTitle} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer