import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type StatusType = 'idle' | 'loading' | 'success' | 'failed'

const initialState = {
    status: 'idle' as StatusType,
    error: null as null | string,
    isInitialized: false
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
    }
})

export const {setAppInitialized, setAppStatus, setAppError} = appSlice.actions

export const appReducer = appSlice.reducer