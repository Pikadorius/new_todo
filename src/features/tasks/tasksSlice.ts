import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

    }
})

export const tasksActions = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer